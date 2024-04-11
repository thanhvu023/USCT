import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarV3 = () => {
  useEffect(() => {
    const $ = window.$;
    $("body").addClass("home-3");
  }, []);

  const publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="navbar-area">
      <nav className="navbar navbar-area-3 navbar-area navbar-expand-lg">
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
              <img src={publicUrl + "assets/img/logo-2.png"} alt="img" />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            <Link className="btn btn-base" to="/sign-up">
              Đăng ký
            </Link>
          </div>
          <div
            className="collapse navbar-collapse go-top"
            id="edumint_main_menu"
          >
            <ul className="navbar-nav menu-open">
              <li className="menu-item current-menu-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="menu-item">
                <Link to="/program">Các chương trình</Link>
              </li>
              <li className="menu-item">
                <Link to="/university">Trường học</Link>
              </li>
              <li>
                <Link to="/contact">Tư vấn</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right-part nav-right-part-desktop style-black">
            <div className="emt-phone-wrap">
              <div className="emt-phone">
                <i className="fa fa-phone" />
                <div className="phone-number align-self-center">
                  Điện thoại <br />
                  <span>860 -272 -9738</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarV3;
