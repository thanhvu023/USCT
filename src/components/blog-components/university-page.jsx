/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUniversity } from "../../redux/slice/universitySlice";
import { Backdrop, CircularProgress } from "@mui/material";
function UniversityPage() {
  const dispatch = useDispatch();
  const [universityName, setUniversityName] = useState("");
  const universities = useSelector((state) => state.university.universities);
  useEffect(() => {
    dispatch(getAllUniversity(universityName));
  }, [universityName]);
  const handleInputChangeName = (event) => {
    setUniversityName(event.target.value); // Update the program name state with the input value
  };

  const loading = useSelector((state) => state?.university?.loading);
  return (
    <div className="blog-area pd-top-120 pd-bottom-120 go-top">
      <div className="container">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="row">
          <div className="col-lg-12">
            <div className="td-sidebar">
              <div className="widget widget_search">
                <form className="search-form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Tên trường đại học"
                      onChange={handleInputChangeName}
                      value={universityName}
                    />
                  </div>
                  <button className="submit-btn" type="submit">
                    <i className="fa fa-search" />
                  </button>
                </form>
              </div>
              {/* <div className="widget widget_catagory">
                <h4 className="widget-title">Loại Trường</h4>
                <ul className="catagory-items go-top">
                  <li>
                    <Link to="/university-type">
                      Đại học Liberal Arts <i className="fa fa-caret-right" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/university-type">
                      Đại học Quốc gia
                      <i className="fa fa-caret-right" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/university-type">
                      Đại học miền <i className="fa fa-caret-right" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/university-type">
                      Cao đẳng cộng đồng
                      <i className="fa fa-caret-right" />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="widget widget_tags mb-0">
                <h4 className="widget-title">Tags</h4>
                <div className="tagcloud go-top">
                  <Link to="/tag">Du học Mỹ</Link>
                  <Link to="/tag">Visa</Link>
                  <Link to="/tag">Học bổng</Link>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-lg-12 ">
            <div className="row go-top">
              {universities.map((university, index) => (
                <div
                  key={index}
                  className="single-blog-inner style-border col-lg-5 m-4"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <div className="thumb">
                    <img
                      src={university.img}
                      alt="university 1"
                      style={{ width: "500px", height: "300px" }}
                    />
                  </div>
                  <div className="details">
                    <ul className="blog-meta">
                      <li>
                        <i className="fa fa-university" /> {university.slogan}
                      </li>
                      <li>
                        <i className="fa fa-map-marker" />{" "}
                        <a
                          href={university.website}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {university.website}
                        </a>
                      </li>
                    </ul>
                    <h3 className="title">
                      <Link
                        to={`/university-details/${university.universityId}`}
                      >
                        {university?.universityName}
                      </Link>
                    </h3>
                    <Link
                      className="read-more-text"
                      to={`/university-details/${university.universityId}`}
                    >
                      Thông tin về trường <i className="fa fa-angle-right" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* <nav className="td-page-navigation">
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
            </nav> */}
          </div>
          {/* <Sidebar /> */}
        </div>
      </div>
    </div>
  );
}

export default UniversityPage;
