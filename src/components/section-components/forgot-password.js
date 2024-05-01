import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, sendEmailForgotPassword } from "../../redux/slice/authSlice";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const errMsg = useSelector((state) => state.auth.error?.message);
  const isError = useSelector((state) => state.auth.error?.name);
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Nhập gmail bạn đã đăng ký!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Vui lòng nhập đúng định dạng email!");
      return;
    }

    dispatch(sendEmailForgotPassword(email));
    Swal.fire({
      icon: "success",
      title: "Đã gửi link vào gmail của bạn!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  useEffect(() => {
    if (isError === "Error" && errMsg) {
      setShowAlert(true);
    }
  }, [isError, errMsg]);

  return (
    <div className="signin-page-area pd-top-120 pd-bottom-120">
      <div className="container">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="w-20 h-20 animate-spin border-t-4 border-blue-500 border-b-4 rounded-full"></div>
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email"
                    />
                    {error && (
                      <p className="text-center text-danger mt-1">{error}</p>
                    )}
                  </div>
                </div>

                {isError === "Error" && error && (
                  <div className="alert alert-danger mt-2" role="alert">
                    {error}
                  </div>
                )}
                {showAlert && (
                  <div className="col-12">
                    <Alert variant="danger">
                      {errMsg || "Bạn cần phải điền đầy đủ thông tin!"}
                    </Alert>
                  </div>
                )}
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Gửi</button>
                </div>
                <div className="col-12">
                  <Link to="/">Quên mật khẩu</Link>
                  <Link to="/sign-up" className="ml-2" href="signup.html">
                    <strong>Đăng ký</strong>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
