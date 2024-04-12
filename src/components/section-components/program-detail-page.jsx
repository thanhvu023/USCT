import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import {
  createProgramApplication,
  // getAllProgram,
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
import { getStudentProfileByCustomerId } from "../../redux/slice/studentSice";

function ProgramDetailPage() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { programById } = useParams();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      studentProfileId: "",
      programById: "",
    });
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
  const programDetail = useSelector((state) => state?.program?.programById);
  const stateDetail = useSelector((state) => state?.state?.stateById);
  const majorDetail = useSelector((state) => state?.major?.majorById);
  const customerId = useSelector((state) => state?.auth?.userById.customerId);
  const profileStudent = useSelector(
    (state) => state?.student?.studentProfileByCustomerId
  );
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
  const [formData, setFormData] = useState({
    studentProfileId: "",
    programById,
  });
  const handleSelectChange = (selectedOption) => {
    // Update the formData state with the selected option
    setFormData({
      ...formData,
      studentProfileId: selectedOption.value,
    });
  };
  const handleSubmitProgramApplication = () => {
    if (formData.studentProfileId) {
      dispatch(createProgramApplication(formData));
    }
  };
  console.log(formData);
  return (
    <>
      <div className="course-single-area pd-top-120 pd-bottom-90">
        <div className="container">
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
                      <span>Lộ trình học:</span> 8 buổi học
                    </li>
                    <li>
                      <i className="fa fa-language" />
                      <span>Trình độ Tiếng Anh:</span> Cần có trình độ Tiếng Anh
                      cơ bản
                    </li>
                    <li>
                      <i className="fa fa-calendar" />
                      <span>Học kỳ:</span> Spring 2024
                    </li>
                    <li>
                      <i className="fa fa-graduation-cap" />
                      <span>Loại chương trình:</span> Full-time
                    </li>
                  </ul>
                  <div className="price-wrap text-center">
                    <h5>
                      Giá:<span>$54.00</span>
                    </h5>

                    <a
                      className="btn btn-base btn-radius"
                      onClick={handleOpenModal}
                    >
                      ĐĂNG KÝ KHÓA HỌC
                    </a>
                  </div>
                </div>
                {/* Modal */}
                {showModal && (
                  <div>
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
                            Họ và tên:
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            className="form-control"
                            value="Your Name"
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="countryId"
                            style={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            Id Quốc gia:
                          </label>
                          <input
                            type="text"
                            id="countryId"
                            className="form-control"
                            value="Your Country ID"
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="cvFile"
                            style={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            Hồ sơ học sinh:
                          </label>
                          <Select
                            options={profileStudent.map((profile) => ({
                              value: profile.studentProfileId,
                              label: profile.fullName,
                            }))}
                            placeholder="Chọn hồ sơ học sinh"
                            onChange={handleSelectChange}
                            // Other props like placeholder, onChange, etc. can be added here
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="editor"
                            style={{ fontWeight: "bold", fontSize: "16px" }}
                          >
                            Thư xin việc cho liên kết portfolio :
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            // onReady={ editor => {

                            // } }
                            // onChange={ ( event, editor ) => {
                            //     // const data = editor.getData();
                            // } }
                            // onBlur={ ( event, editor ) => {

                            // } }
                            // onFocus={ ( event, editor ) => {

                            // } }
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={handleSubmitProgramApplication}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="widget">
            <h4 className="widget-title">Những Chương Trình Tương Tự</h4>
            {programByType && programByType.length > 1 ? (
              <div
                className={
                  "row justify-content-center" +
                  (programByType.length > 1 ? "" : " pd-top-100")
                }
              >
                {programByType
                  .filter(
                    (program) => program.programId.toString() !== programById
                  )
                  .map((program, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="single-course-inner">
                        <div className="thumb">
                          <img
                            src={publicUrl + "assets/img/course/programs.jpg"}
                            alt="img"
                          />
                        </div>
                        <div className="details">
                          <div className="details-inner">
                            <h5>
                              <Link
                                to={`/program-details/${program.programId}`}
                              >
                                {program.nameProgram}
                              </Link>
                            </h5>
                          </div>
                          <div className="emt-course-meta">
                            <div className="row">
                              <div className="col-6">
                                <div className="rating">
                                  <span>Lộ trình: {program.duration}</span>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="price text-right">
                                  Học phí: <span>{program.tuition}$</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center p-4">
                <h4>Không có chương trình tương tự</h4>
              </div>
            )}
          </div>

          <div>
            <h4 className="widget-title display-5">
              Những Trường Đại Học Có Mở Chương Trình Này
            </h4>
            <div className="row justify-content-center pd-top-100">
              {UniversityDetails.map((university, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="single-course-inner">
                    <div className="thumb">
                      <img
                        src={publicUrl + "assets/img/course/programs.jpg"}
                        alt="img"
                      />
                    </div>
                    <div className="details">
                      <div className="details-inner">
                        <h5 className="h6">
                          <Link to={`/program-details/${university.programId}`}>
                            {university.nameProgram}
                          </Link>
                        </h5>
                        <div className="specialization-icon mb-2">
                          <i className="fa fa-univers ity mr-1"></i>
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
            </div>
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
export default ProgramDetailPage;