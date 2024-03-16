import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/slice/authSlice";

function NavbarV4() {
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const isLoggedIn = useSelector((state) => state.auth?.token);
  console.log(isLoggedIn)
  let publicUrl = process.env.PUBLIC_URL + "/";
  return (
    <div className="navbar-area">
      <div className="navbar-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-md-left text-center">
              <ul>
                <li>
                  <p>
                    <i className="fa fa-map-marker" /> 2024 Long Thạnh Mỹ, Thành
                    Phố Thủ Đức, Thành phố Hồ Chí Minh
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-envelope-o" /> info@website.com
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="topbar-right text-md-right text-center">
                <li className="social-area">
                  <a href="#">
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar bg-white navbar-area-1 navbar-area navbar-expand-lg go-top">
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              className="menu toggle-btn d-block d-lg-none"
              data-target="#edumint_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-left" />
              <span className="icon-right" />
            </button>
          </div>
          <div className="logo">
            <Link to="/">
              <img src={publicUrl + "assets/img/logo.png"} alt="img" />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            {!isLoggedIn && (
              <>
                <Link className="signin-btn" to="/sign-in">
                  Sign In
                </Link>
                <Link className="btn btn-base" to="/sign-up">
                  Sign Up
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout()}
                className="signin-btn"
                to="/sign-in"
              >
                Đăng xuất
              </button>
            )}
            <a className="search-bar" href="#">
              <i className="fa fa-search" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="edumint_main_menu">
            <ul className="navbar-nav menu-open">
              <li className="menu-item current-menu-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="menu-item">
                <Link to="/program">Các chương trình</Link>
                {/* <ul className="sub-menu">
                    <li>
                      <Link to="/">Chương trình du học</Link>
                    </li>
                    <li>
                      <Link to="/course-details">Chương trình du học</Link>
                    </li>
                  </ul> */}
              </li>

              <li className="menu-item">
                <Link to="/university">Trường học</Link>
              </li>
              <li>
                <Link to="/contact">Tư Vấn</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right-part nav-right-part-desktop">
            {!token && (
              <>
                <Link className="signin-btn" to="/sign-in">
                  Đăng nhập
                </Link>
                <Link className="btn btn-base" to="/sign-up">
                  Đăng ký
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="signin-btn"
                to="/sign-in"
              >
                Đăng xuất
              </button>
            )}
            <a className="search-bar" href="#">
              <i className="fa fa-search" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarV4;
