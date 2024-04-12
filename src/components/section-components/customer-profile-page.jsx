import React, { Fragment, useEffect, useState } from "react";
import { Tab, Nav, Button } from "react-bootstrap";
import PageTitle from "./PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserById } from "../../redux/slice/authSlice";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Swal from "sweetalert2";

const CustomerProfilePage = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";

  const token = useSelector((state) => state.auth.token);
  const userId = jwtDecode(token).UserId;
  const userDetail = useSelector((state) => state.auth.userById) || {}  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId]);

  const [fullName, setFullName] = useState(userDetail.fullName || "");
const [phone, setPhone] = useState(userDetail.phone || "");
const [address, setAddress] = useState(userDetail.address || "");
const [email, setEmail] = useState(userDetail.email || "");
const [dateOfBirth, setDateOfBirth] = useState(userDetail.dateOfBirth || "");
const [gender, setGender] = useState(userDetail.gender || "");
  const [isChecked, setIsChecked] = useState(false); // State variable to track checkbox status

  let [avatar, setImageSrc] = useState(userDetail.avatar);

  const [errors, setErrors] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
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
    if (fullName.trim() === "") {
      newErrors.fullName = "Họ và tên không hợp lệ!";
    }

    if (phone.trim() === "" || !/^\d+$/.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }

    if (email.trim() === "") {
      newErrors.email = "Email không được để trống!";
    }

    if (address.trim() === "") {
      newErrors.address = "Địa chỉ không được để trống!";
    }
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedData = {
      userId,
      userData: {
        ...userDetail,
        userId,
        fullName,
        phone,
        address,
        email,
        avatar,
        gender,
        dateOfBirth,
      },
    };
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Check if the checkbox is checked
      if (!isChecked) {
        // Checkbox not checked, do not send the request
        Swal.fire({
          icon: "warning",
          title: "Vui lòng kiểm tra trước khi cập nhật!",
          showConfirmButton: false,
          timer: 1500, // Hiển thị trong 1.5 giây
        });
        return;
      }

      // Checkbox is checked, proceed to submit form data
      dispatch(updateUserById(updatedData));
    } else {
      // Errors found, set them in state
      setErrors(newErrors);
      return;
    }

  
// Cập nhật thông tin và hiển thị thông báo thành công
setFullName(updatedData.userData.fullName);
setPhone(updatedData.userData.phone);
setAddress(updatedData.userData.address);
setDateOfBirth(updatedData.userData.dateOfBirth);
setGender(updatedData.userData.gender);
setImageSrc(updatedData.userData.avatar);

