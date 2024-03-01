import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Team extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="team-area pd-top-110 go-top">
				  <div className="container-fluid pl-4 pr-4">
				    <div className="row justify-content-center">
				      <div className="col-xl-6 col-lg-7">
				        <div className="section-title text-center">
				          <h6 className="sub-title double-line">Gặp Gỡ Đội Ngũ Của Chúng Tôi</h6>
				          <h2 className="title">Đội Ngũ Tư Vấn Chuyên Nghiệp</h2>
				        </div>
				      </div>
				    </div>
				    <div className="team-slider owl-carousel">
				      <div className="item">
				        <div className="single-team-inner">
				          <div className="thumb">
				            <img src={publicUrl+"assets/img/team/1.png"} alt="img" />
				          </div>
				          <div className="details"> 
				            <h4><Link to="/instructor-details">Nguyễn Văn A</Link></h4>
				            <span>Chuyên Gia Tư Vấn Du Học Mỹ</span>
				          </div>  
				        </div>
				      </div>
				      <div className="item">
				        <div className="single-team-inner">
				          <div className="thumb">
				            <img src={publicUrl+"assets/img/team/2.png"} alt="img" />
				          </div>
				          <div className="details"> 
				            <h4><Link to="/instructor-details">Trần Thị B</Link></h4>
				            <span>Chuyên Viên Hỗ Trợ Học Bổng</span>
				          </div>  
				        </div>
				      </div>
				      <div className="item">
				        <div className="single-team-inner">
				          <div className="thumb">
				            <img src={publicUrl+"assets/img/team/3.png"} alt="img" />
				          </div>
				          <div className="details"> 
				            <h4><Link to="/instructor-details">Lê C</Link></h4>
				            <span>Chuyên Gia Xử Lý Hồ Sơ</span>
				          </div>  
				        </div>
				      </div>
				      <div className="item">
				        <div className="single-team-inner">
				          <div className="thumb">
				            <img src={publicUrl+"assets/img/team/4.png"} alt="img" />
				          </div>
				          <div className="details"> 
				            <h4><Link to="/instructor-details">Phạm D</Link></h4>
				            <span>Chuyên Viên Tư Vấn Visa</span>
				          </div>  
				        </div>
				      </div>
				      <div className="item">
				        <div className="single-team-inner">
				          <div className="thumb">
				            <img src={publicUrl+"assets/img/team/5.png"} alt="img" />
				          </div>
				          <div className="details"> 
				            <h4><Link to="/instructor-details">Đỗ E</Link></h4>
				            <span>Giáo Viên Tiếng Anh</span>
				          </div>  
				        </div>
				      </div>
				    </div>
				  </div>
				</div>

        }
}


export default Team