import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class HowToWork extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="work-area pd-top-110 go-top">
			  <div className="container">
			    <div className="section-title">
			      <div className="row">
			        <div className="col-lg-6 align-self-center">
			          <h6 className="sub-title right-line">Cách Thức Hoạt Động</h6>
			          <h2 className="title">Quy Trình Làm Việc</h2>
			        </div>
			        <div className="col-lg-6 align-self-center">
			          <p className="content mt-lg-0">Hệ thống của chúng tôi được thiết kế để giúp học sinh Việt Nam dễ dàng tìm kiếm, so sánh và đăng ký các chương trình du học tại Mỹ, từ bước đầu tiên đến khi bạn sẵn sàng cho cuộc sống học thuật mới.</p>
			        </div>
			      </div>
			    </div>
			    <div className="row">
			      <div className="col-lg-3 col-md-6">
			        <div className="single-intro-inner style-icon-bg bg-gray text-center">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/icon/12.png"} alt="img" />
			            <div className="intro-count">1</div>
			          </div>
			          <div className="details">
			            <h5>Đăng Ký</h5>
			            <p>Đăng ký tài khoản để bắt đầu quá trình tìm kiếm và so sánh các chương trình du học phù hợp với bạn.</p>
			            <Link className="read-more-text" to="/contact">Xem Thêm <i className="fa fa-angle-right" /></Link>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-3 col-md-6">
			        <div className="single-intro-inner style-icon-bg bg-gray text-center">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/icon/13.png"} alt="img" />
			            <div className="intro-count">2</div>
			          </div>
			          <div className="details">
			            <h5>Chọn Chương Trình</h5>
			            <p>Khám phá và so sánh các chương trình để tìm ra lựa chọn du học tốt nhất dành cho bạn.</p>
			            <Link className="read-more-text" to="/program">Xem Thêm <i className="fa fa-angle-right" /></Link>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-3 col-md-6">
			        <div className="single-intro-inner style-icon-bg bg-gray text-center">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/icon/14.png"} alt="img" />
			            <div className="intro-count">3</div>
			          </div>
			          <div className="details">
			            <h5>Bắt Đầu Học</h5>
			            <p>Đăng ký chương trình và bắt đầu hành trình du học của bạn với sự hỗ trợ từ đội ngũ chuyên gia của chúng tôi.</p>
			            <Link className="read-more-text" to="/program-details">Xem Thêm <i className="fa fa-angle-right" /></Link>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-3 col-md-6">
			        <div className="single-intro-inner style-icon-bg bg-gray text-center">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/icon/15.png"} alt="img" />
			            <div className="intro-count">4</div>
			          </div>
			          <div className="details">
			            <h5>Nhận Chứng Chỉ</h5>
			            <p>Hoàn thành chương trình và nhận chứng chỉ du học, mở ra cơ hội nghề nghiệp và phát triển cá nhân.</p>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default HowToWork