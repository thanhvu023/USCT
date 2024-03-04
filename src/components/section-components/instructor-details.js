import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class InstructorDetails extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="main-blog-area pd-top-120 pd-bottom-90">
			  <div className="container">
			    <div className="team-details-page">
			      <div className="row">
			        <div className="col-lg-5">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/team/6.png"} alt="img" />
			          </div>
			        </div>
			        <div className="col-lg-7 align-self-center mt-5 mt-lg-0">
			          <div className="details">
			            <h3>Tên Trường Đại Học</h3>
			            <span className="designation">National University</span>
			            <span className="designation">Bang: California, Hoa Kỳ</span>
			            <p className="mt-4">Mô tả về trường đại học. Mô tả này có thể được hiển thị bằng cách sử dụng thẻ .</p>
			          </div>
			        </div>
			      </div>
			      <div className="details-inner mt-4 pt-xl-3">
			        <span>Mô tả về trường đại học tiếp tục ở đây.</span>
			        <p className="mt-3">Thông tin chi tiết về trường đại học và các chương trình chính có thể được mô tả ở đây. Đây có thể là một đoạn văn miêu tả chi tiết về mục tiêu, phương pháp giảng dạy, cơ sở vật chất, vị trí, và nhiều hơn nữa.</p>
			      </div>
			    </div>
			    <div className="course-area pd-top-90">
			      <h4 className="mb-4">Các Chuyên Ngành Chính</h4>
			      <div className="row">
			        <div className="col-lg-4 col-md-6">
			          <div className="single-course-inner">
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/course/1.png"} alt="img" />
			            </div>
			            <div className="details">
			              <div className="details-inner">
			                <h6 className="go-top">Tên Chuyên Ngành 1</h6>
			              </div>
			              <div className="emt-course-meta">
			                <div className="price text-right">
			                      Mã Chuyên Ngành: <span>MAJOR01</span>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			        <div className="col-lg-4 col-md-6">
			          <div className="single-course-inner">
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/course/2.png"} alt="img" />
			            </div>
			            <div className="details">
			              <div className="details-inner">
			                <h6 className="go-top">Tên Chuyên Ngành 2</h6>
			              </div>
			              <div className="emt-course-meta">
			                <div className="price text-right">
			                      Mã Chuyên Ngành: <span>MAJOR02</span>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			        <div className="col-lg-4 col-md-6">
			          <div className="single-course-inner">
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/course/3.png"} alt="img" />
			            </div>
			            <div className="details">
			              <div className="details-inner">
			                <h6 className="go-top">Tên Chuyên Ngành 3</h6>
			              </div>
			              <div className="emt-course-meta">
			                <div className="price text-right">
			                      Mã Chuyên Ngành: <span>MAJOR03</span>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>

        }
}

export default InstructorDetails
