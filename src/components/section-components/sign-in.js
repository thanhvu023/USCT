import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, resetMessage } from "../../redux/slice/authSlice";
import { Backdrop, CircularProgress } from "@mui/material";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state?.auth?.loading);
  const errMsg = useSelector((state) => state?.auth?.error?.message);
  const isError = useSelector((state) => state?.auth?.error?.name);
  useEffect(() => {
    if (isError) {
      dispatch(resetMessage());
    }
  }, [isError]);
  useEffect(() => {
    if (isError) {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  }, [isError, errMsg]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Bạn cần phải điền đầy đủ thông tin!");
      return;
    }
    const loginData = {
      email: email,
      password: password,
    };
    dispatch(login({ loginData, navigate }));
    // Clear the error state
    dispatch(resetMessage());
    setError("");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="signin-page-area pd-top-120 pd-bottom-120">
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
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Mật khẩu"
                    />
                  </div>
                  {/* {isError === "Error" && error && (
                    <div className="alert alert-danger mt-2" role="alert">
                      {error}
                    </div>
                       
                  )} */}
                </div>
                {error && (
                  <div className="col-12">
                    <Alert variant="danger">{error}</Alert>
                  </div>
                )}
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Đăng nhập</button>
                </div>
                <div className="col-12">
                  <Link to="/forgot-password">Quên mật khẩu</Link>
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

export default Signin;
