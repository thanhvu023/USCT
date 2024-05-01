import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getUniversityById,
  getUniversityTypeById,
} from "../../redux/slice/universitySlice";
import { getStateById } from "../../redux/slice/stateSlice";
import { getProgramByUniId } from "../../redux/slice/programSlice";
import Slider from "react-slick";

import { Backdrop, CircularProgress } from "@mui/material";

function UniversityDetailPage() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const loading = useSelector((state) => state?.university?.loading);

  const dispatch = useDispatch();

  const uniId = useParams();
  const { universityId } = uniId;
  const uniDetail = useSelector((state) => state?.university?.universityById);
  const { stateId } = uniDetail;
  const universityTypeId = uniDetail.universityTypeId;
  const stateDetail = useSelector((state) => state?.state?.stateById);
  const universityTypeDetail = useSelector(
    (state) => state?.university?.universityType
  );
  const programByUniId = useSelector(
    (state) => state?.program?.programsByUniId
  );
  useEffect(() => {
    if (universityId) {
      dispatch(getUniversityById(universityId));
    }
  }, [universityId]);
  useEffect(() => {
    if (universityTypeId) {
      dispatch(getUniversityTypeById(universityTypeId));
    }
  }, [universityTypeId]);
  useEffect(() => {
    dispatch(getProgramByUniId(universityId));
  }, [universityId]);
  useEffect(() => {
    if (stateId) {
      dispatch(getStateById(stateId));
    }
  }, [stateId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="main-blog-area pd-top-120 pd-bottom-90">
      <div className="container">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="team-details-page">
          <div className="row">
            <div className="col-lg-3">
              <div className="thumb">
                <img src={uniDetail.img} alt="img" />
              </div>
            </div>
            <div className="col-lg-9 align-self-center mt-5 mt-lg-0">
              <div className="details">
                <h3>{uniDetail.universityName}</h3>
                <span className="designation">
                  {universityTypeDetail.typeName}
                </span>
                <span className="designation">Slogan: {uniDetail.slogan}</span>
                <span className="designation">
                  Bang: {stateDetail.stateName}
                </span>
                <p>{uniDetail.description}</p>
                {/* <p> Email liên hệ: {uniDetail.email}</p> */}
              </div>
            </div>
          </div>
          {/* <div className="details-inner mt-4 pt-xl-3">
            <div className="widget widget_catagory">
              <h4 className="widget-title">Location</h4>
              <div className="widget-g-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.743238387186!2d106.7547486!3d10.8532152!3m2!1i1024!2i768!4f13.1!4m3!3e0!4m0!4m0!5e0!3m2!1svi!2s!4v1646447852855!5m2!1svi!2s" />
              </div>
            </div>
          </div> */}
        </div>
        <div className="course-area pd-top-90">
          <h4 className="mb-4">Những chương trình liên quan đến trường</h4>
          {programByUniId.length > 0 ? (
            <Slider {...settings}>
              {programByUniId.map((program, index) => (
                <div key={index} className="col-lg-12 col-md-6">
                  <div className="single-course-inner">
                    <div className="thumb">
                      <img src={program.img} alt="img" />
                    </div>
                    <div className="details">
                      <div className="details-inner">
                        <h6 className="go-top">
                          <Link to={`/program-details/${program.programId}`}>
                            {program.nameProgram}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>Hiện không có chương trình liên quan đến trường.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UniversityDetailPage;
