import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  // getAllProgram,
  getProgramById,
  getProgramByProgramType,
  // getProgramByUniId,
} from "../../redux/slice/programSlice";
import { useParams } from "react-router-dom";
import { getUniversityById } from "../../redux/slice/universitySlice";
import { getStateById } from "../../redux/slice/stateSlice";
import { getSemesterById } from "../../redux/slice/semesterSlice";
import { getMajorById } from "../../redux/slice/majorSlice";

function CourseDetails() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { programById } = useParams();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const programTypeId = useSelector(
    (state) => state.program?.programById?.programTypeId
  );
  const universityId = useSelector(
    (state) => state.program.programById.universityId
  );
  const stateId = useSelector(
    (state) => state.university.universityById?.stateId
  );
  const semesterId = useSelector(
    (state) => state.program.programById.semesterId
  );
  const universityIdDeatil = useSelector(
    (state) => state.university.universityById
  );
  const majorId = useSelector((state) => state.program.programById.majorId);
  const programByType = useSelector(
    (state) => state.program?.programsByProgramType
  );
  const UniversityDetails = useSelector(
    (state) => state.program?.programsByUniId
  );
  const programDetail = useSelector((state) => state.program.programById);

  const stateDetail = useSelector((state) => state.state.stateById);
  const majorDetail = useSelector((state) => state.major.majorById);
  // console.log("programDetail:", programDetail);
  // console.log("universityId:", universityId);
  // console.log("universityIdDetail:", universityIdDetail);

  useEffect(() => {
    // console.log("Running useEffect...");
    dispatch(getProgramById(programById));
    dispatch(getProgramByProgramType(programTypeId));
    dispatch(getUniversityById(universityId));
    dispatch(getStateById(stateId));
    dispatch(getSemesterById(semesterId));
    dispatch(getMajorById(majorId));
  }, [
    dispatch,
    programById,
    programTypeId,
    universityId,
    stateId,
    semesterId,
    majorId,
  ]);
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
                        <div className="col-sm-6">
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
                        </div>
                        <div className="col-sm-6 mt-3 mt-sm-0">
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
                            {/* <li className="single-list-inner style-check-box">
              <i className="fa fa-check" /> Fringilla nulla
            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <h4 className="title">Chương trình giảng dạy</h4>
                  <p>
                    The quick, brown fox jumps over a lazy dog. DJs flock by
                    when MTV ax quiz prog. Junk MTV quiz graced by fox whelps.
                    Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for
                    quick jigs vex! Fox nymphs grab
                  </p>
                  <div className="col-lg-6">
                    <div className="course-details-content">
                      <div id="accordion" className="accordion-area mt-4">
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-one">
                            <h5 className="mb-0">01. Kinh nghiệm văn hóa</h5>
                          </div>
                          <div className="card-body">
                            Thực tập ở nước ngoài mang lại cơ hội tiếp xúc với
                            văn hóa mới, từ cách làm việc đến phong cách sống.
                            Điều này giúp bạn mở rộng kiến thức và hiểu biết về
                            thế giới.
                          </div>
                        </div>
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-two">
                            <h5 className="mb-0">02. Mang lưới quốc tế</h5>
                          </div>
                          <div className="card-body">
                            Thực tập ở nước ngoài cung cấp cơ hội để xây dựng
                            mạng lưới quốc tế. Bạn có thể gặp gỡ và làm việc
                            cùng các đồng nghiệp từ nhiều quốc gia khác nhau,
                            tạo ra cơ hội hợp tác trong tương lai.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="course-details-content">
                      <div id="accordion" className="accordion-area mt-4">
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-three">
                            <h5 className="mb-0">
                              03. Phát triển kỹ năng ngôn ngữ
                            </h5>
                          </div>
                          <div className="card-body">
                            Sống và làm việc trong một môi trường nói tiếng nước
                            ngoài giúp bạn cải thiện kỹ năng ngôn ngữ của mình.
                            Điều này có thể là một phần quan trọng trong việc
                            phát triển sự nghiệp của bạn trong thị trường lao
                            động toàn cầu.
                          </div>
                        </div>
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-four">
                            <h5 className="mb-0">04. Kiến thức chuyên môn</h5>
                          </div>
                          <div className="card-body">
                            Thực tập ở nước ngoài cung cấp cơ hội học hỏi về
                            phong cách làm việc và phương pháp chuyên môn mới.
                            Bạn có thể tiếp cận với công nghệ, quy trình và dự
                            án mà bạn không thể trải nghiệm được ở quê nhà.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="course-details-content">
                      <h4 className="title">Câu hỏi thường gặp</h4>
                      <p>Cái gì là văn bản giả dối đơn giản của bạn?</p>
                      <div id="accordion-1" className="accordion-area mt-4">
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-five">
                            <h5 className="mb-0">
                              01. Điều gì làm bạn đơn giản là giả mạo?
                            </h5>
                          </div>
                          <div className="card-body">
                            Văn bản giả mạo của bạn có sẵn miễn phí trên thị
                            trường in ấn đã là văn bản giả mạo tiêu chuẩn của
                            ngành công nghiệp từng bao giờ.
                          </div>
                        </div>
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-six">
                            <h5 className="mb-0">
                              02. Đồ họa giả dối của thiết kế miễn phí là gì?
                            </h5>
                          </div>
                          <div className="card-body">
                            Văn bản giả mạo về đồ họa đơn giản miễn phí có sẵn
                            trên thị trường in ấn đã là văn bản giả mạo tiêu
                            chuẩn của ngành công nghiệp từng bao giờ.
                          </div>
                        </div>
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-seven">
                            <h5 className="mb-0">
                              03. Tại sao chúng tôi là tốt nhất?
                            </h5>
                          </div>
                          <div className="card-body">
                            Tại sao chúng tôi có văn bản giả mạo miễn phí có sẵn
                            trên thị trường in ấn đã là văn bản giả mạo tiêu
                            chuẩn của ngành công nghiệp từng bao giờ.
                          </div>
                        </div>
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-eight">
                            <h5 className="mb-0">
                              04. Các ngành công nghiệp giả dối được bao gồm?
                            </h5>
                          </div>
                          <div className="card-body">
                            Các văn bản giả mạo của bạn có sẵn miễn phí trên thị
                            trường in ấn đã là văn bản giả mạo tiêu chuẩn của
                            ngành công nghiệp từng bao giờ.
                          </div>
                        </div>
                      </div>
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
                    <li>
                      <i className="fa fa-university" />
                      <span>Trường Đại học:</span>{" "}
                      {universityIdDetail?.universityName}
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

                        <h2>
                          Bạn đang đăng ký vào chương trình [{programDetail.nameProgram}] <br/>
                          tại {universityIdDetail?.universityName}
                        </h2>
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
                            CV của tôi:
                          </label>
                          <input
                            type="file"
                            id="cvFile"
                            className="form-control"
                            // Handle file upload logic here
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
                          />{" "}
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
                            onClick={handleCloseModal}
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
                            src={publicUrl + "assets/img/course/1.png"}
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
                        src={publicUrl + "assets/img/course/1.png"}
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
export default CourseDetails;
