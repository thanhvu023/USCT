import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserById, logoutUser } from "../../redux/slice/authSlice";
import { logoutStudent } from "../../redux/slice/studentSlice";
import { Dropdown } from "react-bootstrap";
import { logoutProgram } from "../../redux/slice/programSlice";
import Swal from "sweetalert2"; // Import Swal
import jwtDecode from "jwt-decode";
import {
  getConsultantById,
  logoutConsultant,
} from "../../redux/slice/consultantSlice";
import { resetRegistration } from "../../redux/slice/registrationSlice";
import { Typography } from "@mui/material";
function Navbar2() {
  const token = useSelector((state) => state?.auth?.token);
  const userId = token ? jwtDecode(token).UserId : null;
  useEffect(() => {
    if (userId) {
      dispatch(getConsultantById(userId));
    }
  }, [userId]);

  const userDetail = useSelector((state) => state?.consultant?.consultantById);
  console.log("userDetail",userDetail)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutStudent());
    dispatch(logoutProgram());
    dispatch(resetRegistration());
    dispatch(logoutConsultant());
    navigate("/");
  };
  let publicUrl = process.env.PUBLIC_URL + "/";

  const isLoggedIn = useSelector((state) => state?.auth?.token);

  // Hàm kiểm tra token và hiển thị cảnh báo nếu cần
  const checkTokenAndRedirect = (path) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Bạn cần đăng nhập!",
        text: "Vui lòng đăng nhập để tiếp tục.",
        showConfirmButton: true,
      }).then(() => {
        navigate("/sign-in");
      });
    } else {
      navigate(path);
    }
  };
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
            <Link to="/consultant">
              <img src={publicUrl + "assets/img/logo.png"} alt="img" />
            </Link>
          </div>

          <div
            className="collapse navbar-collapse go-top"
            id="edumint_main_menu"
          >
            {/* <ul className="navbar-nav menu-open">
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
                <Link
                  to="/contact"
                  onClick={() => checkTokenAndRedirect("/contact")}
                >
                  Tư Vấn
                </Link>
              </li>
              
            </ul> */}
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
              </>
            )}
            {token && (
              <div className="nav-right-part nav-right-part-desktop d-flex align-items-center">
               <Typography variant="body1">Xin chào {userDetail.fullName}</Typography>
                <Dropdown className="nav-item header-profile">
                  <Dropdown.Toggle
                    to={"#"}
                    className="nav-link i-false"
                    as="div"
                  >
                    <img
                      src={
                        userDetail.img
                          ? userDetail.img
                          : publicUrl + "assets/img/author/pic2.jpg"
                      }
                      alt="img"
                      className=" rounded-circle"
                      style={{ height: "50px", width: "50px" }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    align="end"
                    className="mt-3 dropdown-menu dropdown-menu-right "
                  >
                    <Link
                      to={"/consultant-profile"}
                      className="dropdown-item ai-icon icon-bell-effect ml-0"
                    >
                      <span className="ms-2">Thông tin tư vấn viên </span>
                    </Link>
                    {/* <Link
                      to={"/students-profile"}
                      className="dropdown-item ai-icon ml-0"
                    >
                      <span className="ms-2">Hồ sơ học sinh </span>
                    </Link> */}
                    <button
                      className="dropdown-item ai-icon"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar2;
