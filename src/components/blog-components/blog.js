import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUniversity } from "../../redux/slice/universitySlice";
import Sidebar from "./sidebar";
function Blog() {
  const dispatch = useDispatch();
  const universities = useSelector((state) => state.university.universities);
  console.log(universities);
  useEffect(() => {
    dispatch(getAllUniversity());
  }, []);
  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="blog-area pd-top-120 pd-bottom-120 go-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Giả sử mỗi đoạn sau đây là một trường đại học cụ thể */}
            {universities.map((university, index) => (
              <div className="single-blog-inner style-border">
                <div className="thumb">
                  <img
                    src={publicUrl + "assets/img/blog/4.png"}
                    alt="university 1"
                  />
                </div>
                <div className="details">
                  <ul className="blog-meta">
                    <li>
                      <i className="fa fa-university" /> Research University
                    </li>
                    <li>
                      <i className="fa fa-map-marker" /> California, Hoa Kỳ
                    </li>
                  </ul>
                  <h3 className="title">
                    <Link to="/instructor-details">
                      {university.universityName}
                    </Link>
                  </h3>
                  <p>
                  {university.description}
                  </p>
                  <Link className="read-more-text" to="/instructor-details">
                    XEM THÊM <i className="fa fa-angle-right" />
                  </Link>
                </div>
              </div>
            ))}
            {/* <div className="single-blog-inner style-border">
              <div className="thumb">
                <img src={publicUrl + "assets/img/blog/4.png"} alt="img" />
              </div>
              <div className="details">
                <ul className="blog-meta">
                  <li>
                    <i className="fa fa-university" /> National University
                  </li>
                  <li>
                    <i className="fa fa-map-marker" /> California, Hoa Kỳ
                  </li>
                </ul>
                <h3 className="title">
                  <Link to="/instructor-details">
                    Trường Đại Học A với các chương trình học tập tiên tiến
                  </Link>
                </h3>
                <p>
                  Trường Đại Học A nổi tiếng với nền giáo dục chất lượng và cơ
                  sở vật chất hiện đại, tạo điều kiện tốt nhất cho sinh viên.
                </p>
                <Link className="read-more-text" to="/instructor-details">
                  XEM THÊM <i className="fa fa-angle-right" />
                </Link>
              </div>
            </div> */}

            {/* <div className="single-blog-inner style-border">
              <div className="thumb">
                <img
                  src={publicUrl + "assets/img/blog/4.png"}
                  alt="Princeton University"
                />
              </div>
              <div className="details">
                <ul className="blog-meta">
                  <li>
                    <i className="fa fa-university" /> Regional College
                  </li>
                  <li>
                    <i className="fa fa-map-marker" /> Princeton, New Jersey,
                    USA
                  </li>
                </ul>
                <h3 className="title">
                  <Link to="/instructor-details">Trường đại học Princeton</Link>
                </h3>
                <p>
                  Đại học Princeton là một cộng đồng học thuật và học tập sôi
                  động phục vụ đất nước và nhân loại.
                </p>
                <Link className="read-more-text" to="/instructor-details">
                  READ MORE <i className="fa fa-angle-right" />
                </Link>
              </div>
            </div> */}
            <nav className="td-page-navigation">
              <ul className="pagination">
                <li className="pagination-arrow">
                  <Link to="#">
                    <i className="fa fa-angle-double-left" />
                  </Link>
                </li>
                <li>
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link className="active" to="#">
                    2
                  </Link>
                </li>
                <li>
                  <Link to="#">...</Link>
                </li>
                <li>
                  <Link to="#">3</Link>
                </li>
                <li className="pagination-arrow">
                  <Link to="#">
                    <i className="fa fa-angle-double-right" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Blog;
