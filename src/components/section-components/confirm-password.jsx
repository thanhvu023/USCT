import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUserById,
  login,
  updateUserById,
} from "../../redux/slice/authSlice";
import { Alert } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const ConfirmPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const errMsg = useSelector((state) => state.auth.error?.message);
  const isError = useSelector((state) => state.auth.error?.name);
  const userId = jwtDecode(token)?.UserId;
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId]);
  const userDetail = useSelector((state) => state?.auth?.userById);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.trim() === "" || password.trim() === "") {
      setError("Bạn cần phải điền đầy đủ thông tin!");
      return;
    }
    const updatedData = {
      userId,
      userData: {
        ...userDetail,
        userId,
        password,
      },
    };
    console.log(updatedData);
    dispatch(updateUserById(updatedData))
    Swal.fire({
      icon: "success",
      title: "Đổi mật khẩu thành công!",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/sign-in");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  const handleConfirmPassChange = (e) => {
    setConfirmPassword(e.target.value);
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
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Mật khẩu mới"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPassChange}
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </div>
                  {isError === "Error" && error && (
                    <div className="alert alert-danger mt-2" role="alert">
                      {error}
                    </div>
                  )}
                </div>
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
                  <Link to="/login">Đăng nhập</Link>
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
};

export default ConfirmPassword;
