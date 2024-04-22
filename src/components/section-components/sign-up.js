import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/slice/authSlice";
import { Backdrop, CircularProgress } from "@mui/material";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    phone: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const loading = useSelector((state) => state?.auth?.loading);
  const validateForm = () => {
    const newErrors = {};

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Họ và tên không được để trống!";
    }

    if (/^[\p{L}\p{M}]+$/u.test(formData.fullName)) {
      newErrors.fullName = "Họ và tên không hợp lệ!";
    }

    if (formData.phone.trim() === "" || !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email không được để trống!";
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Địa chỉ không được để trống!";
    }

    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống!";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ hoa và 1 số!";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword =
        "Mật khẩu và xác nhận mật khẩu phải giống nhau!";
    }

    if (!formData.gender) {
      newErrors.gender = "Giới tính không được để trống!";
    }

    // if (formData.dob.trim() === "") {
    //   newErrors.dob = "Ngày sinh không được để trống!";
    // }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      dispatch(signup({ formData, navigate }));
      setShowSuccessAlert(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? (checked ? value : "") : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="signup-page-area pd-top-120 pd-bottom-120">
      <div className="container">
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Họ và tên"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-center text-danger mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-center text-danger mt-1">{errors.dob}</p>
                  )}
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-center text-danger mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Số điện thoại"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-center text-danger mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-center text-danger mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-center text-danger mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      name="address"
                      placeholder="Địa chỉ"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <Form.Group controlId="gender">
                    <Form.Check
                      type="radio"
                      id="genderMale" // Unique id for male option
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      label="Nam"
                    />
                    <Form.Check
                      type="radio"
                      id="genderFemale" // Unique id for female option
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      label="Nữ"
                    />
                  </Form.Group>
                </div>
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Tạo tài khoản</button>
                </div>
                <div className="col-12">
                  <span>Đã có tài khoản trước đó?</span>
                  <Link className="ml-2" to="/sign-in">
                    <strong>Đăng nhập</strong>
                  </Link>
                </div>
              </div>
            </form>
            {showSuccessAlert && (
              <div className="alert alert-success" role="alert">
                Tạo tài khoản thành công!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
