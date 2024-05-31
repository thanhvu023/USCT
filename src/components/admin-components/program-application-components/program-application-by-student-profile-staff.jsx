import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProgramApplication,
  getProgramApplicationById,
} from "../../../redux/slice/programApplicationSlice";
import { getStudentProfileById } from "../../../redux/slice/studentSlice";
import { getProgramById } from "../../../redux/slice/programSlice";
import { getProgramStageById } from "../../../redux/slice/programStageSlice";
import { Modal, Button, Row, Form, Col, Card, Table } from "react-bootstrap";
import { getAllUsers } from "../../../redux/slice/authSlice";
import PaymentContext from "./context/payment-context";
import { getAllProgramStages } from "../../../redux/slice/programStageSlice";
import { getAllStage } from "../../../redux/slice/applyStageSlice";
import { Typography, Backdrop, CircularProgress, Chip } from "@mui/material";
import Swal from "sweetalert2";

const ProgramApplicationPageAdmin = ({ setMain }) => {
  const { setSelectedApp } = useContext(PaymentContext);

  const handleCreateFee = (application) => {
    setSelectedApp(application);
    setMain("Thanh toán");
  };

  const dispatch = useDispatch();
  const [sort, setSortData] = useState(10);
  const { programApplications, loading } = useSelector(
    (state) => state.programApplication
  );

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedApplicationProgram, setSelectedApplicationProgram] = useState(
    null
  );
  const [programs, setPrograms] = useState({});
  const [studentProfiles, setStudentProfiles] = useState({});
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);
  const [sortedApplications, setSortedApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const customers = useSelector((state) => state.auth.user);
  const programStages = useSelector((state) => state.programStages.stages);

  // Fetch initial data once
  useEffect(() => {
    if (!programApplications.length) {
      dispatch(getAllProgramApplication());
    }
    if (!programStages.length) {
      dispatch(getAllProgramStages());
    }
    dispatch(getAllUsers());
  }, [dispatch, programApplications.length, programStages.length]);

  // Handle sorting and search
  useEffect(() => {
    setSortedApplications(programApplications);
  }, [programApplications]);

  useEffect(() => {
    searchData(searchTerm);
  }, [searchTerm, programApplications]);

  const getCustomerName = (customerId) => {
    if (!customers || !Array.isArray(customers)) {
      return "Không tìm thấy";
    }
    const customer = customers.find(
      (customer) => customer.customerId === customerId
    );
    return customer ? customer.fullName : "Không tìm thấy ảnh";
  };

  const handleShowDetailsModal = (application) => {
    setSelectedApplication(application);
    setShowCheckModal(true);
  };


  const getProgramStagesByProgramId = (programId) => {
    const stages = programStages.filter(
      (stage) => stage.programId === programId
    );
    return stages.map((stage) => ({
      programStageId: stage.programStageId,
      programId: stage.programId,
      stageName: stage?.stageName,
    }));
  };

  const sortData = (sortBy) => {
    const sortedData = [...programApplications];
    sortedData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    setSortedApplications(sortedData);
  };

  const searchData = (searchTerm) => {
    const filteredData = programApplications.filter((application) => {
      const studentName =
        studentProfiles[application.studentProfileId]?.fullName || "";
      return studentName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSortedApplications(filteredData);
  };

  const handleSort = (sortingVale) => {
    sortData(sortingVale);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowDeleteModal = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd6b55",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleOpenModal = async (studentProfileId) => {
    setSelectedProfileId(studentProfileId);
    setShowProfileModal(true);

    try {
      const response = await dispatch(getStudentProfileById(studentProfileId));
      if (response.payload) {
        setStudentProfile(response.payload);
        const programStageResponse = await dispatch(
          getProgramStageById(response.payload.programStageId)
        );
        if (programStageResponse.payload) {
          setIsPaymentRequired(programStageResponse.payload.isPayment);
        }
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedProfileId(null);
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      const programIds = programApplications.map(
        (application) => application.programId
      );
      for (const programId of programIds) {
        if (!programs[programId]) {
          try {
            const response = await dispatch(getProgramById(programId));
            if (response.payload) {
              const { nameProgram, createDate } = response.payload;
              setPrograms((prevState) => ({
                ...prevState,
                [programId]: { nameProgram, createDate },
              }));
            }
          } catch (error) {
            console.error(`Error fetching program with ID ${programId}:`, error);
          }
        }
      }
    };
    if (programApplications.length > 0) {
      fetchPrograms();
    }
  }, [dispatch, programApplications, programs]);

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      for (const application of programApplications) {
        const studentProfileId = application.studentProfileId;
        if (!studentProfiles[studentProfileId]) {
          try {
            const response = await dispatch(
              getStudentProfileById(studentProfileId)
            );
            if (response.payload) {
              const studentProfile = response.payload;
              setStudentProfiles((prevState) => ({
                ...prevState,
                [studentProfileId]: studentProfile,
              }));
            }
          } catch (error) {
            console.error(
              `Error fetching student profile with ID ${studentProfileId}:`,
              error
            );
          }
        }
      }
    };
    fetchStudentProfiles();
  }, [dispatch, programApplications, studentProfiles]);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return <Chip label="Đang xử lí" color="default" />;
      case 1:
        return <Chip label="Bổ sung tài liệu" color="warning" />;
      case 2:
        return <Chip label="Đăng ký thành công" color="success" />;
      case 3:
        return <Chip label="Hủy bỏ đăng ký" color="error" />;
      default:
        return <Chip label="Hồ sơ hoàn tất" color="primary" />;
    }
  };

  const handleCloseCheckModal = () => setShowCheckModal(false);

  const handleDownloadFile = (fileAttach) => {
    const link = document.createElement("a");
    link.href = fileAttach;
    link.download = "fileAttach";
    link.click();
  };

  return (
    <div style={{ maxHeight: "100vh" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Row>
        <div className="col-lg-12">
          <Card className="mb-4">
            <Card.Header as="h4">
              Danh sách hồ sơ đăng ký chương trình
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col sm={3}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      onChange={handleSearch}
                    />
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex">
                      <Typography>hiển thị </Typography>
                      <Form.Select
                        value={sort}
                        onChange={(e) => setSortData(e.target.value)}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                      </Form.Select>
                      <Typography> hàng</Typography>
                    </div>
                  </Col>
                </Row>
              </Form>
              <div className="table-responsive">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>PAId</th>
                      <th>Hồ sơ sinh viên</th>
                      <th>Ngày tạo</th>
                      <th>Chương trình ứng tuyển</th>
                      <th>Trạng thái hồ sơ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedApplications.map((application) => (
                      <tr key={application.studentProfileId}>
                        <td>{application.programApplicationId}</td>
                        <td
                          onClick={() =>
                            handleOpenModal(application.studentProfileId)
                          }
                        >
                          {studentProfiles[application.studentProfileId]?.fullName ||
                            "Loading..."}
                        </td>
                        <td>
                          {studentProfiles[application.studentProfileId]
                            ?.createDate || "Loading..."}
                        </td>
                        <td>
                          {programs[application.programId]?.nameProgram ||
                            "Loading..."}
                        </td>
                        <td style={{textAlign:'center'}}>{getStatusText(application.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ProgramApplicationPageAdmin;
