import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Funfact extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="counter-area bg-gray">
			  <div className="container">
			    <div className="counter-area-inner pd-top-120 pd-bottom-120" style={{backgroundImage: 'url("'+publicUrl+'assets/img/other/1.png")'}}>
			      <div className="row">
			        <div className="col-lg-8 mb-5 mb-lg-0">
			          <div className="section-title mb-0">
			            <h6 className="sub-title right-line">Cơ Hội Du Học</h6>
			            <h2 className="title">Tương Lai Rộng Mở</h2>
			            <p className="content pb-3">Khám phá cơ hội du học tại Mỹ với hệ thống quản lý chuyên nghiệp, cung cấp thông tin đầy đủ và kết nối học sinh Việt Nam với các chương trình du học hàng đầu. Mở rộng tầm nhìn, đạt được ước mơ học tập và phát triển bản thân tại một trong những quốc gia giáo dục hàng đầu thế giới.</p>
			            <div className="btn-counter bg-base mt-4">
			              <h3 className="left-val align-self-center"><span className="counter">5.6</span>k+</h3>
			              <div className="right-val align-self-center">
			                Học Sinh <br /> Thành Công
			              </div>
			            </div>
			          </div>
			        </div>
			        <div className="col-lg-4 align-self-center">
			          <ul className="single-list-wrap">
			            <li className="single-list-inner style-box-bg">
			              <div className="media">
			                <div className="media-left">
			                  <img src={publicUrl+"assets/img/icon/1.png"} alt="img" />
			                </div>
			                <div className="media-body align-self-center">
			                  <h5><span className="counter">2000</span>+</h5>
			                  <p>Học Sinh Đang Học</p>
			                </div>
			              </div>
			            </li>
			            <li className="single-list-inner style-box-bg">
			              <div className="media">
			                <div className="media-left">
			                  <img src={publicUrl+"assets/img/icon/2.png"} alt="img" />
			                </div>
			                <div className="media-body align-self-center">
			                  <h5><span className="counter">450</span>+</h5>
			                  <p>Số Khóa Học Được Cung Cấp</p>
			                </div>
			              </div>
			            </li>
			            <li className="single-list-inner style-box-bg">
			              <div className="media">
			                <div className="media-left">
			                  <img src={publicUrl+"assets/img/icon/3.png"} alt="img" />
			                </div>
			                <div className="media-body align-self-center">
			                  <h5><span className="counter">1600</span>+</h5>
			                  <p>Học Sinh Thành Công</p>
			                </div>
			              </div>
			            </li>
			          </ul>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}


export default Funfact