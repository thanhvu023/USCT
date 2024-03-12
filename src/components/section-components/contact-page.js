import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const ContactPage = () => {
    const [select, setSelect] = useState('');

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    const stateOptions = [
        { value: 'north', label: 'Miền Bắc' },
        { value: 'central', label: 'Miền Trung' },
        { value: 'south', label: 'Miền Nam' },
    ];
    const genderOptions = [
        { value: '1', label: 'Nam' },
        { value: '2', label: 'Nữ' },
        { value: '3', label: 'Gioi tính khác' },
    ];
    
    const reasonGOptions = [
        { value: '1', label: 'Giao dục ' },
        { value: '2', label: 'Cơ hội nghề nghiệp' },
        { value: '3', label: 'Văn hóa' },
    ];
    
    const feeOptions = [
        { value: '1', label: 'Tiết kiệm' },
        { value: '2', label: 'Vừa phải' },
        { value: '3', label: 'Cao cấp' },
    ];
    const reasonUOptions = [
        { value: '1', label: 'Giao dục ' },
        { value: '2', label: 'Cơ hội nghề nghiệp' },
        { value: '3', label: 'Trải nghiệm mới' },
    ];
    
    
        let publicUrl = process.env.PUBLIC_URL+'/';

    return  (
    <div>
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
                        <Select
    value={genderOptions.find(option => option.value === select)}
    onChange={handleChange}
    options={genderOptions}
    placeholder="Chọn giới tính"
/>
                        </div>
                        <div className="col-lg-6">
                            <div className="single-input-inner style-bg-border">
                                <input type="text" placeholder="Ngày sinh (dd/mm/yyyy)" name="dob" />
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
                        <Select
    value={stateOptions.find(option => option.value === select)}
    onChange={handleChange}
    options={stateOptions}
    placeholder="Chọn khu vực"
/>
                                        </div>
                        <div className="col-12">
                            <div className="single-input-inner style-bg-border">
                                <textarea placeholder="Thông tin thêm" defaultValue={""} name="additionalInformation" />
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                        <Select
    value={reasonGOptions.find(option => option.value === select)}
    onChange={handleChange}
    options={reasonGOptions}
    placeholder="Chọn lý do du học"
   
/>
                                        </div>
                                        <div className="col-12 mb-4">
                                        <Select
    value={reasonUOptions.find(option => option.value === select)}
    onChange={handleChange}
    options={reasonUOptions}
    placeholder="Chọn lý do đích đến"
/>
                                        </div>
                        <div className="col-lg-6">
                        <Select
    value={reasonUOptions.find(option => option.value === select)}
    onChange={handleChange}
    options={reasonUOptions}
    placeholder="Chọn ưu tiên khi đi du học"
/>
                        </div>
                        <div className="col-lg-6 mb-2">
                        <Select
    value={feeOptions.find(option => option.value === select)}
    onChange={handleChange}
    options={feeOptions}
    placeholder="Ngân sách"
/>
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
    )

        }


export default ContactPage