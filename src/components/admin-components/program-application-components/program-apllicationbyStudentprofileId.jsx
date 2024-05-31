import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  getProgramApplicationsByStaffId,
  getProgramApplicationById,
  updateProgramApplication,
  getAllProgramApplication,
} from "../../../redux/slice/programApplicationSlice";
import { getStudentProfileById } from "../../../redux/slice/studentSlice";
import { getProgramById } from "../../../redux/slice/programSlice";
import { getProgramStageById } from "../../../redux/slice/programStageSlice";
import {
  Modal,
  Button,
  Row,
  Form,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import { getAllUsers } from "../../../redux/slice/authSlice";
import PaymentContext from "./context/payment-context";
import { Pagination } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllProgramStages } from "../../../redux/slice/programStageSlice";
import { getAllStage } from "../../../redux/slice/applyStageSlice";
import Swal from "sweetalert2";
import { Typography, Backdrop, CircularProgress, Chip } from "@mui/material";
import './program-applicationbyStudentprofile.css';

const theadData = [
  { heading: "Mã hồ sơ", sortingVale: "id" },
  { heading: "Hồ sơ sinh viên", sortingVale: "name" },
  { heading: "Ngày tạo", sortingVale: "date" },
  { heading: "Chương trình ứng tuyển", sortingVale: "program" },
  { heading: "Tiến trình hồ sơ", sortingVale: "stages" },
  { heading: "Trạng thái hồ sơ", sortingVale: "status" },
  { heading: "Thao tác", sortingVale: "action" },
];

const style = {
  button: {
    border: "none",
    cursor: "pointer",
  },
  modalDialog: {
    maxWidth: "500px",
  },
  modalHeader: {
    borderBottom: "none",
  },
  modalFooter: {
    borderTop: "none",
  },
  modalFooterButton: {
    marginRight: "10px",
  },
};

