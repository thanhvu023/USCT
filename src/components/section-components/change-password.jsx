import React, { Fragment, useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";

import PageTitle from "./PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserById } from "../../redux/slice/authSlice";
import jwtDecode from "jwt-decode";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {

  const token = useSelector((state) => state?.auth?.token);
  const userId = jwtDecode(token).UserId;
  const userDetail = useSelector((state) => state?.auth?.userById);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");

  const [errors, setErrors] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  let publicUrl = process.env.PUBLIC_URL + "/";

  //   const handleUpload = async (selectedFile) => {
  //     const imgRef = ref(imageDb, `files/${selectedFile.name}`);
  //     try {
  //       await uploadBytes(imgRef, selectedFile);
  //       const imageUrl = await getDownloadURL(imgRef);
  //       console.log(imageUrl);
  //       setImageSrc(imageUrl); // Set the state variable with the uploaded image URL.
  //       console.log(`Đã tải lên: ${selectedFile.name}`);
  //     } catch (error) {
  //       console.error(`Lỗi khi tải lên ${selectedFile.name}:`, error);
  //     }
  //   };
  const validateForm = () => {
    const newErrors = {};
    if (oldPassword.trim() === "") {
      newErrors.password = "Mật khẩu không hợp lệ!";
    }
    if (newPassword.trim() === "") {
      newErrors.password = "Mật khẩu không hợp lệ!";
    }
    if (confirmPassWord.trim() === "") {
      newErrors.password = "Mật khẩu không hợp lệ!";
    }
    if (oldPassword !== userDetail.password) {
      newErrors.password = "Mật khẩu cũ không đúng!";
    }
    if (newPassword !== confirmPassWord) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp!";
    }

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedData = {
      userId,
      userData: {
        ...userDetail,
        password: newPassword,
      },
    };
    const newErrors = validateForm();
    console.log(newErrors);

    if (Object.keys(newErrors)?.length === 0) {
      // No errors, submit form data

      dispatch(updateUserById(updatedData));
      Swal.fire({
        icon: "success",
        title: "Đổi mật khẩu thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Errors found, set them in state
      setErrors(newErrors);
      return;
    }

    setNewPassword(updatedData.userData.password);
    setUpdateMessage("Cập nhật hồ sơ thành công!");
  };
  return (
    <Fragment>
      <div className="bc-grey">
        <div className="row mb-5 mr-0 ml-0 border-0">
          <div className="col-lg-12 mt-12">
            <div className="profile card card-body px-3 pt-3 pb-0 border rounded">
              <div className="profile-head">
               
                <div className="profile-info d-flex">
                  <div className="profile-photo ">
                  <img
                      src={
                        userDetail.img
                          ? userDetail.img
                          : publicUrl + "assets/img/author/pic2.jpg"
                      }
                      alt="img"
                      className="bg-info rounded-circle mb-4 "
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="profile-details d-flex">
                    <div className="profile-name px-3 pt-2">
                      <h4 className="text-primary mb-0">
                        {userDetail.fullName}
                      </h4>
                      <p>Khách hàng</p>
                    </div>
                    {/* <div className="profile-email px-2 pt-2">
                      <h4 className="text-muted mb-0">hello@email.com</h4>
                      <p>Email</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <Sidebar className="ml-4">
            <Menu>
              <MenuItem component={<Link to={`/customer-profile`}></Link>}>
                Hồ sơ của tôi
              </MenuItem>
              <MenuItem
                component={<Link to={`/customer/change-password`}></Link>}
              >
                Đổi mật khẩu
              </MenuItem>
            </Menu>
          </Sidebar>
          <div className="col-xl-8">
            <div className="card">
              <div className="inner-content">
                <div className="card-body">
                  <div className="profile-tab">
                    <div className="custom-tab-1">
                      <Tab.Container defaultActiveKey="Setting">
                        <Nav as="ul" className="nav nav-tabs">
                          <Nav.Item as="li" className="nav-item">
                            <Nav.Link to="#profile-settings" eventKey="Setting">
                              <span className="d-flex align-items-center">
                                <i
                                  className="la la-edit me-2 mr-2"
                                  style={{ fontWeight: "bold" }}
                                ></i>
                                <strong style={{ fontSize: "1.2rem" }}>
                                  Đổi mật khẩu
                                </strong>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content>
                          <Tab.Pane id="about-me" eventKey="About">
                            <div className="profile-personal-info">
                              <h4 className="text-primary mb-2 mt-2">
                                Thông Tin Cá Nhân
                              </h4>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-200">Mã KH:</h5>
                                </div>
                                <div className="col-9 ">
                                  <span>048321842</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Họ và Tên : </h5>
                                </div>
                                <div className="col-9 ">
                                  <span>{userDetail.fullName}</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">
                                    Căn cước công dân :
                                  </h5>
                                </div>
                                <div className="col-9 ">
                                  <span>4890327148921</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Giới tính : </h5>
                                </div>
                                <div className="col-9  ">
                                  <span>{userDetail.gender}</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Ngày sinh :</h5>
                                </div>
                                <div className="col-9 ">
                                  <span>{userDetail.dateOfBirth}</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Địa chỉ:</h5>
                                </div>
                                <div className="col-9 ">
                                  <span>{userDetail.address}</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Số điện thoại:</h5>
                                </div>
                                <div className="col-5 ">
                                  <span>{userDetail.phone}</span>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane id="profile-settings" eventKey="Setting">
                            <div className="pt-3">
                              <div className="settings-form">
                                <form onSubmit={submitHandler}>
                                  <div className="row">
                                    <div className="form-group mb-3 col-md-12">
                                      <label className="form-label">
                                        Mật khẩu cũ
                                      </label>
                                      <input
                                        type="password"
                                        placeholder="Mật khẩu cũ"
                                        className="form-control"
                                        value={oldPassword}
                                        onChange={(e) => {
                                          setErrors({ ...errors, address: "" });
                                          setOldPassword(e.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="form-group mb-3 col-md-12">
                                      <label className="form-label">
                                        Mật khẩu mới
                                      </label>
                                      <input
                                        type="password"
                                        placeholder="Mật khẩu mới"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => {
                                          setErrors({ ...errors, address: "" });
                                          setNewPassword(e.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="form-group mb-3 col-md-12">
                                      <label className="form-label">
                                        Xác nhận mật khẩu mới
                                      </label>
                                      <input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                        className="form-control"
                                        value={confirmPassWord}
                                        onChange={(e) => {
                                          setErrors({ ...errors, address: "" });
                                          setConfirmPassWord(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* <div className="form-group mb-3">
                                    <label className="form-label">
                                      ID Quốc gia
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Địa chỉ"
                                      className="form-control"
                                    />
                                  </div> */}

                                  {/* <div className="row">
                                    <div className="form-group mb-3 col-md-12">
                                      <label className="form-label">
                                        Về bản thân
                                      </label>
                                      <textarea
                                        className="form-control"
                                        rows="4"
                                      ></textarea>
                                    </div>
                                  </div> */}
                                  <div className="form-group mb-3">
                                    <div className="form-check custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="gridCheck"
                                      />
                                      <label
                                        className="form-check-label ml-2"
                                        htmlFor="gridCheck"
                                      >
                                        Kiểm tra trước khi cập nhật
                                      </label>
                                    </div>
                                  </div>
                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                  >
                                    Cập nhật
                                  </button>
                                </form>
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChangePassword;
