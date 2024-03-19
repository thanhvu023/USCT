import React, { Fragment } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from 'react-select';

// import styles



//** Import Image */
//** Import Image */



import PageTitle from "./PageTitle";

const options = [
    { value: 'basic_english', label: 'Tiếng Anh cơ bản' },
    { value: 'ielts', label: 'IELTS' },
    { value: 'toefl', label: 'TOEFL' },
    { value: 'toeic', label: 'TOEIC' },
    { value: 'esol', label: 'ESOL' }
];

const AppProfile = () => {
	let publicUrl = process.env.PUBLIC_URL + "/";

    return (
        <Fragment>
            <PageTitle activeMenu="Profile" motherMenu="App" />
			<div className="page-titles mx-0">
            <div className="row">
                <div className="col-lg-12 ">
                    <div className="profile card card-body px-3 pt-3 pb-0">
                        <div className="profile-head">
                            <div className="photo-content ">
                                <div className="cover-photo rounded bg-red">

								</div>
                            </div>
                            <div className="profile-info d-flex">
                                <div className="profile-photo mt-1">
								<img src={publicUrl + "assets/img/author/pic2.jpg"} alt="img" 
                            className="bg-info rounded-circle mb-4 "
                            style={{width:"100px"}}
                  />                                </div>
                                <div className="profile-details d-flex">
                                    <div className="profile-name px-3 pt-2">
                                        <h4 className="text-primary mb-0">Lê Minh A</h4>
                                        <p>Khách hàng</p>
                                    </div>
                                    <div className="profile-email px-2 pt-2">
                                        <h4 className="text-muted mb-0">hello@email.com</h4>
                                        <p>Email</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="gray-overlay"></div>
            </div>
            <div className="row">
                <div className="col-xl-4">
                    <div className="row">
                        <div className="col-lg-12">

                        </div>
                        <div className="col-lg-12">

                        </div>
                        <div className="col-lg-12">

                        </div>
                        <div className="col-lg-12">

                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-tab">
                                <div className="custom-tab-1">
                                    <Tab.Container defaultActiveKey='About'>
                                        <Nav as='ul' className="nav nav-tabs">
                                            <Nav.Item as='li' className="nav-item">
                                                <Nav.Link to="#about-me" eventKey='About'>Hồ sơ khách hàng</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as='li' className="nav-item">
                                                <Nav.Link to="#profile-settings" eventKey='Setting'>Chỉnh sửa thông tin khách hàng</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane id="about-me" eventKey='About'>
                                                <div className="profile-about-me">
                                                    <div className="pt-4 border-bottom-1 pb-3">
                                                        <h4 className="text-primary">Tóm tắt bản thân</h4>
                                                        <p className="mb-2">
                                                            A wonderful serenity has taken possession of my
                                                            entire soul, like these sweet mornings of spring
                                                            which I enjoy with my whole heart. I am alone, and
                                                            feel the charm of existence was created for the
                                                            bliss of souls like mine.I am so happy, my dear
                                                            friend, so absorbed in the exquisite sense of mere
                                                            tranquil existence, that I neglect my talents.
                                                        </p>
                                                        <p>
                                                            A collection of textile samples lay spread out on
                                                            the table - Samsa was a travelling salesman - and
                                                            above it there hung a picture that he had recently
                                                            cut out of an illustrated magazine and housed in a
                                                            nice, gilded frame.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="profile-personal-info">
                                                    <h4 className="text-primary mb-4">
                                                        Thông Tin Cá Nhân
                                                    </h4>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500"> Mã KH<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>048321842</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500">Họ và Tên<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>HTV</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>example@examplel.com</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500">Giới tính<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>Nam</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500">Ngày sinh<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>27/05/2001</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500">Địa chỉ<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>Rosemont Avenue Melbourne, Florida</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-3">
                                                            <h5 className="f-w-500">Số điện thoại<span className="pull-right">:</span></h5>
                                                        </div>
                                                        <div className="col-9">
                                                            <span>090909090909</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane id="profile-settings" eventKey='Setting'>
                                                <div className="pt-3">
                                                    <div className="settings-form">
                                                        <h4 className="text-primary">Chỉnh sửa thông tin </h4>
                                                        <form onSubmit={(e) => e.preventDefault()}>
                                                            <div className="row">
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">Họ và tên</label>
                                                                    <input type="text" placeholder="Họ và tên" className="form-control" />
                                                                </div>
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">Email</label>
                                                                    <input type="email" placeholder="Email" className="form-control" />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">Mật khẩu</label>
                                                                    <input type="password" placeholder="Password" className="form-control" />
                                                                </div>
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">Giới tính</label>
                                                                    <select className="form-control">
                                                                        <option>Chọn...</option>
                                                                        <option>Nam</option>
                                                                        <option>Nữ</option>
                                                                        <option>Khác</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">Ngày sinh</label>
                                                                    <input type="date" className="form-control" />
                                                                </div>
                                                                <div className="form-group mb-3 col-md-6">
                                                                    <label className="form-label">Số điện thoại</label>
                                                                    <input type="tel" placeholder="Số điện thoại" className="form-control" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label className="form-label">Địa chỉ</label>
                                                                <input type="text" placeholder="Địa chỉ" className="form-control" />
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label className="form-label">Địa chỉ 2</label>
                                                                <input type="text" placeholder="Apartment, studio, or floor" className="form-control" />
                                                            </div>
                                                            <div className="row">
                                                                <div className="form-group mb-3 col-md-8">
                                                                    <label className="form-label">Về bản thân</label>
                                                                    <textarea className="form-control" rows="4"></textarea>
                                                                </div>
                                                                <div className="form-group mb-3 col-md-4">
                                                                    <label className="form-label">Chứng chỉ tiếng Anh</label>
                                                                    <Select options={options}
                                                                        className="basic-multi-select"
                                                                        isMulti
                                                                        classNamePrefix="select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <div className="form-check custom-checkbox">
                                                                    <input type="checkbox" className="form-check-input" id="gridCheck" />
                                                                    <label className="form-check-label" htmlFor="gridCheck">Kiểm tra trước khi cập nhật</label>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary" type="submit">Cập nhật</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<div className="gray-overlay"></div>
			</div>
        </Fragment>
    );
};

export default AppProfile;