const ProgramApplicationPage = ({ setMain }) => {
  const { setSelectedApp } = useContext(PaymentContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { staffId } = useParams();

  const { programApplicationsByStaffId, loading, error } = useSelector(
    (state) => state.programApplication
  );

  const [sort, setSortData] = useState(10);
  const [selectedProfileId, setSelectedProfileId] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedApplicationProgram, setSelectedApplicationProgram] =
    useState(null);
  const [programs, setPrograms] = useState({});
  const [studentProfiles, setStudentProfiles] = useState({});
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);
  const [sortedApplications, setSortedApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const customers = useSelector((state) => state.auth.user);
  const programStages = useSelector((state) => state.programStages.stages);

  const handleCreateFee = (application) => {
    setSelectedApp(application);
    setMain("Thanh toán");
  };

  const handleDetailClick = (application) => {
    setSelectedApp(application);
    navigate(`/staff-programApplication-operation/${application.programApplicationId}`, {
      state: application,
    });
  };

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
    const sortedData = [...programApplicationsByStaffId];
    sortedData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    setSortedApplications(sortedData);
  };

  const searchData = (searchTerm) => {
    const filteredData = programApplicationsByStaffId.filter((application) => {
      const studentName =
        studentProfiles[application.studentProfileId]?.fullName || "";
      return studentName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSortedApplications(filteredData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getProgramApplicationsByStaffId(staffId));
    dispatch(getAllProgramApplication());
    dispatch(getProgramById());
  }, [dispatch, staffId]);

  useEffect(() => {
    dispatch(getAllProgramStages());
    dispatch(getAllStage());
  }, [dispatch]);

  useEffect(() => {
    setSortedApplications(programApplicationsByStaffId);
  }, [programApplicationsByStaffId]);

  useEffect(() => {
    searchData(searchTerm);
  }, [searchTerm]);

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
      const programIds = programApplicationsByStaffId.map(
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

    if (programApplicationsByStaffId.length > 0) {
      fetchPrograms();
    }
  }, [dispatch, programApplicationsByStaffId, programs]);

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      for (const application of programApplicationsByStaffId) {
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
  }, [dispatch, programApplicationsByStaffId, studentProfiles]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDownloadFile = (fileAttach) => {
    const link = document.createElement("a");
    link.href = fileAttach;
    link.download = "fileAttach";
    link.click();
  };

  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7); // Default items per page
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    const filtered = programApplicationsByStaffId.filter(application => {
      return (
        application.programApplicationId.toString().includes(search) ||
        application.studentProfile?.fullName.toLowerCase().includes(search) ||
        application.studentProfile?.createDate.includes(search) ||
        application.program?.nameProgram.toLowerCase().includes(search)
      );
    });
    setFilteredData(filtered);
    setActivePage(0); // Reset to the first page upon search change
  }, [programApplicationsByStaffId, searchTerm]);

  const displayedData = filteredData.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);
  const paginationLength = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return <Chip label="Đang xử lí" color="default" />;
      case 1:
        return <Chip label="Bổ sung tài liệu" color="warning" />;
      case 2:
        return <Chip label="Đăng ký thành công" color="success" />;
      case 3:
        return <Chip label="Đăng ký thất bại" color="error" />;
        case 4:
          return <Chip label="Hủy bỏ đăng ký" color="error" />;
          case 5:
            return <Chip label="Hồ sơ hoàn tất" color="primary" />;
            case 6:
              return <Chip label="Hủy bỏ đăng ký giữa chừng" color="error" />;
      default:
        return <Chip label="Hồ sơ hoàn tất" color="primary" />;
    }
  };
  const handleStatusChange = (applicationId, newStatus) => {
    const application = programApplicationsByStaffId.find(app => app.programApplicationId === applicationId);
    dispatch(updateProgramApplication({
      ...application,
      status: newStatus,
    })).then(() => {
      dispatch(getProgramApplicationsByStaffId(staffId));
    });
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
            {`Danh sách hồ sơ đăng khú chương trình - Staff ID: ${staffId}`}
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
                </Row>
              </Form>
              <div className="table-responsive">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      {theadData.map((item, index) => (
                        <th key={index}>{item.heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((item, index) => (
                      <tr key={index}>
                        <td >{item.programApplicationId}</td>
                        <td>{item.studentProfile?.fullName}</td>
                        <td>{item.updateDate}</td>
                        <td>{item.program?.nameProgram}</td>
                        <td  style={{textAlign:'center'}}>{getStatusText(item.status)}</td>
                        <td>
                          <Form.Control
                            as="select"
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.programApplicationId, parseInt(e.target.value))}
                          >
                            <option value={0}>Đang xử lí</option>
                            <option value={1}>Đã xét duyệt hồ sơ</option>
                            <option value={2}>Xét duyệt thành công</option>
                            <option value={3}>Xét duyệt thất bại</option>
                            <option value={4}>Đóng hồ sơ</option>
                            <option value={5}>Hồ sơ đã hoàn tất</option>
                            <option value={6}>Hồ sơ đã hủy</option>
                          </Form.Control>
                        </td>
                        <td>
                          <Button onClick={() => handleDetailClick(item)}>Chi tiết <i className="fa fa-info-circle" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="pagination-wrapper">
                  <div className="pagination justify-content-center mt-4">
                    <button
                      className={`btn ${activePage === 0 ? "disabled" : ""}`}
                      onClick={() => setActivePage(Math.max(0, activePage - 1))}
                    >
                      Trước
                    </button>
                    {[...Array(paginationLength).keys()].map(page => (
                      <button
                        key={page}
                        className={`btn ${activePage === page ? "btn-primary" : "btn-light"}`}
                        onClick={() => setActivePage(page)}
                      >
                        {page + 1}
                      </button>
                    ))}
                    <button
                      className={`btn ${activePage === paginationLength - 1 ? "disabled" : ""}`}
                      onClick={() => setActivePage(Math.min(paginationLength - 1, activePage + 1))}
                    >
                      Sau
                    </button>
                  </div>
                </div>
              </div>
              <Modal
                show={selectedProfileId}
                onHide={handleCloseModal}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Hồ sơ học sinh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {studentProfile && (
                    <div>
                      <p>
                        <strong>Name:</strong> {studentProfile.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {studentProfile.email}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong>{" "}
                        {studentProfile.dateOfBirth}
                      </p>
                      <p>
                        <strong>Gender:</strong> {studentProfile.gender}
                      </p>
                    </div>
                  )}
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ProgramApplicationPage;
