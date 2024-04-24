import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProgramByMajorId } from "../../redux/slice/programSlice";

const Course = ({ course }) => (
  <div className="col-lg-4 col-md-6">
    <div className="single-course-inner">
      <div className="thumb">
        <img src={course.image} alt="img" />
      </div>
      <div className="details">
        <div className="details-inner">
          <div className="emt-user">
            <span className="u-thumb">
              <img src={course.authorImage} alt="img" />
            </span>
            <span className="align-self-center">{course.authorName}</span>
          </div>
          <h6>
            <Link to={`/course-details/${course.id}`}>{course.title}</Link>
          </h6>
        </div>
        <div className="emt-course-meta ">
          <div className="row  d-flex justify-content-evenly">
            <div className="col-6">
              <i className="fa fa-university" />
              <span>{course.state}</span>
            </div>
            <div className="col-6">
              <div className="price text-right">
                <Link to={`/course-details/${course.id}`}>Xem thêm</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CourseFilter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgramByMajorId(1));
  }, []);
  const programs = useSelector((state) => {
    // Filter programs by majorId and get the first 6 items
    return state?.program?.programsByMajor
      .filter((program) => program.majorId === 1)
      .slice(0, 6);
  });

  return (
    <div className="course-area pd-top-100 pd-bottom-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-11">
            <div className="section-title style-white text-center">
              <h2 className="title">Các Chương Trình Nổi Bật</h2>
              <p>
                Khám phá các chương trình đặc sắc giúp bạn mở rộng cánh cửa học
                thuật tại Mỹ.
              </p>
            </div>
          </div>
        </div>
        <div className="edmt-nav-tab style-white text-center">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {programs.map((program) => (
              <li key={program.programId} className="nav-item">
                {program.nameProgram}
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content go-top" id="myTabContent">
          {/* {programs.map((program) => (
            <div
              key={program.programId}
              className="tab-pane fade show active"
              id={`tab-content-${program.programId}`}
              role="tabpanel"
              aria-labelledby={`tab-${program.programId}`}
            >
             
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
