import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarV2 extends Component {
  componentDidMount() {
    const $ = window.$;

    $("body").removeClass("home-3");
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "logo";
    let anchor = "#";
    return (
      <div className="navbar-area">
        <div className="navbar-top">
          <div className="container">
            <div className="row">
              <div className="col-md-8 text-md-left text-center">
                <ul>
                  <li>
                    <p>
                      <i className="fa fa-map-marker" /> 2024 Long Thạnh Mỹ,
                      Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
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
        <nav className="navbar navbar-area-2 navbar-area navbar-expand-lg go-top">
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
              <Link className="signin-btn" to="/sign-in">
                Đăng nhập
              </Link>
              <Link className="btn btn-base" to="/sign-up">
                Đăng ký
              </Link>
              <a className="search-bar" href="#">
                <i className="fa fa-search" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="edumint_main_menu">
              <ul className="navbar-nav menu-open">
                <li className="menu-item current-menu-item">
                  <Link to="/">Trang chủ</Link>
                  {/* <ul className="sub-menu">
				            <li><Link to="/">Home 01</Link></li>
	                        <li><Link to="/home-v2">Home 02</Link></li>
	                        <li><Link to="/home-v3">Home 03</Link></li>
			            </ul> */}
                </li>
                <li className="menu-item">
                  <Link to="/program">Các chương trình</Link>
                  {/* <ul className="sub-menu">
				            <li><Link to="/course">Chương trình du học</Link></li>
	                        <li><Link to="/course-details">Chương trình du học</Link></li>
			            </ul> */}
                </li>

                <li className="menu-item">
                  <Link to="/blog">Trường học</Link>
                </li>
                <li>
                  <Link to="/contact">Tư vấn</Link>
                </li>
              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop style-black">
              <Link className="signin-btn" to="/sign-in">
                Đăng nhập
              </Link>
              <Link className="btn btn-base" to="/sign-up">
                Đăng ký
              </Link>
              <a className="search-bar" href="#">
                <i className="fa fa-search" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavbarV2;
