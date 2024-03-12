import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ContactPage extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div>
			 <div className="contact-list pd-top-120 pd-bottom-90">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <div className="contact-list-inner">
            <div className="media">
              <div className="media-left">
                <img src={publicUrl+"assets/img/icon/17.png"} alt="img" />
              </div>
              <div className="media-body align-self-center">
                <h5>Số Điện Thoại</h5>
                <p>000 2324 39493</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="contact-list-inner">
            <div className="media">
              <div className="media-left">
                <img src={publicUrl+"assets/img/icon/18.png"} alt="img" />
              </div>
              <div className="media-body align-self-center">
                <h5>Email Của Chúng Tôi</h5>
                <p>name@website.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="contact-list-inner">
            <div className="media">
              <div className="media-left">
                <img src={publicUrl+"assets/img/icon/16.png"} alt="img" />
              </div>
              <div className="media-body align-self-center">
                <h5>Địa Chỉ Của Chúng Tôi</h5>
                <p>2 St, Loskia, amukara.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
			  {/* counter area start */}
			  <div className="counter-area pd-bottom-120">
    <div className="container">
        <div className="row">
            <div className="col-lg-4">
                <div className="section-title mb-0">
                    <h6 className="sub-title right-line">Trang Tư Vấn Đăng Ký Chương Trình Du Học</h6>
                    <h2 className="title">Write Us a Message</h2>
                    <p className="content pb-3">Vui lòng điền đầy đủ thông tin</p>
                   
                </div>
            </div>
            <div className="col-lg-8 mt-5 mt-lg-0">
                <form className="contact-form-inner  mt-5 mt-md-0">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="text" placeholder="Họ" name="firstName" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="text" placeholder="Tên" name="lastName" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <div className="custom-select">
                                    <select name="gender">
                                        <option value="">Giới tính</option>
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="date" placeholder="Ngày sinh (dd/mm/yyyy)" name="dob" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="text" placeholder="Địa chỉ" name="address" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="text" placeholder="Số điện thoại" name="phone" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="email" placeholder="Email" name="email" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="text" placeholder="Khu vực" name="area" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="single-input-inner style-bg-border">
                                <textarea placeholder="Thông tin thêm" defaultValue={""} name="additionalInformation" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="single-input-inner style-bg-border">
                                <textarea placeholder="Lý do đi du học" defaultValue={""} name="studyAbroadReason" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="single-input-inner style-bg-border">
                                <textarea placeholder="Lý do chọn đích đến" defaultValue={""} name="destinationReason" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <div className="custom-select">
                                    <select name="priorityOfStudyAbroad">
                                        <option value="">Ưu tiên khi đi du học</option>
                                        <option value="quality">Chất lượng giáo dục</option>
                                        <option value="career">Cơ hội nghề nghiệp</option>
                                        <option value="culture">Trải nghiệm văn hóa</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <div className="custom-select">
                                    <select name="budget">
                                        <option value="">Ngân sách</option>
                                        <option value="economy">Tiết kiệm</option>
                                        <option value="moderate">Vừa phải</option>
                                        <option value="luxury">Cao cấp</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-base">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>



			  {/* counter area end */}
			  {/* contact area start */}
			  <div className="contact-g-map">
			    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d29208.601361499546!2d90.3598076!3d23.7803374!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1589109092857!5m2!1sen!2sbd" />
			  </div>
			</div>

        }
}

export default ContactPage