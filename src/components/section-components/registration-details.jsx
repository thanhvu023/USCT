import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationByRegistrationFormId } from "../../redux/slice/registrationSlice";
import { getUserById } from "../../redux/slice/authSlice";
import jwtDecode from "jwt-decode";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import { Backdrop, CircularProgress } from "@mui/material";

const RegistrationDetail = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";

  const { registrationFormId } = useParams();
  const dispatch = useDispatch();
  const registration = useSelector(
    (state) => state.registration.registrationById
  );
  const loading = useSelector((state)=>state?.registration?.loading)
  const token = useSelector((state) => state.auth.token);
  const userId = jwtDecode(token).UserId;
  const userDetail = useSelector((state) => state.auth.userById) || {};
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId]);
  useEffect(() => {
    dispatch(getRegistrationByRegistrationFormId(registrationFormId));
  }, [dispatch, registrationFormId]);
  // useEffect(() => {
  //   if (registration.customerId) {
  //     dispatch(getUserById(registration.customerId));
  //   }
  // }, [dispatch, registration.customerId]);

  return (
    <div className="col-xl-8 mx-auto mt-5">
      <div className="card">
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="inner-content">
          <div className="card-body">
            <div className="profile-tab">
              <div className="custom-tab-1">
                <div className="profile-personal-info mt-3">
                  <h4 className="text-primary mb-4 text-center">Đơn tư vấn</h4>
                  <div className="col-lg-12">
                    <div
                      className="card overflow-hidden"
                      id="student-avatar-card"
                    >
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="text-center p-3 overlay-box">
                            <div className="profile-photo">
                              <img
                                src={publicUrl + "assets/img/author/pic2.jpg"}
                                alt="img"
                                className="bg-info rounded-circle mb-4"
                                style={{ width: "100px", height: "100px" }}
                              />
                            </div>
                            <h3 className="mt-3 mb-1 text-black">
                              {registration.fullName}
                            </h3>
                            <p className="text-black mb-0">
                              {userDetail.fullName}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-9 align-self-center">
                          <div className="row mb-2 align-items-center">
                            <div className="col-6">
                              <h5 className="f-w-500">
                                Email <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-6">
                              <span>{userDetail.email}</span>
                            </div>
                          </div>
                          {/* <div className="row mb-2 align-items-center">
                          <div className="col-5">
                              <h5 className="f-w-500">
                              Khu vực
                                <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-7">
                            <span>{registration.area}</span>
                            </div>
                          </div> */}

                          <div className="row mb-2 align-items-center">
                            <div className="col-6">
                              <h5 className="f-w-500">
                                Chương trình được chọn
                                <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-6">
                              <span>{registration.programChoose}</span>
                            </div>
                          </div>
                          <div className="row mb-2 align-items-center">
                            <div className="col-6">
                              <h5 className="f-w-500">
                                Chuyên ngành nguyện vọng
                                <span className="pull-right">:</span>
                              </h5>
                            </div>
                            <div className="col-6">
                              <span>{registration.majorChoose}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-about-me">
                  <div
                    className="pt-4 border-bottom-1 pb-3"
                    style={{ fontSize: "18px" }}
                  >
                    <h4 className="text-primary">Chi tiết</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="la la-money mr-2"></i>
                            <span className="font-weight-bold">
                              Tài chính:
                            </span>
                            {registration.budget
                              ? registration.budget + "$"
                              : "chưa có"}
                          </li>
                          <li className="mb-2">
                            <i className="la la-info mr-2"></i>
                            <span className="font-weight-bold">
                              Thông tin thêm:
                            </span>
                            {registration.moreInformation
                              ? registration.moreInformation
                              : "chưa có"}
                          </li>
                          <li className="mb-2">
                            <i className="la la-building mr-2"></i>
                            <span className="font-weight-bold">
                              Khu vực sinh sống:
                            </span>
                            {registration.area ? registration.area : "chưa có"}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="la la-paper-plane mr-2"></i>
                            <span className="font-weight-bold">
                              Ưu tiên du học:
                            </span>
                            {registration.priorityOfStudyAbroad
                              ? registration.priorityOfStudyAbroad
                              : "chưa có"}
                          </li>
                          <li className="mb-2">
                            <i className="la la-thumbs-o-up mr-2"></i>
                            <span className="font-weight-bold">
                              Lý do du học:
                            </span>
                            {registration.studyAbroadReason
                              ? registration.studyAbroadReason
                              : "chưa có"}
                          </li>
                          <li className="mb-2">
                            <i className="la la-university mr-2"></i>
                            <span className="font-weight-bold">
                              Lý do chọn trường đại học:
                            </span>
                            {registration.universityChooseReason
                              ? registration.universityChooseReason
                              : "chưa có"}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mb-3 ">
              <Link to="/students-profile" className="btn btn-secondary">
                Quay lại
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetail;
