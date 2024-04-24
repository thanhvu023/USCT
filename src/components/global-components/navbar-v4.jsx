import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/slice/authSlice";
import { Dropdown } from "react-bootstrap";
function NavbarV4() {
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isLoggedIn = useSelector((state) => state?.auth?.token);
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
              <img src={publicUrl + "assets/img/logo.png"} 
                  

              alt="img" />
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
                <>
                <button
                    onClick={handleLogout}
                    className="signin-btn"
                    to="/sign-in"
                >
                    Đăng xuất
                </button>
                <Link to="/profile">
                    <div className="avatar" />
                </Link>
            </>
              
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
          <div className="nav-right-part nav-right-part-desktop d-flex">
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
                        <div className="nav-right-part nav-right-part-desktop d-flex align-items-center">

                <Dropdown as="li" className="nav-item header-profile">              
                  <Dropdown.Toggle to={"#"} className="nav-link i-false" as="div">
                  <img src={publicUrl + "assets/img/author/pic1.jpg"}
                            className="bg-info rounded-circle mb-4 "
                            style={{width:"100px", height:'100px'}}

                  alt="img" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="mt-3 dropdown-menu dropdown-menu-right ">
                      <Link to={"/profile"} className="dropdown-item ai-icon icon-bell-effect">
                          <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          <span className="ms-2 m-0">Profile </span>
                      </Link>
                      <Link to={"/email-inbox"} className="dropdown-item ai-icon">
                          <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <span className="ms-2">Inbox </span>
                      </Link>                     
             
                  </Dropdown.Menu>
                </Dropdown>
                <button
                        onClick={handleLogout}
                        className="btn btn-base"
                        to="/sign-in"
                    >
                        Đăng xuất
                    </button>
            </div>
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
