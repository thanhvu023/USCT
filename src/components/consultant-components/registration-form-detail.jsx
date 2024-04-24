import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegistrationByRegistrationFormId,
  updateRegistrationById,
} from "../../redux/slice/registrationSlice";
import { getUserById } from "../../redux/slice/authSlice";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import Select from "react-select";
const RegistrationFormDetail = () => {
  const { registrationFormId } = useParams();
  const dispatch = useDispatch();
  const registration = useSelector(
    (state) => state?.registration?.registrationById
  );
  const userId = useSelector(
    (state) => state?.registration?.registrationById?.customerId
  );
  const userDetail = useSelector((state) => state.auth.userById) || {};
  const consultantId = useSelector(
    (state) => state?.consultant?.consultantById?.consultantId
  );
  const [status, setStatus] = useState(registration.status);
  const statusOptions = [
    { value: 0, label: "Chưa tư vấn" },
    { value: 1, label: "Đang tư vấn" },
    { value: 2, label: "Đã tư vấn" },
  ];
  const matchValue = useMemo(
    () => statusOptions.find((option) => option.value === status),
    [status]
  );
  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);
  useEffect(() => {
    if (registrationFormId) {
      dispatch(getRegistrationByRegistrationFormId(registrationFormId));
    }
  }, [dispatch, registrationFormId]);
  useEffect(() => {
    setStatus(registration.status);
  }, [registration.status]);
  const handleChangeStatus = (e) => {
    setStatus(e.value);
  };
  const handleSubmitChangeStatus = () => {
    dispatch(
      updateRegistrationById({ status, consultantId, registrationFormId })
    );
  };

  return (
    <div className="col-xl-8 mx-auto mt-5">
      <div className="card">
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
                                src={userDetail.img}
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
                                Email: <span className="pull-right">:</span>
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
                            <span className="font-weight-bold">Tài chính:</span>
                            {registration.budget
                              ? registration.budget
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
                            <i className="la la-info mr-2"></i>
                            <span className="font-weight-bold">
                              Thông tin thêm:
                            </span>
                            {registration.moreInformation
                              ? registration.moreInformation
                              : "chưa có"}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-left">
                <Link to="/consultant" className="btn btn-secondary">
                  Quay lại
                </Link>
              </div>
              <div className="col-md-6 text-right">
                <div className="d-inline-block mr-2">
                  <Select
                    placeholder="Trạng thái"
                    name="status"
                    options={statusOptions}
                    onChange={handleChangeStatus}
                    value={matchValue ? matchValue : 0}
                  />
                </div>
                <button
                  onClick={handleSubmitChangeStatus}
                  className="btn btn-secondary"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormDetail;
