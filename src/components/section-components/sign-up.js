import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/slice/authSlice";

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

  const [errors, setErrors] = useState({}); // Maintain an error object
  const errMsg = useSelector((state) => state.auth.error?.message);
  const isError = useSelector((state) => state.auth.error?.name);
  const loading = useSelector((state) => state.auth.loading);

  const validateForm = () => {
    const newErrors = {};

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Họ và tên không được để trống!";
    }
    if (/^[\p{L}\p{M}]+$/u.test(formData.fullName)) {
      newErrors.fullName = "Họ và tên không hợp lệ!";
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
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống!";
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

    if (formData.gender === "") {
      newErrors.gender = "Giới tính không được để trống!";
    }

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isCheckboxChecked) {
    //   setErrors({
    //     checkbox: "Bạn phải chấp nhận điều khoản quyền riêng tư và bảo mật!",
    //   });
    //   return; // Prevent form submission if the checkbox is unchecked
    // }

    const newErrors = validateForm();
    console.log(formData);
    if (Object.keys(newErrors).length === 0) {
      // No errors, submit form data
      dispatch(signup({ formData, navigate }));
    } else {
      // Errors found, set them in state
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear the error for the current field
  };

  return (
    <div className="signup-page-area pd-top-120 pd-bottom-120">
      <div className="container">
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
                    <p className="text-red-500 text-[16px] !important">
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
                    <p className="text-red-500 text-[16px] !important">
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
                    <p className="text-red-500 text-[16px] !important">
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
                    <p className="text-red-500 text-[16px] !important">
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
                    <p className="text-red-500 text-[16px] !important">
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
                <div className="text-left">
                  <label className="text-gray-600">Giới tính</label>
                  <select
                    className="w-full h-12 border border-gray-300 rounded-md px-3 mt-2"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-[16px] !important">
                      {errors.gender}
                    </p>
                  )}
                </div>
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Tạo tài khoản</button>
                </div>
                <div className="col-12">
                  <span>Đã có tài khoản trước đó?</span>
                  <a className="ml-2" href="signin.html">
                    <strong>Đăng nhập</strong>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
