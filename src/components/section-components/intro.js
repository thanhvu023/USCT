import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Intro extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="intro-area intro-area--top">
			  <div className="container">
			    <div className="intro-area-inner intro-home-1 bg-black">
			      <div className="row no-gutters">
			        <div className="col-lg-4 text-lg-left text-center">
			          <div className="intro-title">
					  <h3>Hệ thống Du học Mỹ</h3>
					  <p>Khai phá tiềm năng và kết nối bạn với tương lai thông qua giáo dục tại Mỹ.</p>
			            <ul>
						<li><i className="fa fa-check" /> Thông tin chính xác và cập nhật</li>
						<li><i className="fa fa-check" /> Tư vấn chọn trường và chương trình</li>
						<li><i className="fa fa-check" /> Hỗ trợ quá trình ứng tuyển</li>

			            </ul>
			          </div>
			        </div>
			        <div className="col-lg-8 align-self-center">
			          <ul className="row no-gutters">
			            <li className="col-md-4">
			              <div className="single-intro-inner style-white text-center">
			                <div className="thumb"
							>
			                  <img src={publicUrl+"assets/img/intro/1.png"} alt="img"   />
			                </div>
			                <div className="details">
							<h5>Cử nhân</h5>
							<p>Chọn từ nhiều ngành học và trường danh tiếng</p>
			                </div>
			              </div>
			            </li>
			            <li className="col-md-4">
			              <div className="single-intro-inner style-white text-center">
			                <div className="thumb">
			                  <img src={publicUrl+"assets/img/intro/2.png"} alt="img" />
			                </div>
			                <div className="details">
							<h5>Sau Đại học</h5>
							<p>Chương trình thạc sĩ và tiến sĩ trong nhiều lĩnh vực</p>
			                </div>
			              </div>
			            </li>
			            <li className="col-md-4">
			              <div className="single-intro-inner style-white text-center">
			                <div className="thumb">
			                  <img src={publicUrl+"assets/img/intro/3.png"} alt="img" />
			                </div>
			                <div className="details">
							<h5>Ngắn hạn & Hè</h5>
							<p>Các khóa học ngắn hạn, trại hè và trải nghiệm văn hóa</p>
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

export default Intro