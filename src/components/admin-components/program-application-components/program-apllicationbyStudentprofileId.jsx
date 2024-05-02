import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProgramApplication,
  getProgramApplicationById,
} from "../../../redux/slice/programApplicationSlice";
import { getStudentProfileById } from "../../../redux/slice/studentSlice";
import { getProgramById } from "../../../redux/slice/programSlice";
import { getProgramStageById } from "../../../redux/slice/programStageSlice";
import {
  Modal,
  Button,
  Row,
  Dropdown,
  Form,
  Col,
  Image,
  Card,
  Table,
} from "react-bootstrap";
import { getAllUsers } from "../../../redux/slice/authSlice";
import PaymentContext from "./context/payment-context";
import { Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getAllProgramStages } from "../../../redux/slice/programStageSlice";
import {
  getAllStage,
  selectApplyStageById,
} from "../../../redux/slice/applyStageSlice";
import ApplicationDetails from "./application-details";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import { VerticalAlignTop } from "@mui/icons-material";
import './program-applicationbyStudentprofile.css'
const theadData = [
  { heading: "Mã hồ sơ", sortingVale: "id" },
  { heading: "Hồ sơ sinh viên", sortingVale: "name" },
  // { heading: "Tư vấn viên phụ trách", sortingVale: "advisor" },
  { heading: "Ngày tạo", sortingVale: "date" },
  { heading: "Chương trình ứng tuyển", sortingVale: "program" },
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


 
  const handleCreateFee = (application) => {

    setSelectedApp(application);
    setMain("Thanh toán");
  };

  const dispatch = useDispatch();
  const [sort, setSortData] = useState(10);
  const { programApplications, loading, error } = useSelector(
    (state) => state.programApplication
  );

  console.log("chuong trnh", programApplications);
  const [selectedProfileId, setSelectedProfileId] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedApplicationProgram, setSelectedApplicationProgram] =
    useState(null);
  console.log("seldfasfsafa:", selectedApplicationProgram);
  const [programs, setPrograms] = useState({});
  const [studentProfiles, setStudentProfiles] = useState({});
  // console.log("isPaymentRequired",isPaymentRequired)
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);

  const customers = useSelector((state) => state.auth.user);
  const programStages = useSelector((state) => state.programStages.stages);
  const activeStage = programApplications?.applyStage?.find(
    (stage) => stage.status === 1
  );
  const findActiveStageName = (application) => {
    const activeStage = application.applyStage?.find(stage => stage.status === 1);
    return activeStage ? activeStage.programStage.stageName : 'Hồ sơ đã hoàn thành';
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
  // update ApplyStage

  const handleShowDetailsModal = (application) => {
    setSelectedApplication(application);
    setShowCheckModal(true);
  };

  const [selectedProgramStageId, setSelectedProgramStageId] = useState(null);

  const handleProgramStageChange = (e) => {
    setSelectedProgramStageId(parseInt(e.target.value));
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

  // sort and search data
  const [sortedApplications, setSortedApplications] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  // console.log("seatch là", searchTerm);
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
    console.log("Searching for:", searchTerm);
    console.log("Current studentProfiles:", studentProfiles);

    const filteredData = programApplications.filter((application) => {
      const studentName =
        studentProfiles[application.studentProfileId]?.fullName || "";
      console.log(
        `Student Name: ${studentName}, Application ID: ${application.studentProfileId}`
      );

      return studentName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log("Filtered Data:", filteredData);
    setSortedApplications(filteredData);
  };

  const handleSort = (sortingVale) => {
    sortData(sortingVale);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllProgramApplication());
    dispatch(getProgramById());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProgramStages());
    dispatch(getAllStage());
    dispatch(getAllStage());
  }, [dispatch]);

  useEffect(() => {
    setSortedApplications(programApplications);
  }, [programApplications]);

  useEffect(() => {
    searchData(searchTerm);
  }, [searchTerm]);

  const handleCloseCheckModal = () => setShowCheckModal(false);

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
    dispatch(getAllProgramApplication());
    dispatch(getProgramById());
  }, [dispatch]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programIds = programApplications.map(
        (application) => application.programId
      );
      for (const programId of programIds) {
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
    };

    if (programApplications.length > 0) {
      fetchPrograms();
    }
  }, [dispatch, programApplications]);

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      for (const application of programApplications) {
        const studentProfileId = application.studentProfileId;
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
    };

    fetchStudentProfiles();
  }, [dispatch, programApplications]);

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
  const filtered = programApplications.filter(application => {
    return (
      application.programApplicationId.toString().includes(search) ||
      application.studentProfile?.fullName.toLowerCase().includes(search) ||
      application.studentProfile?.createDate.includes(search) ||
      application.program?.nameProgram.toLowerCase().includes(search)
    );
  });
  setFilteredData(filtered);
  setActivePage(0); // Reset to the first page upon search change
}, [programApplications, searchTerm]);

const displayedData = filteredData.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);
const paginationLength = Math.ceil(filteredData.length / itemsPerPage);
const handlePageChange = (newPage) => {
  setActivePage(newPage);
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
                    <Form.Control type="search" placeholder="Search" />
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
                        {theadData.map((item, index) => (
                          <th key={index}>{item.heading}</th>
                        ))}
                      </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.programApplicationId}</td>
                        <td>{item.studentProfile?.fullName}</td>
                        <td>{item.studentProfile?.createDate}</td>
                        <td>{item.program?.nameProgram}</td>
                        <td>{findActiveStageName(item)}</td>
                        <td>
                          <Button onClick={() => handleCreateFee(item)}>Chi tiết   <i className="fa fa-info-circle" /></Button>
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
