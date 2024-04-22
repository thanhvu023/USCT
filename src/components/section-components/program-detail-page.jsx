import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import {
  createProgramApplication,
  getAllProgram,
  getProgramById,
  getProgramByProgramType,
  getProgramByUniId,
  // getProgramByUniId,
} from "../../redux/slice/programSlice";
import { useParams } from "react-router-dom";
import { getUniversityById } from "../../redux/slice/universitySlice";
import { getStateById } from "../../redux/slice/stateSlice";
import { getSemesterById } from "../../redux/slice/semesterSlice";
import { getMajorById } from "../../redux/slice/majorSlice";
import {
  getStudentProfileByCustomerId,
  getStudentProfileById,
  resetStdeunt,
} from "../../redux/slice/studentSice";
import { getProgramTypes } from "../../redux/slice/programSlice";
import jwtDecode from "jwt-decode";
import { getDownloadURL, ref } from "firebase/storage";
import { imageDb } from "../FirebaseImage/Config";
import { Backdrop, CircularProgress } from "@mui/material";

function ProgramDetailPage() {
  let publicUrl = process.env.PUBLIC_URL + "/";
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      studentProfileId: "",
      programId: "",
    });
    dispatch(resetStdeunt());
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
  const universityIdDeatil = useSelector(
    (state) => state?.university?.universityById
  );
  const majorId = useSelector((state) => state?.program?.programById?.majorId);
  const programByType = useSelector(
    (state) => state?.program?.programsByProgramType
  );
  const UniversityDetails = useSelector(
    (state) => state?.program?.programsByUniId
  );
  const loading = useSelector((state) => state?.program?.loading);

  const programDetail = useSelector((state) => state?.program?.programById);
  const stateDetail = useSelector((state) => state?.state?.stateById);
  const majorDetail = useSelector((state) => state?.major?.majorById);
  const programType = useSelector((state) => state?.program?.programTypes);

  // console.log("programs:",programs)
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
  }, [dispatch, semesterId]);

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
  const getTypeName = (typeId) => {
    if (!programType) return "";
    const type = programType.find((type) => type.programTypeId === typeId);
    return type ? type.typeName : "";
  };

  const [formData, setFormData] = useState({
    studentProfileId: undefined,
    programId: programById,
  });
  const profileStudentId = formData.studentProfileId;
  useEffect(() => {
    if (profileStudentId) {
      dispatch(getStudentProfileById(profileStudentId));
      dispatch(resetStdeunt());
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
  const handleSubmitProgramApplication = (e) => {
    e.preventDefault();
    if (formData.studentProfileId) {
      console.log(formData);
      dispatch(createProgramApplication(formData));
    }
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const downloadFileFromStorage = async (fileName) => {
    try {
      const fileRef = ref(imageDb, `Image/ProfileStudent/${fileName}`);
      const downloadURL = await getDownloadURL(fileRef);
      window.open(downloadURL);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
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
            <div className="col-lg-8">
              <div className="course-course-detaila-inner">
                <div className="details-inner">
                  {/* <div className="emt-user">
                  <span className="u-thumb">
                    <img
                      src={publicUrl + "assets/img/author/1.png"}
                      alt="img"
                    />
                  </span>
                  <span className="align-self-center">Nancy Reyes</span>
                </div> */}
                  <h3 className="title">{programDetail.nameProgram}</h3>
                </div>
                <div className="thumb">
                  <img
                    src={publicUrl + "assets/img/course/programs.jpg"}
                    alt="img"
                  />
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="course-details-content">
                      <h4 className="title">Mô tả chi tiết</h4>
                      <p>{programDetail.description}</p>
                      <p>
                        Sau đây là những lợi ích lớn lao từ việc thực tập ở nước
                        ngoài:
                      </p>
                      <div className="row pt-4">
                        {/* {programDetail.responsibilities} */}
                        {/* <div className="col-sm-6">
                          <ul className="single-list-wrap">
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check" /> Làm đẹp thêm CV
                              trong mắt nhà tuyển dụng tương lai
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check" /> Mở rộng mạng lưới
                              bạn bè trên toàn thế giới
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check" /> Học thêm ngôn ngữ
                              mới
                            </li>
                          </ul>
                        </div> */}
                        {/* <div className="col-sm-6 mt-3 mt-sm-0">
                          <ul className="single-list-wrap">
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check" /> Có kinh nghiệm làm
                              việc trong môi trường chuyên nghiệp ở quốc gia
                              khác, hiểu biết rộng về văn hóa, tác phong làm
                              việc chuyên nghiệp, khả năng thích nghi cao, nâng
                              cao nghiệp vụ
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check" /> Thực tập kết hợp với
                              du lịch giá rẻ, khám phá thế giới diệu kỳ
                            </li>
                            
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="title ">Trách nhiệm</h4>
                    <ul>
                      {programDetail &&
                        programDetail.responsibilities &&
                        programDetail.responsibilities
                          .split("\\r\\n")
                          .map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))}
                    </ul>
                  </div>
                  <div className="col-lg-12">
                    <h4 className="title ">Yêu cầu của chương trình</h4>
                    <p>{programDetail?.requirement}</p>
                  </div>
                  <div className="col-lg-12">
                    <h4 className="title">Chi phí khám khảo</h4>
                    <ul>
                      {programDetail?.tuition &&
                        programDetail.tuition
                          .split("\\r\\n")
                          .map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="td-sidebar">
                <div className="widget widget_feature">
                  <h4 className="widget-title">Chi tiết Chương trình</h4>
                  <ul>
                    <li>
                      <i className="fa fa-university" />
                      <span>Trường Đại học:</span>
                      {universityIdDeatil?.universityName}
                    </li>
                    <li>
                      <i className="fa fa-map-marker" />
                      <span>Tiểu Bang:</span> {stateDetail.stateName}
                    </li>
                    <li>
                      <i className="fa fa-laptop" />
                      <span>Chuyên ngành chính:</span> {majorDetail.majorName}
                    </li>
                    <li>
                      <i className="fa fa-clipboard" />
                      <span>Lộ trình học:</span> {programDetail.duration}
                    </li>
                    <li>
                      <i className="fa fa-language" />
                      <span>Trình độ Tiếng Anh:</span> {programDetail.level}
                    </li>
                    <li>
                      <i className="fa fa-calendar" />
                      <span>Học kỳ:</span> Spring 2024
                    </li>
                    <li>
                      <i className="fa fa-graduation-cap" />
                      <span>Loại chương trình:</span>
                      {getTypeName(programDetail.programTypeId)}
                    </li>
                  </ul>
                  <div className="price-wrap text-center">
                    <h5>
                      Tham gia ngay !!!
                    </h5>

                    <a
                      className="btn btn-base btn-radius"
                      onClick={handleOpenModal}
                    >
                      GỬI ĐƠN ĐĂNG KÝ CHƯƠNG TRÌNH
                    </a>
                  </div>
                </div>
                {/* Modal */}
                {showModal && (
                  <form onSubmit={handleSubmitProgramApplication}>
                    <div
                      id="modal-bg"
                      className="modal-bg"
                      style={modalBgStyle}
                    ></div>
                    <div id="modal" className="modal" style={modalStyle}>
                      <div className="modal-content" style={modalContentStyle}>
                        <span
                          className="close"
                          onClick={handleCloseModal}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            fontSize: "32px",
                            cursor: "pointer",
                          }}
                        >
                          &times;
                        </span>

                        <h4>
                          Bạn đang đăng ký vào chương trình [
                          {programDetail.nameProgram}] tại
                          {universityIdDeatil?.universityName}
                        </h4>
                        <div className="form-group">
                          <label
                            htmlFor="fullName"
                            style={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            className="form-control"
                            defaultValue={studentProfileDetail.fullName}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="countryId"
                            style={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            Căn cước công dân
                          </label>
                          <input
                            type="text"
                            id="countryId"
                            className="form-control"
                            defaultValue={studentProfileDetail.nationalId}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="countryId"
                            style={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            defaultValue={studentProfileDetail.email}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="cvFile"
                            style={{
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginBottom: "5px",
                            }}
                          >
                            Hồ sơ học sinh:
                          </label>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {/* Select */}
                            <div style={{ flex: "1" }}>
                              {profileStudent.length > 0 ? (
                                <Select
                                  options={profileStudent.map((profile) => ({
                                    value: profile.studentProfileId,
                                    label: profile.fullName,
                                  }))}
                                  placeholder="Chọn hồ sơ học sinh"
                                  onChange={handleSelectChange}
                                />
                              ) : (
                                <p style={{ fontStyle: "italic" }}>
                                  Không có hồ sơ học sinh.
                                </p>
                              )}
                            </div>

                            {/* Button */}
                            <div style={{ marginLeft: "10px", height: "50px" }}>
                              <button
                                onClick={() =>
                                  downloadFileFromStorage('DSC_7398.JPG')
                                }
                              >
                                Download File
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleCreateProfile()}
                                style={{ height: "100%", fontSize: "14px" }}
                              >
                                Tạo hồ sơ
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                          >
                            Cancel
                          </button>
                          <button className="btn btn-primary">Save</button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="widget">
  <h4 className="widget-title">Những Chương Trình Tương Tự</h4>
  {programByType && programByType.length > 1 ? (
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
        .filter((program) => program.programId.toString() !== programById)
        .map((program, index) => (
<div key={index} className="col-lg-12 col-md-6" >
            <div className="single-course-inner">
              <div className="thumb">
                <img
                  src={publicUrl + "assets/img/course/programs.jpg"}
                  alt="img"
                />
              </div>
              <div className="details" >
                <div className="details-inner" style={{ height: '100px' }}>
                  <h5>
                    <Link
                      onClick={handleScrollToTop}
                      to={`/program-details/${program.programId}`}
                      style={{fontSize:'16px'}}
                    >
                      {program.nameProgram}
                    </Link>
                  </h5>
                </div>
                <div className="emt-course-meta">
                  <div className="row">
                    <div className="col-12">
                      <div className="rating">
                        <span>Lộ trình: {program.duration}</span>
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


<div className="mt-4">
  <h4 className="widget-title display-5">
    Những Trường Đại Học Có Mở Chương Trình Này
  </h4>
  <Slider
    dots={true}
    infinite={true}
    speed={500}
    slidesToShow={3} // Hiển thị 3 trường đại học trên mỗi slide
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={5000}
    nextArrow={<div className="slick-arrow slick-next" style={{color: 'black', width:'50px'}}>Next</div>}
    prevArrow={<div className="slick-arrow slick-prev" style={{color: 'black'}}>Previous</div>}
  >
    {UniversityDetails.map((university, index) => (
      <div key={index} className="col-lg-12 col-md-6">
        <div className="single-course-inner">
          <div className="thumb">
            <img
              src={publicUrl + "assets/img/course/programs.jpg"}
              alt="img"
            />
          </div>
          <div className="details">
            <div className="details-inner">
              <h5 className="h6" style={{height:'50px',marginBottom:'12px'}}>
                <Link to={`/program-details/${university.programId}`}>
                  {university.nameProgram}
                </Link>
              </h5>
              <div className="specialization-icon mb-2">
                <i className="fa fa-university mr-1"></i>
                <span className="fw-bold">Trường Đại Học Ohana</span>
              </div>
              <div className="specialization-icon">
                <i className="fa fa-map-marker mr-2" />
                <span className="fw-bold">Tiểu Bang: Ohana</span>
              </div>
              <div className="emt-course-meta">
                <div className="price text-right mt-3">
                  <Link
                    to="/instructor-details"
                    className="btn btn-primary"
                  >
                    Xem Thêm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
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
  height: "100%",
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
