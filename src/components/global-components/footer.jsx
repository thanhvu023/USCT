
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <footer className="footer-area bg-gray">
      <div className="footer-subscribe">
        <div className="container">
          <form className="footer-subscribe-inner">
            <div className="row">
              <div className="col-lg-5">
                <div className="single-input-inner style-border-bottom">
                  <input type="text" placeholder="Họ và tên" />
                </div>
              </div>
              <div className="col-lg-5">
                <div className="single-input-inner style-border-bottom">
                  <input type="text" placeholder="Email của bạn" />
                </div>
              </div>
              <div className="col-lg-2">
                <a className="btn btn-base" href="#">
                  Đăng ký
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-between">
            {/* Widget 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_contact">
                <h4 className="widget-title">Liên Hệ</h4>
                <ul className="details">
                  <li>
                    <i className="fa fa-map-marker" /> 420 Love Street 133/2,
                    Quận 1, TP. Hồ Chí Minh, Việt Nam
                  </li>
                  <li>
                    <i className="fa fa-envelope" /> info@duhocmy.vn
                  </li>
                  <li>
                    <i className="fa fa-phone" /> +84 912 345 678
                  </li>
                </ul>
              </div>
            </div>
            {/* Widget 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">Chương Trình Đào Tạo</h4>
                <ul className="go-top">
                  <li>
                    <Link to="/course">Cao đẳng</Link>
                  </li>
                  <li>
                    <Link to="/course">Đại học</Link>
                  </li>
                  <li>
                    <Link to="/course">Sau đại học</Link>
                  </li>
                  <li>
                    <Link to="/course">Cao học</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
            {/* Widget 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_contact">
                <h4 className="widget-title">Kết Nối</h4>
                <ul className="details">
                  <li>
                    <i className="fa fa-facebook-official" />
                    Theo dõi chúng tôi trên <a href="#">Facebook</a>
                    <div className="time">2 Ngày trước</div>
                  </li>
                  <li>
                    <i className="fa fa-instagram" />
                    Hình ảnh sinh viên tại <a href="#">Instagram</a>
                    <div className="time">5 Ngày trước</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 align-self-center">
              <a href="index.html">
                <img
                  src={publicUrl + "assets/img/footer-logo.png"}
                  alt="img"
                />
              </a>
            </div>
            <div className="col-lg-4 col-md-6 order-lg-12 text-md-right align-self-center">
              <ul className="social-media mt-md-0 mt-3">
                <li>
                  <a
                    className="facebook"
                    href="https://www.facebook.com/solverwp/"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="https://www.twitter.com/solverwp"
                  >
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    className="instagram"
                    href="https://www.youtube.com/solverwp/"
                  >
                    <i className="fa fa-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    className="youtube"
                    href="https://www.youtube.com/solverwp/"
                  >
                    <i className="fa fa-youtube" />
                  </a>
                </li>
                <li>
                  <a
                    className="pinterest"
                    href="https://www.pinterest.com/solverwp/"
                  >
                    <i className="fa fa-pinterest" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 order-lg-8 text-lg-center align-self-center mt-lg-0 mt-3">
              <p>copyright 2024 by FPTUni.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
