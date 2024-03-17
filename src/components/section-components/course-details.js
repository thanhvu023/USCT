import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProgram,
  getProgramById,
  getProgramByUniId,
} from "../../redux/slice/programSlice";
import { useParams } from "react-router-dom";

function CourseDetails() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const dispatch = useDispatch();
  const { programById } = useParams();
  const programDetail = useSelector((state) => state.program.programById);
  const programs = useSelector((state) => state.program.programs);
  const uniId = useSelector((state) => state.program.programById?.universityId);
  const UniversityDetails = useSelector(
    (state) => state.program.programsByUniId
  );
  useEffect(() => {
    dispatch(getProgramById(programById));
    dispatch(getAllProgram());
  }, [programById]);
  useEffect(() => {
    if (uniId) {
      dispatch(getProgramByUniId({ uniId }));
    }
  }, [uniId]);
  const CourseCard = ({
    publicUrl,
    imgSrc,
    authorImgSrc,
    authorName,
    courseTitle,
    rating,
    ratingCount,
    price,
  }) => (
    <div className="single-course-inner">
      <div className="thumb">
        <img src={publicUrl + imgSrc} alt="Course Thumbnail" />
      </div>
      <div className="details">
        <div className="details-inner">
          <div className="emt-user">
            <span className="u-thumb">
              <img src={publicUrl + authorImgSrc} alt="Author Thumbnail" />
            </span>
            <span className="align-self-center">{authorName}</span>
          </div>
          <h6>
            <Link to="/course-details">{courseTitle}</Link>
          </h6>
        </div>
        <div className="emt-course-meta">
          <div className="row">
            <div className="col-6">
              <div className="rating">
                <i className="fa fa-star" /> {rating}
                <span>({ratingCount})</span>
              </div>
            </div>
            <div className="col-6">
              <div className="price text-right">
                Price: <span>${price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
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
                <h3 className="title">
                  <h3 href="course-details.html">
                    {programDetail.nameProgram}
                  </h3>
                </h3>
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
      <p>Sau đây là những lợi ích lớn lao từ việc thực tập ở nước ngoài:</p>
      <div className="row pt-4">
        <div className="col-sm-6">
          <ul className="single-list-wrap">
            <li className="single-list-inner style-check-box">
              <i className="fa fa-check" /> Làm đẹp thêm CV trong mắt nhà tuyển dụng tương lai
            </li>
            <li className="single-list-inner style-check-box">
              <i className="fa fa-check" /> Mở rộng mạng lưới bạn bè trên toàn thế giới
            </li>
            <li className="single-list-inner style-check-box">
              <i className="fa fa-check" /> Học thêm ngôn ngữ mới
            </li>
          </ul>
        </div>
        <div className="col-sm-6 mt-3 mt-sm-0">
          <ul className="single-list-wrap">
            <li className="single-list-inner style-check-box">
              <i className="fa fa-check" /> Có kinh nghiệm làm việc trong môi trường chuyên nghiệp ở quốc gia khác, hiểu biết rộng về văn hóa, tác phong làm việc chuyên nghiệp, khả năng thích nghi cao, nâng cao nghiệp vụ
            </li>
            <li className="single-list-inner style-check-box">
              <i className="fa fa-check" /> Thực tập kết hợp với du lịch giá rẻ, khám phá thế giới diệu kỳ
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
        The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab
      </p>
  <div className="col-lg-6">
    <div className="course-details-content">
    
      <div id="accordion" className="accordion-area mt-4">
        <div className="card single-faq-inner style-no-border">
          <div className="card-header" id="ff-one">
            <h5 className="mb-0">
              01. Kinh nghiệm văn hóa
            </h5>
          </div>
          <div className="card-body">
            Thực tập ở nước ngoài mang lại cơ hội tiếp xúc với văn hóa mới, từ cách làm việc đến phong cách sống. Điều này giúp bạn mở rộng kiến thức và hiểu biết về thế giới.
          </div>
        </div>
        <div className="card single-faq-inner style-no-border">
          <div className="card-header" id="ff-two">
            <h5 className="mb-0">
              02. Mang lưới quốc tế
            </h5>
          </div>
          <div className="card-body">
            Thực tập ở nước ngoài cung cấp cơ hội để xây dựng mạng lưới quốc tế. Bạn có thể gặp gỡ và làm việc cùng các đồng nghiệp từ nhiều quốc gia khác nhau, tạo ra cơ hội hợp tác trong tương lai.
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
            Sống và làm việc trong một môi trường nói tiếng nước ngoài giúp bạn cải thiện kỹ năng ngôn ngữ của mình. Điều này có thể là một phần quan trọng trong việc phát triển sự nghiệp của bạn trong thị trường lao động toàn cầu.
          </div>
        </div>
        <div className="card single-faq-inner style-no-border">
          <div className="card-header" id="ff-four">
            <h5 className="mb-0">
              04. Kiến thức chuyên môn
            </h5>
          </div>
          <div className="card-body">
            Thực tập ở nước ngoài cung cấp cơ hội học hỏi về phong cách làm việc và phương pháp chuyên môn mới. Bạn có thể tiếp cận với công nghệ, quy trình và dự án mà bạn không thể trải nghiệm được ở quê nhà.
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
            Văn bản giả mạo của bạn có sẵn miễn phí trên thị trường in ấn đã là văn bản giả mạo tiêu chuẩn của ngành công nghiệp từng bao giờ.
          </div>
        </div>
        <div className="card single-faq-inner style-header-bg">
          <div className="card-header" id="ff-six">
            <h5 className="mb-0">
              02. Đồ họa giả dối của thiết kế miễn phí là gì?
            </h5>
          </div>
          <div className="card-body">
            Văn bản giả mạo về đồ họa đơn giản miễn phí có sẵn trên thị trường in ấn đã là văn bản giả mạo tiêu chuẩn của ngành công nghiệp từng bao giờ.
          </div>
        </div>
        <div className="card single-faq-inner style-header-bg">
          <div className="card-header" id="ff-seven">
            <h5 className="mb-0">
              03. Tại sao chúng tôi là tốt nhất?
            </h5>
          </div>
          <div className="card-body">
            Tại sao chúng tôi có văn bản giả mạo miễn phí có sẵn trên thị trường in ấn đã là văn bản giả mạo tiêu chuẩn của ngành công nghiệp từng bao giờ.
          </div>
        </div>
        <div className="card single-faq-inner style-header-bg">
          <div className="card-header" id="ff-eight">
            <h5 className="mb-0">
              04. Các ngành công nghiệp giả dối được bao gồm?
            </h5>
          </div>
          <div className="card-body">
            Các văn bản giả mạo của bạn có sẵn miễn phí trên thị trường in ấn đã là văn bản giả mạo tiêu chuẩn của ngành công nghiệp từng bao giờ.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col-lg-12">
    <div className="course-details-content">
      <h4 className="title">Đánh giá</h4>
      <div className="ratings-list-inner mb-4">
        <div className="row">
          <div className="col-md-4 align-self-center text-center">
            <div className="total-avarage-rating">
              <h2>5.0</h2>
              <div className="rating-inner">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <p>Rated 5 out of 3 Ratings</p>
            </div>
          </div>
          <div className="col-md-8">
            <ul>
              <li>
                <a href="#">
                  <span className="counter-label">
                    <i className="fa fa-star" />5
                  </span>
                  <span className="progress-bar-inner">
                    <span className="progress">
                      <span
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "100%" }}
                      />
                    </span>
                  </span>
                  <span className="counter-count">100%</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="counter-label">
                    <i className="fa fa-star" />4
                  </span>
                  <span className="progress-bar-inner">
                    <span className="progress">
                      <span
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "0%" }}
                      />
                    </span>
                  </span>
                  <span className="counter-count">0%</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="counter-label">
                    <i className="fa fa-star" />3
                  </span>
                  <span className="progress-bar-inner">
                    <span className="progress">
                      <span
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "0%" }}
                      />
                    </span>
                  </span>
                  <span className="counter-count">0%</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="counter-label">
                    <i className="fa fa-star" />2
                  </span>
                  <span className="progress-bar-inner">
                    <span className="progress">
                      <span
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "0%" }}
                      />
                    </span>
                  </span>
                  <span className="counter-count">0%</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="counter-label">
                    <i className="fa fa-star" />1
                  </span>
                  <span className="progress-bar-inner">
                    <span className="progress">
                      <span
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "0%" }}
                      />
                    </span>
                  </span>
                  <span className="counter-count">0%</span>
                </a>
              </li>
            </ul>
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
                    <span>Trường Đại học:</span> Đại học XYZ
                  </li>
                  <li>
                    <i className="fa fa-map-marker" />
                    <span>Tiểu Bang:</span> Bang ABC
                  </li>
                  <li>
                    <i className="fa fa-laptop" />
                    <span>Chuyên ngành chính:</span> Công nghệ Thông tin
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
                  <a className="btn btn-base btn-radius" to="/course-details">
                    ĐĂNG KÝ KHÓA HỌC
                  </a>
                </div>
              </div>
              <div className="widget widget_catagory">
  <div>
    <h4 className="widget-title ml-5">Những Chương Trình Tương Tự</h4>
    <div className="col-lg-12 pd-top-100">
      {programs
        .filter((program) => program.programId.toString() !== programById)
        .map((program, index) => (
          <div key={index} className="single-course-inner">
            <div className="thumb">
              <img
                src={publicUrl + "assets/img/course/1.png"}
                alt="img"
              />
            </div>
            <div className="details">
              <div className="details-inner">
                <h5>
                  <Link to={`/program-details/${program.programId}`}>
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
        ))}
    </div>
  </div>
</div>

            </div>
          </div>
        </div>

     

        <div>
          <h4 className="widget-title display-5">
            Những Trường Đại Học Có Mở Chương Trình Này
          </h4>
          <div className="row justify-content-center pd-top-100">
            {UniversityDetails.map((university, index) => (
              <div className="col-lg-4 col-md-6">
                <div className="single-course-inner">
                  <div class="thumb">
                    <img
                      src={publicUrl + "assets/img/course/1.png"}
                      alt="img"
                    />
                  </div>
                  <div class="details">
                    <div class="details-inner">
                      <h5 className="h6">
                        <Link to="/instructor-details">
                          {university.nameProgram}
                        </Link>
                      </h5>
                      <div class="specialization-icon mb-2">
                        <i class="fa fa-univers ity mr-1"></i>
                        <span className="fw-bold">Trường Đại Học Ohana</span>
                      </div>
                      <div class="specialization-icon">
                        <i className="fa fa-map-marker mr-2" />

                        <span className="fw-bold">Tiểu Bang: Ohana</span>
                      </div>
                      <div class="emt-course-meta">
                        <div class="price text-right mt-3">
                          <Link
                            to="/instructor-details"
                            class="btn btn-primary"
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
  );
}

export default CourseDetails;
