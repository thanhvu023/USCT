import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { login, logoutUser } from "../../redux/slice/authSlice";

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const errMsg = useSelector((state) => state.auth.error?.message);
  const isError = useSelector((state) => state.auth.error?.name);

  const handleSubmit = async (e) => {
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
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="w-20 h-20 animate-spin border-t-4 border-blue-500 border-b-4 rounded-full"></div>
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={handleSubmit}>
              <div className="row">
                {/* <div className="col-12">
                  <div className="single-input-inner style-bg-border">
                    <input type="text" placeholder="Họ và tên" />
                  </div>
                </div> */}
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
                  {isError === "Error" && (
                    <div className="text-red-600 text-[18px] mt-2 text-center">
                      {errMsg}
                    </div>
                  )}
                  {error}
                </div>
                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100">Sign In</button>
                </div>
                <div className="col-12">
                  <Link to="/">Quên mật khâủ</Link>
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
