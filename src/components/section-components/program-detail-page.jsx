import { Backdrop, CircularProgress, Grid, Button } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover, Card, Row, Col, ListGroup, ListGroupItem, ProgressBar, Badge, Accordion, useAccordionButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { FaChevronDown } from 'react-icons/fa';
import { getAllCertificates, filterCertificatesByProgramId } from "../../redux/slice/programCertificateSlice";
import { createNotification, getNotification } from "../../redux/slice/authSlice";
import { getMajorById } from "../../redux/slice/majorSlice";
import { createProgramApplication, getProgramById, getProgramByProgramType, getProgramByUniId, getProgramTypes, resetProgramById } from "../../redux/slice/programSlice";
import { getSemesterById } from "../../redux/slice/semesterSlice";
import { getStateById } from "../../redux/slice/stateSlice";
import { getStudentProfileByCustomerId, getStudentProfileById, resetStudent } from "../../redux/slice/studentSlice";
import { getUniversityById } from "../../redux/slice/universitySlice";
import { imageDb } from "../FirebaseImage/Config";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getSchoolProfilesByStudentProfileId, resetShoolProfiles } from "../../redux/slice/schoolProfileSlice";

const descriptionStyle = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxHeight: '4.5em',
  lineHeight: '1.5em', 
};
import {
  getAllStudentCertificates, getAllStudentCertificatesByProfile
} from "../../redux/slice/studentCertificateSlice";

function CustomToggle({ children, eventKey, callback }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

  return (
    <div onClick={decoratedOnClick} style={{ cursor: 'pointer' }}>
      {children}
      <span className="float-right">
        <i className="bi bi-chevron-down"></i>
      </span>
    </div>
  );
}

