import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import jwtDecode from "jwt-decode";
import React, { Fragment, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import {
  getConsultantById,
  updateConsultantById,
} from "../../redux/slice/consultantSlice";
import { imageDb } from "../FirebaseImage/Config";
const ConsultantProfile = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";

  const token = useSelector((state) => state?.auth?.token);
  const userId = jwtDecode(token).UserId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConsultantById(userId));
  }, [userId]);
  const userDetail =
    useSelector((state) => state?.consultant?.consultantById) || {};
  const [userName, setuserName] = useState(userDetail.userName || "");
  const [introduction, setIntroduction] = useState(
    userDetail.introduction || ""
  );
  const [education, setEducation] = useState(userDetail.education || "");
  const [specialize, setSpecialize] = useState(userDetail.specialize || []);
  const [isChecked, setIsChecked] = useState(false); // State variable to track checkbox status
  const [errors, setErrors] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  let [avatar, setImageSrc] = useState(userDetail.img);
  const specializeOptions = [
    {
      value: "Công nghệ thông tin - Khoa học máy tính",
      label: "Công nghệ thông tin - Khoa học máy tính",
    },
    { value: "Kiến trúc - xây dựng", label: "Kiến trúc - xây dựng" },
    { value: "Kinh doanh và quản trị", label: "Kinh doanh và quản trị" },
    { value: "Luật", label: "Luật" },
    {
      value: "Nghệ thuật sáng tạo - Thiết kế",
      label: "Nghệ thuật sáng tạo - Thiết kế",
    },
    { value: "Chăm sóc sức khỏe y tế", label: "Chăm sóc sức khỏe y tế" },
    { value: "Tài chính - Ngân hàng", label: "Tài chính - Ngân hàng" },
    { value: "Kế toán kiểm toán", label: "Kế toán kiểm toán" },
    { value: "Truyền thông - Media", label: "Truyền thông - Media" },
  ];
  const handleUpload = async (e) => {
    const selectedFile = e.target.files && e.target.files[0]; // Check if files exist before accessing the first file

    if (selectedFile) {
      const imgRef = ref(
        imageDb,
        `Image/consultantAvatar/${selectedFile.name}`
      );
      try {
        await uploadBytes(imgRef, selectedFile);
        const imageUrl = await getDownloadURL(imgRef);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error(`Error uploading ${selectedFile.name}:`, error);
      }
    } else {
      console.error("No file selected.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (userName.trim() === "") {
      newErrors.userName = "Họ và tên không hợp lệ!";
    }
    if (introduction.trim() === "") {
      newErrors.introduction = "Email không được để trống!";
    }

    if (specialize.length === 0) {
      newErrors.specialize = "Chuyên môn không được để trống!";
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
        userName,
        education,
        introduction,
        img: avatar,
        specialize,
      },
    };
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      if (!isChecked) {
        Swal.fire({
          icon: "warning",
          title: "Vui lòng kiểm tra trước khi cập nhật!",
          showConfirmButton: false,
          timer: 1500, // Hiển thị trong 1.5 giây
        });
        return;
      }

      dispatch(updateConsultantById(updatedData));
    } else {
      setErrors(newErrors);
      return;
    }

    // Cập nhật thông tin và hiển thị thông báo thành công
    setuserName(updatedData.userData.userName);
    setSpecialize(updatedData.userData.specialize);
    setEducation(updatedData.userData.education);
    setIntroduction(updatedData.userData.introduction);
    setImageSrc(updatedData.userData.img);

    Swal.fire({
      icon: "success",
      title: "Cập nhật hồ sơ thành công!",
      showConfirmButton: false,
      timer: 1500, // Hiển thị trong 1.5 giây
    });
  };
  return (
    <Fragment>
      <div className="bc-grey">
        <div className="row mb-5 mr-0 border-0">
          <div className="col-lg-12 mt-12">
            <div className="profile card card-body px-3 pt-3 pb-0 border rounded">
              <div className="profile-head">
                <div className="photo-content ">
                  <div className="cover-photo rounded"></div>
                </div>
                <div className="profile-info d-flex">
                  <div className="profile-photo ">
                    <img
                      src={
                        avatar
                          ? avatar
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
                        {userDetail.userName}
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
          <div className="col-xl-2">
            <Sidebar className="">
              <Menu>
                <MenuItem component={<Link to={`/consultant-profile`}></Link>}>
                  Hồ sơ của tôi
                </MenuItem>
                <MenuItem
                  component={<Link to={`/consultant/change-password`}></Link>}
                >
                  Đổi mật khẩu
                </MenuItem>
              </Menu>
            </Sidebar>
          </div>
          <div className="col-xl-9">
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
                            <div className="profile-about-me">
                              <div className="pt-4 border-bottom-1 pb-3">
                                <h4 className="text-primary">
                                  Tóm tắt bản thân
                                </h4>
                                <p>{introduction}</p>
                              </div>
                            </div>
                            <div className="profile-personal-info">
                              <h4 className="text-primary mb-2 mt-4">
                                Thông Tin Cá Nhân
                              </h4>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-200">
                                    Quá trình học tập:
                                  </h5>
                                </div>
                                <div className="col-9 ">
                                  <p>{education}</p>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Họ và Tên : </h5>
                                </div>
                                <div className="col-9 ">
                                  <span>{userName}</span>
                                </div>
                              </div>
                              {/* <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">
                                    Căn cước công dân :
                                  </h5>
                                </div>
                                <div className="col-9 ">
                                  <span>4890327148921</span>
                                </div>
                              </div> */}
                              <div className="row mb-2">
                                <div className="col-3">
                                  <h5 className="f-w-500">Chuyên ngành : </h5>
                                </div>
                                <div className="col-9  ">
                                  <span>{specialize}</span>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane id="profile-settings" eventKey="Setting">
                            <div className="pt-3">
                              <div className="settings-form row ">
                                <form
                                  onSubmit={submitHandler}
                                  className="col-md-8"
                                >
                                  <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Họ và tên
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        className="form-control"
                                        value={userName}
                                        onChange={(e) => {
                                          setErrors({
                                            ...errors,
                                            username: "",
                                          });
                                          setuserName(e.target.value);
                                          setUpdateMessage("");
                                        }}
                                      />
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Giới thiệu bản thân
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="introduction"
                                        className="form-control"
                                        value={introduction}
                                        onChange={(e) => {
                                          setErrors({
                                            ...errors,
                                            introduction: "",
                                          });
                                          setIntroduction(e.target.value);
                                          setUpdateMessage("");
                                        }}
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
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Education ?
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="education"
                                        className="form-control"
                                        value={education}
                                        onChange={(e) => {
                                          setErrors({
                                            ...errors,
                                            education: "",
                                          });
                                          setEducation(e.target.value);
                                          setUpdateMessage("");
                                        }}
                                      />
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                      <label className="form-label">
                                        Chuyên môn
                                      </label>
                                      <Select
                                        name="specialize"
                                        isMulti
                                        options={specializeOptions}
                                        onChange={(selectedOptions) => {
                                          setUpdateMessage("");
                                          // Extract the values of selected options into an array
                                          const selectedValues =
                                            selectedOptions.map(
                                              (option) => option.value
                                            );
                                          setSpecialize(selectedValues);
                                        }}
                                        value={specializeOptions.filter(
                                          (option) =>
                                            specialize.includes(option.value)
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group mb-3">
                                    <div className="form-check custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={isChecked}
                                        onChange={() =>
                                          setIsChecked(!isChecked)
                                        }
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
                                <div className="col-md-3">
                                  <div className="form-group mb-3 col-md-6">
                                    <label className="form-label">Avatar</label>
                                    <img
                                      src={
                                        avatar
                                          ? avatar
                                          : publicUrl +
                                            "assets/img/author/pic2.jpg"
                                      }
                                      alt="Avatar"
                                      className="bg-info rounded-circle mb-4"
                                      style={{
                                        height: "200px",
                                        width: "300px",
                                        maxWidth: "auto !important", // Add !important to override the external CSS rule
                                      }}
                                      id="avatar-img"
                                    />
                                  </div>
                                  <div className="form-group mb-3 col-md-6">
                                    <input
                                      type="file"
                                      onChange={(e) => handleUpload(e)}
                                    />
                                  </div>
                                </div>
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

export default ConsultantProfile;
