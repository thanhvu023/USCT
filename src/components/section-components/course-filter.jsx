import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProgramByMajorId } from "../../redux/slice/programSlice";

const Program = ({ program }) => (
  <div className="col-lg-4 col-md-6">
    <div className="single-course-inner">
      <div className="thumb">
        <img src={program.img} alt="Program" />
      </div>
      <div className="details">
        <div className="details-inner">
          <div className="emt-user">
            <span className="u-thumb">
              <img src={program.university.img} alt="University" />
            </span>
            <span className="align-self-center">
              {program.university.universityName}
            </span>
          </div>
          <h6>
            <Link to={`/program-details/${program.programId}`}>
              {program.nameProgram}
            </Link>
          </h6>
        </div>
        <div className="emt-course-meta ">
          <div className="row d-flex justify-content-evenly">
            <div className="col-6">
              <i className="fa fa-university" />
              <span>{program.university.universityName}</span>
            </div>
            <div className="col-6">
              <div className="price text-right">
                <Link to={`/program-details/${program.programId}`}>
                  Xem thêm
                </Link>
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
          <div className="row">
            {programs.map((program) => (
              <Program key={program.programId} program={program} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