function ProgramDetailPage() {
  const [showModal, setShowModal] = useState(false);
 

  const dispatch = useDispatch();
  
  const { programById } = useParams();

  const token = useSelector((state) => state.auth.token);
  const customerId = jwtDecode(token).UserId;
  const navigate = useNavigate();
  const handleCreateProfile = () => {
    // Điều hướng đến trang create-student-profile
    navigate("/create-student-profile");
  };
  const handleCheckReq = () => {
    // Điều hướng đến trang create-student-profile
    dispatch(resetStudent());
    // dispatch(resetShoolProfiles()); 
    navigate(`/program-details/check-requirement/${programById}`);
  };
  const handleOpenModal = () => {
    dispatch(resetStudent());
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      studentProfileId: "",
      programId: "",
    });
    dispatch(resetStudent());
  };

  const programTypeId = useSelector(
    (state) => state?.program?.programById?.programTypeId
  );
  const universityId = useSelector(
    (state) => state?.program?.programById?.universityId
  );
  const stateId = useSelector(
    (state) => state?.university?.universityById?.stateId
  );
  const semesterId = useSelector(
    (state) => state?.program?.programById?.semesterId
  );
  const semesterDetails = useSelector((state) => state.semester.semesterById);
  const universityIdDetail = useSelector(
    (state) => state?.university?.universityById
  );

  const majorId = useSelector((state) => state?.program?.programById?.majorId);

  const programByType = useSelector(
    (state) => state?.program?.programsByProgramType
  );
  const loading = useSelector((state) => state?.program?.loading);

  const programDetail = useSelector((state) => state?.program?.programById);
  const stateDetail = useSelector((state) => state?.state?.stateById);
  const majorDetail = useSelector((state) => state?.major?.majorById);
  const programType = useSelector((state) => state?.program?.programTypes);
  const certificates = useSelector((state) => state.certificate.certificates);
  const certificatesByProgramId = useSelector((state) =>
    state.certificate.certificatesByProgramId.filter((certificate) => certificate.minLevel !== 0)
  );
  const studentCertificates = useSelector((state) => state.studentCertificate.studentCertificates);

  const profileStudent = useSelector(
    (state) => state?.student?.studentProfileByCustomerId
  );

  useEffect(() => {
    dispatch(getProgramTypes());
  }, [dispatch]);

  useEffect(() => {
    if (programById) {
      dispatch(getProgramById(programById));
    }
  }, [dispatch, programById]);

  useEffect(() => {
    if (programTypeId) {
      dispatch(getProgramByProgramType(programTypeId));
    }
  }, [dispatch, programTypeId]);

  useEffect(() => {
    if (universityId) {
      dispatch(getUniversityById(universityId));
    }
  }, [dispatch, universityId]);

  useEffect(() => {
    if (universityId) {
      dispatch(getProgramByUniId(universityId));
    }
  }, [dispatch, universityId]);

  useEffect(() => {
    if (stateId) {
      dispatch(getStateById(stateId));
    }
  }, [dispatch, stateId]);

  useEffect(() => {
    if (semesterId) {
      dispatch(getSemesterById(semesterId));
    }
    if (programDetail.semesterId) {
      dispatch(getSemesterById(programDetail.semesterId));
    }
  }, [dispatch, programDetail.semesterId, semesterId]);

  useEffect(() => {
    if (majorId) {
      dispatch(getMajorById(majorId));
    }
  }, [dispatch, majorId]);

  useEffect(() => {
    if (customerId) {
      dispatch(getStudentProfileByCustomerId(customerId));
    }
  }, [dispatch, customerId]);

  useEffect(() => {
    dispatch(getAllCertificates());
  }, [dispatch]);

  useEffect(() => {
    if (programById) {
      dispatch(filterCertificatesByProgramId(Number(programById)));
    }
  }, [dispatch, programById]);

  useEffect(() => {
    dispatch(getAllStudentCertificates());
  }, [dispatch]);



  const getTypeName = (typeId) => {
    if (!programType) return "";
    const type = programType.find((type) => type.programTypeId === typeId);
    return type ? type.typeName : "";
  };

  const getDescriptionByProgramTypeId = (typeId) => {
    if (!programType) return "";
    const type = programType.find((type) => type.programTypeId === typeId);
    return type ? type.description : "";
  };

  const getMajorDescriptionByMajorId = (majorId) => {
    if (!majorDetail) return "";

    if (majorDetail.majorId === majorId) {
      return majorDetail.description;
    }

    return "";
  };

  const majorDetailsPopover = (
    <Popover id="program-type-popover">
      <Popover.Header as="h4"> {majorDetail.majorName}</Popover.Header>
      <Popover.Body>
        {getMajorDescriptionByMajorId(majorDetail.majorId)}
      </Popover.Body>
    </Popover>
  );

  const programTypePopover = (
    <Popover id="program-type-popover">
      <Popover.Header as="h4">
        {getTypeName(programDetail.programTypeId)}?
      </Popover.Header>
      <Popover.Body>
        {getDescriptionByProgramTypeId(programDetail.programTypeId)}
      </Popover.Body>
    </Popover>
  );

  const uniDetailsPopover = (
    <Popover id="program-type-popover">
      <Popover.Header as="h4">
        Thông tin {universityIdDetail?.universityName}
      </Popover.Header>
      <Popover.Body>
        <div style={{ overflow: "auto" }}>
          <img
            src={universityIdDetail?.img}
            alt="University Logo"
            style={{
              width: "100px",
              float: "left",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          />
          <p>{universityIdDetail?.description}</p>
          <div style={{ clear: "both" }}>
            <Link
              className="read-more-text"
              to={`/university-details/${universityIdDetail?.universityId}`}
            >
              XEM THÊM <i className="fa fa-angle-right" />
            </Link>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  const [formData, setFormData] = useState({
    studentProfileId: undefined,
    programId: programById,
  });

  const profileStudentId = formData.studentProfileId;
  useEffect(() => {
    if (profileStudentId) {
      dispatch(getStudentProfileById(profileStudentId));
      dispatch(resetStudent());
    }
  }, [profileStudentId]);

  const studentProfileDetail = useSelector(
    (state) => state?.student?.profileById
  );

  const handleSelectChange = (selectedOption) => {
    // Update the formData state with the selected option
    setFormData({
      ...formData,
      studentProfileId: selectedOption.value,
    });
  };
  useEffect(() => {
    if (studentProfileDetail.studentProfileId) {
      dispatch(getAllStudentCertificatesByProfile(studentProfileDetail.studentProfileId));
    }
  }, [dispatch, studentProfileDetail.studentProfileId]);

  useEffect(() => {
    if (studentProfileDetail?.studentProfileId) {
      dispatch(getSchoolProfilesByStudentProfileId(studentProfileDetail.studentProfileId));
    }
  }, [dispatch, studentProfileDetail?.studentProfileId]);

  const schoolProfiles = useSelector(
    (state) => Array.isArray(state.schoolProfile.schoolProfilesByStudentProfileId) ? state.schoolProfile.schoolProfilesByStudentProfileId : []
  ).filter(profile => profile.studentProfileId === studentProfileDetail.studentProfileId);

console.log("schoolProfiles",schoolProfiles)
console.log("studentProfileDetail",studentProfileDetail)

  // const handleSubmitProgramApplication = (e) => {
  //   e.preventDefault();
  //   if (formData.studentProfileId) {
  //     dispatch(createProgramApplication(formData));
  //     const programId = programById;
  //     dispatch(createNotification({ programId, customerId }));
  //     Swal.fire({
  //       icon: "success",
  //       title: "Nộp hồ sơ thành công!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     navigate('/students-profile');
  //   } else {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Chọn hồ sơ học sinh!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const generatePDF = () => {
    const input = document.getElementById('profile-content');
    if (!input) {
      console.error('Could not find element with id profile-content');
      return;
    }

    html2canvas(input, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("profile.pdf");
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const [selectedCertificate, setSelectedCertificate] = useState(null);

const handleSelectCertificateChange = (selectedOption) => {
  const certificate = certificatesByProgramId.find(c => c.certificateType.certificateName === selectedOption.value);
  setSelectedCertificate(certificate);
};

const selectedStudentCertificate = studentCertificates?.find(c => c?.certificateTypeDto?.certificateName === selectedCertificate?.certificateType?.certificateName);
// console.log("studentProfileDetail",selectedStudentCertificate)


  return (
    <>
      <div className="course-single-area pd-top-120 pd-bottom-90">
        <div className="container">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="row">
            <div className="details-inner" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '20px 0', width:'100%' }}>
              <h3 className="title" style={{ fontSize: '2.5rem' }}>{programDetail.nameProgram}</h3>
            </div>
            <div className="col-lg-8">
              <div className="course-course-detaila-inner">
                <div className="thumb">
                  <img
                    src={programDetail.img}
                    alt="img"
                    style={{ width: "810px", height: "400px" }}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="course-details-content">
                      <h4 className="title">Mô tả chi tiết</h4>
                      <p>{programDetail.description}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Col lg={6}>
                    <Card className="mb-4">
                      <Card.Body>
                        <h4 className="title">Yêu cầu của chương trình</h4>
                        <ListGroup variant="flush">
                          {programDetail.requirement?.split(',').map((item, index) => (
                            <ListGroupItem key={index} className="d-flex align-items-center" style={{ border: 'none', padding: '10px 15px', fontSize: '16px', backgroundColor: 'transparent' }}>
                              <ul className="single-list-wrap">
                                <li className="single-list-inner style-check-box">
                                  {index + 1}. {item}
                                </li>
                              </ul>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6}>
                    <Card className="mb-4">
                      <Card.Body>
                        <h4 className="title">Các ưu đãi</h4>
                        <ListGroup variant="flush">
                          {programDetail.responsibilities?.split("\\r\\n").map((item, index) => (
                            <ListGroupItem key={index} className="d-flex align-items-center" style={{ border: 'none', padding: '10px 15px', fontSize: '16px', backgroundColor: 'transparent' }}>
                              <ul className="single-list-wrap">
                                <li className="single-list-inner style-check-box">
                                  <i className="fa fa-check" /> {item}
                                </li>
                              </ul>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="widget">
                      <h4 className="widget-title">Chi phí kham thảo</h4>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Thông tin</th>
                            <th>Giá trị</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Phí đăng ký</td>
                            <td>{programDetail.tuition?.split("\\r\\n")[0]}</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Học phí</td>
                            <td>{programDetail.tuition?.split("\\r\\n")[1]}</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Chi phí dịch vụ</td>
                            <td>{programDetail.tuition?.split("\\r\\n")[2]}</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Bảo hiểm</td>
                            <td>{programDetail.tuition?.split("\\r\\n")[3]}</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Chi phí sinh hoạt</td>
                            <td>{programDetail.tuition?.split("\\r\\n")[4]}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="td-sidebar">
                <div className="widget widget_feature">
                  <h4 className="widget-title">Chi tiết Chương trình</h4>
                  <ul>
                    <li><i className="fa fa-university" /> <span>Trường Đại học:</span> {universityIdDetail?.universityName}</li>
                    <li><i className="fa fa-map-marker" /> <span>Tiểu Bang:</span> {stateDetail.stateName}</li>
                    <li><i className="fa fa-laptop" /> <span>Chuyên ngành chính:</span> {majorDetail.majorName}</li>
                    <li><i className="fa fa-clipboard" /> <span>Lộ trình học:</span> {programDetail.duration}</li>
                    <li><i className="fa fa-language" /> <span>Trình độ đào tạo:</span> {programDetail.level}</li>
                    <li><i className="fa fa-calendar" /> <span>Học kỳ:</span> {semesterDetails.startDate} đến {semesterDetails.endDate}</li>
                    <li><i className="fa fa-graduation-cap" /> <span>Loại chương trình:</span> {getTypeName(programDetail.programTypeId)}</li>
                  </ul>
                  <div className="price-wrap text-center">
                    <h5>Tham gia ngay !!!</h5>
                    <a className="btn btn-base btn-radius" onClick={handleCheckReq}>GỬI ĐƠN ĐĂNG KÝ CHƯƠNG TRÌNH</a>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="title">Tiến trình</h4>
                  {programDetail && programDetail.programStageDtos && (
                    <Accordion defaultActiveKey="0">
                      {programDetail.programStageDtos.map((stage, index) => (
                        <ListGroup.Item key={stage.programStageId}>
                          <CustomToggle eventKey={`${index}`} expanded={stage.expanded}>
                            <h5>{index + 1}. {stage.stageName} <FaChevronDown className="float-right" style={{ margin: '0 auto' }} /></h5>
                          </CustomToggle>
                          {/* <Accordion.Collapse eventKey={`${index}`}>
                            <div>
                              <div>Fee ID: {stage.programFeeId || "N/A"}</div>
                              <Badge bg={stage.isPayment ? "success" : "danger"}>
                                {stage.isPayment ? "Yêu cầu thanh toán" : "Không yêu cầu thanh toán"}
                              </Badge>
                            </div>
                          </Accordion.Collapse> */}
                        </ListGroup.Item>
                      ))}
                    </Accordion>
                  )}
                </div>
              </div>
              <div className="widget" style={{marginTop:'24px'}}>
                <h4 className="widget-title">Những Chứng Chỉ Liên Quan</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Loại chứng chỉ</th>
                      <th>Điểm tối thiểu</th>
                      <th>Điểm trung bình</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificatesByProgramId.map((certificate, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{certificate.certificateType.certificateName}</td>
                        <td>{certificate.minLevel}</td>
                        <td>{certificate.averageLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="widget">
            <h4 className="widget-title">Những Chương Trình Tương Tự</h4>
            {programByType && programByType?.length > 1 ? (
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
                nextArrow={
                  <span
                    className="carousel-control-next-icon"
                    style={{
                      fontSize: customCarouselStyle.controlIconSize,
                      color: customCarouselStyle.controlIconColor,
                    }}
                  />
                }
                prevArrow={
                  <span
                    className="carousel-control-prev-icon"
                    style={{
                      fontSize: customCarouselStyle.controlIconSize,
                      color: customCarouselStyle.controlIconColor,
                    }}
                  />
                }
              >
                {programByType
                  .filter(
                    (program) => program.programId.toString() !== programById
                  )
                  .map((program, index) => (
                    <div key={index} className="col-lg-12 col-md-6">
                      <div className="single-course-inner">
                        <div className="thumb">
                          <img src={program.img} alt="img" style={{ width: "100%",height: "150px",objectFit:'cover'}} />
                        </div>
                        <div className="details">
                          <div className="details-inner" style={{ height: "100px" }}>
                            <h5>
                              <Link onClick={handleScrollToTop} to={`/program-details/${program.programId}`} style={{ fontSize: "14px" }}>
                                {program.nameProgram}
                              </Link>
                            </h5>
                            <p className="card-text">{program.university.universityName}</p>
                          </div>
                          <div className="emt-course-meta">
                            <div className="row">
                              <div className="col-12">
                                <div className="text-center" style={{fontSize:'12px'}}>
                                  <span style={descriptionStyle}>{program.description}...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            ) : (
              <div className="text-center p-4 ">
                <h4>Không có chương trình tương tự</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  zIndex: "1",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "90%",
  overflow: "auto",
};

const modalContentStyle = {
  backgroundColor: "#fefefe",
  padding: "20px",
  borderRadius: "8px",
};

const modalBgStyle = {
  position: "fixed",
  zIndex: "0",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
};

const customCarouselStyle = {
  controlIconSize: "2rem", // Kích thước của biểu tượng điều khiển
  controlIconColor: "#333", // Màu sắc của biểu tượng điều khiển
};

export default ProgramDetailPage;
