import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProgramApplication } from "../../../redux/slice/programApplicationSlice";
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
} from "react-bootstrap";
import { getAllUsers } from "../../../redux/slice/authSlice";
import PaymentContext from "./context/payment-context";
import { Link } from "react-router-dom";
import { getAllProgramStages } from "../../../redux/slice/programStageSlice";
import {
  getAllStage,
  selectApplyStageById,
} from "../../../redux/slice/applyStageSlice";
import ApplicationDetails from "./application-details";
import Swal from "sweetalert2";

const theadData = [
  { heading: "PAId", sortingVale: "id" },
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
const ProgramApplicationPage = ({setMain }) => {

  const { setSelectedApp } = useContext(PaymentContext);
  
  const handleCreateFee = (application) => {
    setSelectedApp(application); 
    setMain("Thanh toán");       
  };


  const dispatch = useDispatch();
  const [sort, setSortata] = useState(10);
  const { programApplications, loading, error } = useSelector(
    (state) => state.programApplication
  );

  console.log("chuong trnh",programApplications)
  const [selectedProfileId, setSelectedProfileId] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);

  const [programs, setPrograms] = useState({});
  const [studentProfiles, setStudentProfiles] = useState({});
  // console.log("isPaymentRequired",isPaymentRequired)
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);

  const customers = useSelector((state) => state.auth.user);
  const programStages = useSelector((state) => state.programStages.stages);

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
  const [selectedApplication, setSelectedApplication] = useState(null);
  console.log("seldfasfsafa:", selectedApplication);

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
  // const handleUpdateApplyStage = () => {
  //   if (selectedApplication && selectedProgramStageId) {
  //     dispatch(
  //       updateApplyStageById({
  //         applyStageId: selectedApplication.applyStage.applyStageId,
  //         programStageId: selectedProgramStageId,
  //       })
  //     )
  //       .then(() => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Cập nhật trạng thái hồ sơ thành công!",
  //           showConfirmButton: false,
  //           timer: 2000,
  //         }).then(() => {
  //           setShowCheckSuccess(true);
  //           setShowCheckModal(false);
  //           dispatch(getAllProgramApplication()); 
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error updating apply stage:", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Đã xảy ra lỗi khi cập nhật trạng thái hồ sơ!",
  //         });
  //       });
  //   } else {
  //     alert(
  //       "Vui lòng chọn cả Hồ sơ ứng tuyển và Giai đoạn chương trình để cập nhật."
  //     );
  //   }
  // };

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
      const studentName = studentProfiles[application.studentProfileId]?.fullName || "";
      console.log(`Student Name: ${studentName}, Application ID: ${application.studentProfileId}`);
  
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
        const programStageResponse = await dispatch(getProgramStageById(response.payload.programStageId));
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

  return (
    <div>
      {loading || !programApplications ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Row>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Danh sách hồ sơ</h4>
                  <Link to="/add-staff" className="btn btn-primary">
                    + Thêm mới
                  </Link>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="holidayList"
                      className="dataTables_wrapper no-footer"
                    >
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <div className="dataTables_length">
                          <label className="d-flex align-items-center">
                            hiển thị
                            <Dropdown className="search-drop">
                              <Dropdown.Toggle
                                as="div"
                                className="search-drop-btn"
                              >
                                {sort}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSortata("10")}>
                                  10
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortata("20")}>
                                  20
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortata("30")}>
                                  30
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            hàng
                          </label>
                        </div>
                        <div className="dataTables_filter">
                          <label>
                            Tìm kiếm :{" "}
                            <input
                              type="search"
                              className=""
                              placeholder=""
                              onChange={(e) => setSearchTerm(e.target.value)}
                                />
                          </label>
                        </div>
                      </div>
                      <table
                        id="example4"
                        className="display dataTable no-footer w-100"
                      >
                        <thead>
                          {theadData.map((item, index) => (
                            <th key={index}>{item.heading}</th>
                          ))}
                        </thead>
                        <tbody>
                        {(searchTerm.trim() === "" ? programApplications : sortedApplications).map((application) => (
                            <tr
                              key={application.studentProfileId}
                              className="table-row-border"
                            >
                              <td>{application.programApplicationId}</td>
                              <Link
                                onClick={() =>
                                  handleOpenModal(application.studentProfileId)
                                }
                              >
                                <td>
                                  {
                                    studentProfiles[
                                      application.studentProfileId
                                    ]?.fullName
                                  }
                                </td>
                              </Link>
                              <td>
                                {
                                  studentProfiles[application.studentProfileId]
                                    ?.createDate
                                }
                              </td>
                              <td>
                                {programs[application.programId]?.nameProgram}
                              </td>
                              <td>
  {application.applyStage?.programStage?.stageName || 'N/A'}
</td>
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                   onClick={() => handleCreateFee(application)}
                                  className="btn btn-xs sharp btn-primary me-1"
                                  style={{
                                    ...style.button,
                                    width: "30px",
                                    height: "30px",
                                    padding: "0 20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "5px",
                                  }}
                                >
                                  <i className="fa fa-info-circle" />{" "}
                                  {/* Thay icon thành icon chi tiết thông tin */}
                                </button>
                                <button
                                  onClick={handleShowDeleteModal}
                                  className="btn btn-xs sharp btn-danger"
                                  style={{
                                    ...style.button,
                                    width: "30px",
                                    height: "30px",
                                    padding: "0 20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                                <Modal
                                  show={selectedProfileId}
                                  onHide={handleCloseModal}
                                 
                                  centered
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "32px" }}>
                                      Hồ sơ học sinh
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {studentProfile && (
                                      <div
                                        style={{
                                          display: "grid",
                                          gridTemplateColumns: "1fr 1fr",
                                          gap: "10px",
                                        }}
                                      >
                                        <div>
                                          <p
                                            style={{
                                              fontWeight: "bold",
                                              fontSize: "24px",
                                            }}
                                          >
                                            Thông tin học sinh:
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Họ và tên học sinh:
                                            </span>{" "}
                                            {studentProfile.fullName}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Email:
                                            </span>{" "}
                                            {studentProfile.email}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Ngày sinh:
                                            </span>{" "}
                                            {studentProfile.dateOfBirth}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Giới tính:
                                            </span>{" "}
                                            {studentProfile.gender}
                                          </p>
                                          <p className="d-flex">
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Bộ hồ sơ
                                            </span>
                                            {studentProfile &&
                                            studentProfile.fileUploads &&
                                            studentProfile.fileUploads.length >
                                              0 ? (
                                              studentProfile.fileUploads.map(
                                                (file, index) => (
                                                  <div
                                                    key={index}
                                                    className="m-2"
                                                  >
                                                    <Button
                                                      className="me-2"
                                                      variant="secondary btn-rounded"
                                                      onClick={() =>
                                                        handleDownloadFile(
                                                          file.fileAttach
                                                        )
                                                      }
                                                    >
                                                      <span className="btn-icon-start text-warning mr-2">
                                                        <i className="fa fa-download" />
                                                      </span>
                                                      PDF {index + 1}
                                                    </Button>
                                                  </div>
                                                )
                                              )
                                            ) : (
                                              <span className="ml-2">
                                                Chưa bổ sung file PDF
                                              </span>
                                            )}
                                          </p>
                                        </div>
                                        <div>
                                          <p
                                            style={{
                                              fontWeight: "bold",
                                              fontSize: "24px",
                                            }}
                                          >
                                            Thông tin liên hệ:
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Họ và tên khách hàng:
                                            </span>
                                            {getCustomerName(
                                              studentProfile.customerId
                                            )}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Điện thoại:
                                            </span>{" "}
                                            {studentProfile.phone}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Địa chỉ:
                                            </span>{" "}
                                            {studentProfile.address}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Ngày tạo:
                                            </span>{" "}
                                            {studentProfile.createDate}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Nơi sinh:
                                            </span>{" "}
                                            {studentProfile.placeOfBirth}
                                          </p>
                                          <p>
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Số CMND:
                                            </span>{" "}
                                            {studentProfile.nationalId}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </Modal.Body>

                                  <Modal.Footer></Modal.Footer>
                                </Modal>
                                ;
                                <Modal
                                  show={showCheckModal}
                                  onHide={handleCloseCheckModal}
                                  centered
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "32px" }}>
                                      {selectedApplication &&
                                        selectedApplication.applyStage
                                          ?.programStage.program.nameProgram}
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {selectedApplication && (
                                      <Row>
                                        <Col xs={12} md={6}>
                                          <Card>
                                            <Card.Body>
                                              <Card.Title className="text-primary mb-3">
                                                Trường đại học:{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .university.universityName
                                                }
                                              </Card.Title>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Bang:
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .university.state.stateName
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Tầm nhìn và giá trị:{" "}
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .university.slogan
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  {" "}
                                                  Trang web
                                                </span>{" "}
                                                :{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .university.website
                                                }
                                              </Card.Text>
                                              <Image
                                                src={
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .university.img
                                                }
                                                alt="University Image"
                                                fluid
                                              />
                                            </Card.Body>
                                          </Card>
                                        </Col>
                                        <Col xs={12} md={6}>
                                          <Card>
                                            <Card.Body>
                                              <Card.Title className="text-success mb-3">
                                                Chương trình
                                              </Card.Title>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Chuyên ngành:
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program.major
                                                    .majorName
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Trạng thái:
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program.status
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Loại chương trình:
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .programType.typeName
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Mô tả:
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .description
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                                <span className="font-weight-bold">
                                                  Thời gian:
                                                </span>{" "}
                                                {
                                                  selectedApplication.applyStage
                                                    ?.programStage.program
                                                    .duration
                                                }
                                              </Card.Text>
                                              <Card.Text className="mb-3">
                                              <div className="d-flex justify-content-sm-around">                                           
                                                <span className="font-weight-bold ">
                                                  Trạng thái hồ sơ:
                                                  
                                                </span>{" "}
                                                {/* {
                                                  selectedApplication.applyStage
                                                    ?.programStage?.stageName || 'N/A'
                                                } */}
                                                      <span className="font-weight-bold ">
                                               Thanh toán:
                                           
                                                </span>{" "}
                                                {selectedApplication.applyStage?.programStage.isPayment ? "Có" : "Không"}

                                             </div>
                                              </Card.Text>
                                              <div className="d-flex  justify-content-sm-around">
  <Form.Select
    value={selectedProgramStageId}
    onChange={handleProgramStageChange}
    className="me-2"
  >
    <option value="">Chọn giai đoạn hồ sơ ứng tuyển chương trình</option>
    {getProgramStagesByProgramId(
      selectedApplication.applyStage?.programStage.program.programId
    ).map((stage) => (
      <option key={stage.programStageId} value={stage.programStageId}>
        {/* {stage?.stageName || 'N/A'} */}
      </option>
    ))}
  </Form.Select>
  
  {/* {selectedApplication && selectedApplication.applyStage.programStage.isPayment &&
    programApplications.map((application) => (
      application.programApplicationId === selectedApplication.programApplicationId &&
      <button key={application.programApplicationId} onClick={() => handleCreateFee(application)}>
        Tạo Phí
      </button>
    ))
  } */}

</div>
                                            </Card.Body>
                                          </Card>
                                        </Col>
                                      </Row>
                                    )}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="primary"
                                  
                                    >
                                      Duyệt
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          {/* <Row>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Danh sách hồ sơ đã duyệt</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {renderApprovedApplications()}
                  </div>
                </div>
              </div>
            </div>
          </Row> */}
        </>
      )}
    </div>
  );
};

export default ProgramApplicationPage;
