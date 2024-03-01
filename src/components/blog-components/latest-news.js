import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LatestNews extends Component {
	render() {
	  let publicUrl = process.env.PUBLIC_URL+'/'
	  let imagealt = 'image'
	  return (
		<div className="blog-area pd-top-80 pd-bottom-90 go-top">
		  <div className="container">
			<div className="row justify-content-center">
			  <div className="col-xl-6 col-lg-7">
				<div className="section-title text-center">
				  <h6 className="sub-title double-line">Tin Tức Mới Nhất</h6>
				  <h2 className="title">Cập Nhật & Bài Viết</h2>
				</div>
			  </div>
			</div>
			<div className="row">
			  <div className="col-lg-4">
				<ul className="single-blog-list-wrap mb-5 mb-lg-0">
				  <li>
					<div className="media single-blog-list-inner">
					  <div className="media-left date">
						<span>JAN</span><br/>
						20
					  </div>
					  <div className="media-body details">
						<ul className="blog-meta">
						  <li><i className="fa fa-user" /> BY ADMIN</li>
						  <li><i className="fa fa-folder-open-o" /> Học Bổng</li>
						</ul>
						<h5><Link to="/blog-details">Cách Nhận Học Bổng Du Học Mỹ</Link></h5>
					  </div>
					</div>
				  </li>
				  <li>
					<div className="media single-blog-list-inner">
					  <div className="media-left date">
						<span>FEB</span><br/>
						26
					  </div>
					  <div className="media-body details">
						<ul className="blog-meta">
						  <li><i className="fa fa-user" /> BY ADMIN</li>
						  <li><i className="fa fa-folder-open-o" /> Kinh Nghiệm</li>
						</ul>
						<h5><Link to="/blog-details">5 Lời Khuyên Khi Đi Du Học Mỹ</Link></h5>
					  </div>
					</div>
				  </li>
				  <li>
					<div className="media single-blog-list-inner">
					  <div className="media-left date">
						<span>MAR</span><br/>
						15
					  </div>
					  <div className="media-body details">
						<ul className="blog-meta">
						  <li><i className="fa fa-user" /> BY ADMIN</li>
						  <li><i className="fa fa-folder-open-o" /> Chính Sách</li>
						</ul>
						<h5><Link to="/blog-details">Cập Nhật Chính Sách Visa Mới</Link></h5>
					  </div>
					</div>
				  </li>
				</ul>
			  </div>
			  <div className="col-lg-8">
				<div className="row justify-content-center">
				  <div className="col-md-6">
					<div className="single-blog-inner">
					  <div className="thumb">
						<img src={publicUrl+"assets/img/blog/1.png"} alt="img" />
						<span className="date">20 JANUARY, 2023</span>
					  </div>
					  <div className="details">
						<ul className="blog-meta">
						  <li><i className="fa fa-user" /> BY ADMIN</li>
						  <li><i className="fa fa-folder-open-o" /> Chuyện Thành Công</li>
						</ul>
						<h5><Link to="/blog-details">Câu Chuyện Du Học Mỹ: Từ Ước Mơ Đến Hiện Thực</Link></h5>
						<Link className="read-more-text" to="/blog-details">ĐỌC THÊM <i className="fa fa-angle-right" /></Link>
					  </div>
					</div>
				  </div>
				  <div className="col-md-6">
					<div className="single-blog-inner">
					  <div className="thumb">
						<img src={publicUrl+"assets/img/blog/2.png"} alt="img" />
						<span className="date">26 FEBRUARY, 2023</span>
					  </div>
					  <div className="details">
						<ul className="blog-meta">
						  <li><i className="fa fa-user" /> BY ADMIN</li>
						  <li><i className="fa fa-folder-open-o" /> Tư Vấn</li>
						</ul>
						<h5><Link to="/blog-details">Lựa Chọn Trường Đại Học Phù Hợp Tại Mỹ</Link></h5>
						<Link className="read-more-text" to="/blog-details">ĐỌC THÊM <i className="fa fa-angle-right" /></Link>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
  
	  )
	}
  }
  

export default LatestNews;
