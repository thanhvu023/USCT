import React, { Component, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { getUniversityById } from "../../redux/slice/universitySlice";

function InstructorDetails() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const dispatch = useDispatch();

  const universityId = useParams();
  const uniDetail = useSelector((state) => state.university.universityById);
  console.log(uniDetail)
  useEffect(() => {
    dispatch(getUniversityById(universityId));
  }, []);
  return (
    <div className="main-blog-area pd-top-120 pd-bottom-90">
      <div className="container">
        <div className="team-details-page">
          <div className="row">
            <div className="col-lg-5">
              <div className="thumb">
                <img src={publicUrl + "assets/img/team/6.png"} alt="img" />
              </div>
            </div>
            <div className="col-lg-7 align-self-center mt-5 mt-lg-0">
              <div className="details">
                <h3>{uniDetail.universityName}</h3>
                <span className="designation">National University</span>
                <span className="designation">Bang: California, Hoa Kỳ</span>
                <p className="mt-4">
                  {uniDetail.description}
                </p>
              </div>
            </div>
          </div>
          <div className="details-inner mt-4 pt-xl-3">
            <div className="widget widget_catagory">
              <h4 className="widget-title">Location</h4>
              <div className="widget-g-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.743238387186!2d106.7547486!3d10.8532152!3m2!1i1024!2i768!4f13.1!4m3!3e0!4m0!4m0!5e0!3m2!1svi!2s!4v1646447852855!5m2!1svi!2s" />
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="course-area pd-top-90">
          <h4 className="mb-4">Các Chuyên Ngành Chính</h4>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-course-inner">
                <div className="thumb">
                  <img src={publicUrl + "assets/img/course/1.png"} alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h6 className="go-top">Tên Chuyên Ngành 1</h6>
                  </div>
                  <div className="emt-course-meta">
                    <div className="price text-right">
                      Mã Chuyên Ngành: <span>MAJOR01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-course-inner">
                <div className="thumb">
                  <img src={publicUrl + "assets/img/course/2.png"} alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h6 className="go-top">Tên Chuyên Ngành 2</h6>
                  </div>
                  <div className="emt-course-meta">
                    <div className="price text-right">
                      Mã Chuyên Ngành: <span>MAJOR02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-course-inner">
                <div className="thumb">
                  <img src={publicUrl + "assets/img/course/3.png"} alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h6 className="go-top">Tên Chuyên Ngành 3</h6>
                  </div>
                  <div className="emt-course-meta">
                    <div className="price text-right">
                      Mã Chuyên Ngành: <span>MAJOR03</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDetails;
