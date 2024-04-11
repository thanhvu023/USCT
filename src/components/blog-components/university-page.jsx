import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUniversity } from "../../redux/slice/universitySlice";
import Sidebar from "./sidebar";
function UniversityPage() {
  const dispatch = useDispatch();
  const universities = useSelector((state) => state.university.universities);
  useEffect(() => {
    dispatch(getAllUniversity());
  }, []);

  return (
    <div className="blog-area pd-top-120 pd-bottom-120 go-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Giả sử mỗi đoạn sau đây là một trường đại học cụ thể */}
            {universities.map((university, index) => (
              <div key={index} className="single-blog-inner style-border">
                <div className="thumb">
                  <img
                    src={university.img}
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
                    <Link to={`/university-details/${university.universityId}`}>
                      {university?.universityName}
                    </Link>
                  </h3>
                  <p>{university.description}</p>
                  <Link className="read-more-text" to={`/university-details/${university.universityId}`}>
                    XEM THÊM <i className="fa fa-angle-right" />
                  </Link>
                </div>
              </div>
            ))}
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

export default UniversityPage;
