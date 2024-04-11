import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  let publicUrl = process.env.PUBLIC_URL + '/';

  return (
    <div className="banner-area banner-area-1 bg-gray go-top">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 order-lg-12 align-self-center">
            <div className="thumb b-animate-thumb">
              <img src={publicUrl + "assets/img/banner/1new.png"} alt="hình ảnh" />
            </div>
          </div>
          <div className="col-lg-7 order-lg-1 align-self-center">
            <div className="banner-inner text-center text-lg-left mt-5 mt-lg-0">
              <h6 className="b-animate-1 sub-title">KHÁM PHÁ CƠ HỘI</h6>
              <h1 className="b-animate-2 title">Mở Ra Tương Lai Học Tập Tại Mỹ</h1>
              <Link className="btn btn-base b-animate-3 mr-sm-3 mr-2" to="/contact">Kết Nối Ngay</Link>
              <Link className="btn btn-border-black b-animate-3" to="/program">Tìm Hiểu Thêm</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
