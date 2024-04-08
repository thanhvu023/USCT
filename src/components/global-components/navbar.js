import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slice/authSlice";
import { Dropdown } from "react-bootstrap";

function Navbar() {
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  let publicUrl = process.env.PUBLIC_URL + "/";

  const isLoggedIn = useSelector((state) => state.auth?.token);
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
        <div className="container nav-container w-1/2">
          <div className="responsive-mobile-menu">
            {/* Responsive mobile menu button */}
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
              <img
                src={publicUrl+"assets/img/logo.png"}
                alt="img"
              />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            <a className="search-bar" href="#">
              <i className="fa fa-search" />
            </a>
          </div>

          <div
            className="collapse navbar-collapse go-top"
            id="edumint_main_menu"
          >
            <ul className="navbar-nav menu-open">
              <li className="menu-item current-menu-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="menu-item">
                <Link to="/program">Các Chương trình</Link>
              </li>
              <li className="menu-item">
                <Link to="/university">Trường học</Link>
              </li>
              <li>
                <Link to="/contact">Tư Vấn</Link>
              </li>
              <li>
              <Link to="/admin">Admin</Link>

              </li>
            </ul>
          </div>
          <div className="nav-right-part nav-right-part-desktop d-flex  align-items-center">
            {!isLoggedIn && (
              // If user is not authenticated
              <>
                <Link className="signin-btn btn" to="/sign-in">
                  Đăng nhập
                </Link>
                <Link className="btn btn-base" to="/sign-up">
                  Đăng ký
                </Link>
                <a className="search-bar" href="#">
                  <i className="fa fa-search" />
                </a>
              </>
            )}
            {token && (
              <div className="nav-right-part nav-right-part-desktop d-flex align-items-center">
                <Dropdown className="nav-item header-profile">
                  <Dropdown.Toggle
                    to={"#"}
                    className="nav-link i-false"
                    as="div"
                  >
                    <img
                      src={publicUrl + "assets/img/author/pic2.jpg"}
                      alt="img"
                      className="bg-info rounded-circle"
                      style={{ height: "50px" }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    align="end"
                    className="mt-3 dropdown-menu dropdown-menu-right "
                  >
                    <Link
                      to={"/customer"}
                      className="dropdown-item ai-icon icon-bell-effect ml-0"
                    >
                      <span className="ms-2">Customer&apos;s profile </span>
                    </Link>
                    <Link
                      to={"/students-profile"}
                      className="dropdown-item ai-icon ml-0"
                    >
                      <span className="ms-2">Student&apos;s profile </span>
                    </Link>
                    <button
                      className="dropdown-item ai-icon"
                      onClick={handleLogout}
                    >
                      <svg
                        id="icon-logout"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-danger"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1={21} y1={12} x2={9} y2={12} />
                      </svg>
                      <span className="ms-2">Logout </span>
                    </button>
                  </Dropdown.Menu>
                </Dropdown>

                <a className="search-bar" href="#">
                  <i className="fa fa-search" />
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