Swal.fire({
  icon: "success",
  title: "Cập nhật hồ sơ thành công!",
  showConfirmButton: false,
  timer: 1500, // Hiển thị trong 1.5 giây
});
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />
      <div className="bc-grey">
        <div className="row mb-5 mr-0 ml-0 border-0">
          <div className="col-lg-12 mt-12">
            <div className="profile card card-body px-3 pt-3 pb-0 border rounded">
              <div className="profile-head">
                <div className="photo-content ">
                  <div className="cover-photo rounded"></div>
                </div>
                <div className="profile-info d-flex">
                  <div className="profile-photo ">
                    <img
                      src={publicUrl + "assets/img/author/pic2.jpg"}
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
              <MenuItem component={<Link to={`/customer/change-password`}></Link>}>
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
                      <Tab.Container defaultActiveKey="About">
                        <Nav as="ul" className="nav nav-tabs">
                          <Nav.Item as="li" className="nav-item">
                            <Nav.Link to="#about-me" eventKey="About">
                              <span className="d-flex align-items-center">
                                <i
                                  className="la la-user me-2"
                                  style={{ fontWeight: "bold" }}
                                ></i>
                                <strong style={{ fontSize: "1.2rem" }}>
                                  Hồ sơ khách hàng
                                </strong>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item">
                            <Nav.Link to="#profile-settings" eventKey="Setting">
                              <span className="d-flex align-items-center">
                                <i
                                  className="la la-edit me-2 mr-2"
                                  style={{ fontWeight: "bold" }}
                                ></i>
                                <strong style={{ fontSize: "1.2rem" }}>
                                  Chỉnh sửa hồ sơ
                                </strong>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content>
                          <Tab.Pane id="about-me" eventKey="About">
                            {/* <div className="profile-about-me">
                              <div className="pt-4 border-bottom-1 pb-3">
                                <h4 className="text-primary">
                                  Tóm tắt bản thân
                                </h4>
                                <p className="mb-2">
                                  A wonderful serenity has taken possession of
                                  my entire soul, like these sweet mornings of
                                  spring which I enjoy with my whole heart. I am
                                  alone, and feel the charm of existence was
                                  created for the bliss of souls like mine.I am
                                  so happy, my dear friend, so absorbed in the
                                  exquisite sense of mere tranquil existence,
                                  that I neglect my talents.
                                </p>
                                <p>
                                  A collection of textile samples lay spread out
                                  on the table - Samsa was a travelling salesman
                                  - and above it there hung a picture that he
                                  had recently cut out of an illustrated
                                  magazine and housed in a nice, gilded frame.
                                </p>
                              </div>
                            </div> */}
                            <div className="profile-personal-info">
                              <h4 className="text-primary mb-2 mt-4">
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
                                  {" "}
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
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Họ và tên
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) => {
                                          setErrors({
                                            ...errors,
                                            username: "",
                                          });
                                          setFullName(e.target.value);
                                          setUpdateMessage("");
                                        }}
                                      />
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={email}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Mật khẩu
                                      </label>
                                      <div className="input-group">
                                        <input
                                          type="password"
                                          placeholder="Password"
                                          className="form-control"
                                          value={userDetail.password}
                                          readOnly // Make input readOnly based on isEditingPassword state
                                        />                                        
                                      </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Giới tính
                                      </label>
                                      <select
                                        className="form-control"
                                        onChange={(e) => {
                                          setUpdateMessage("");
                                          setErrors({ ...errors, phone: "" });
                                          setGender(e.target.value);
                                        }}
                                        defaultValue={userDetail.gender}
                                      >
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Ngày sinh
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        value={dateOfBirth}
                                        onChange={(e) => {
                                          setUpdateMessage("");
                                          console.log(
                                            "New date value:",
                                            e.target.value
                                          ); // Debugging: Log the new date value
                                          setDateOfBirth(e.target.value); // Update dateOfBirth state variable
                                          console.log(
                                            "Updated dateOfBirth state:",
                                            dateOfBirth
                                          ); // Debugging: Log the updated dateOfBirth state
                                          setErrors({
                                            ...errors,
                                            dateOfBirth: "",
                                          }); // Reset any errors related to dateOfBirth
                                        }}
                                      />
                                    </div>

                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Số điện thoại
                                      </label>
                                      <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => {
                                          setUpdateMessage("");
                                          setErrors({ ...errors, phone: "" }); // Reset phone error when input changes
                                          setPhone(e.target.value);
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
                                  <div className="form-group mb-3">
                                    <label className="form-label">
                                      Địa chỉ
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Apartment, studio, or floor"
                                      className="form-control"
                                      value={address}
                                      onChange={(e) => {
                                        setErrors({ ...errors, address: "" });
                                        setAddress(e.target.value);
                                        setUpdateMessage("");
                                      }}
                                    />
                                  </div>
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
                                        checked={isChecked}
                                        onChange={() =>
                                          setIsChecked(!isChecked)
                                        } // Toggle checkbox state
                                      />
                                      <label className="form-check-label ml-2">
                                        Kiểm tra trước khi cập nhật
                                      </label>
                                    </div>
                                  </div>
                                  <div>{updateMessage}</div>
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

export default CustomerProfilePage;
