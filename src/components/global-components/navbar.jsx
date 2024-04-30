import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getNotification,
  getUserById,
  logoutUser,
} from "../../redux/slice/authSlice";

import { Dropdown } from "react-bootstrap";
import { logoutProgram } from "../../redux/slice/programSlice";
import Swal from "sweetalert2"; // Import Swal
import jwtDecode from "jwt-decode";
import { generateToken, messaging } from "../FirebaseImage/Config";
import { onMessage } from "firebase/messaging";
import { Badge, IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BasicMenu from "./basicMenu";
import { logoutStudent } from "../../redux/slice/studentSlice";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorel] = useState(null);
  const handleOpen = (e) => {
    document.body.classList.add("notification-open");
    setAnchorel(e.target);
    setOpen(true);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = (e) => {
    document.body.classList.remove("notification-open");
    setOpen(false);
  };
  const token = useSelector((state) => state?.auth?.token);
  const userId = token ? jwtDecode(token).UserId : null;
  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
    });
  }, []);
  dispatch(getNotification(userId));

  const userDetail = useSelector((state) => state?.auth?.userById);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutStudent());
    dispatch(logoutProgram());
    // dispatch(resetNoti())
    navigate("/");
  };

  let publicUrl = process.env.PUBLIC_URL + "/";

  const isLoggedIn = useSelector((state) => state?.auth?.token);
  const notification = useSelector(
    (state) => state?.auth?.notificationByUserId
  );
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
            <Link to="/">
              <img src={publicUrl + "assets/img/logo.png"} alt="img" />
            </Link>
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
                <Link
                  to="/contact"
                  onClick={() => checkTokenAndRedirect("/contact")}
                >
                  Tư Vấn
                </Link>
              </li>
              {/* <li>
                <Link to="/admin">Admin</Link>
              </li> */}
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
                <div>
                  <Tooltip
                    title={
                      notification.length
                        ? `You have ${notification.length}  notifications!`
                        : "You dont have any notification!"
                    }
                  >
                    <IconButton color="primary" onClick={handleOpen}>
                      <Badge badgeContent={notification.length} color="primary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <BasicMenu
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    menuItems={notification}
                  />
                </div>
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
                      to={"/customer-profile"}
                      className="dropdown-item ai-icon icon-bell-effect ml-0"
                    >
                      <span className="ms-2">Thông tin khách hàng </span>
                    </Link>
                    <Link
                      to={"/students-profile"}
                      className="dropdown-item ai-icon ml-0"
                    >
                      <span className="ms-2">Hồ sơ học sinh </span>
                    </Link>
                    <button
                      className="dropdown-item ai-icon"
                      onClick={handleLogout}
                    >
                      Đăng xuất
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
