import React, { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";

// import styles



//** Import Image */
//** Import Image */



import PageTitle from "./PageTitle";

const AppProfile = () => {
	let publicUrl = process.env.PUBLIC_URL + "/";

    return (
        <Fragment>
        <PageTitle activeMenu="Profile" motherMenu="App" />
        <div className="bc-grey">
        <div className="row mb-5 mr-0 ml-0 border-0">
        <div className="col-lg-12 mt-12">
                <div className="profile card card-body px-3 pt-3 pb-0 border rounded">
                    <div className="profile-head">
                        <div className="photo-content ">
                            <div className="cover-photo rounded">
                            </div>
                        </div>
                        <div className="profile-info d-flex">
                            <div className="profile-photo ">
                            <img src={publicUrl + "assets/img/author/pic2.jpg"} alt="img" 
                        className="bg-info rounded-circle mb-4 "
                        style={{width:"100px",
                                height:'100px'
                    }}
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
        </div>
        <div className="row mb-5">
            <div className="col-xl-8 mx-auto">
                <div className="card">
                <div className="inner-content">
                <div className="card-body">
                        <div className="profile-tab">
                            <div className="custom-tab-1">
                                <Tab.Container defaultActiveKey='About'>
                                    <Nav as='ul' className="nav nav-tabs">
                                        <Nav.Item as='li' className="nav-item">
                                      
                                            <Nav.Link to="#about-me" eventKey='About'> 
                                            <span className="d-flex align-items-center">
                                            <i className="la la-user me-2" style={{fontWeight: 'bold'}}></i>
                    <strong style={{fontSize: '1.2rem'}}>Hồ sơ khách hàng</strong>
                </span>
                                                 </Nav.Link>
                                         
                                              
                                        </Nav.Item>
                                        <Nav.Item as='li' className="nav-item">
                                            <Nav.Link to="#profile-settings" eventKey='Setting'>

                                            <span className="d-flex align-items-center">
                    <i className="la la-edit me-2 mr-2" style={{fontWeight: 'bold'}}></i>
                    <strong style={{fontSize: '1.2rem'}}>Chỉnh sửa hồ sơ</strong>
                </span>
                                            </Nav.Link>
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
    <h4 className="text-primary mb-4">Thông Tin Cá Nhân</h4>
    <div className="row mb-2">
    <div className="col-2">
            <h5 className="f-w-200"> Mã KH<span className="pull-right">:</span></h5>
        </div>
        <div className="col-9 d-flex align-items-center">
            <span>048321842</span>
        </div>
    </div>
    <div className="row mb-2">
        <div className="col-2">
            <h5 className="f-w-500">Họ và Tên<span className="pull-right">:</span></h5>
        </div>
        <div className="col-9 d-flex align-items-center">
            <span>HTV</span>
        </div>
    </div>
    <div className="row mb-2">
    <div className="col-2">
            <h5 className="f-w-500"> Căn cước công dân<span className="pull-right">:</span></h5>
        </div>
        <div className="col-9 d-flex align-items-center">
            <span>4890327148921</span>
        </div>
    </div>
    <div className="row mb-2">
    <div className="col-2">
            <h5 className="f-w-500">Giới tính<span className="pull-right">:</span></h5>
        </div>
        <div className="col-9 d-flex align-items-center">
            <span>Nam</span>
        </div>
    </div>
    <div className="row mb-2">
    <div className="col-2">
            <h5 className="f-w-500">Ngày sinh<span className="pull-right">:</span></h5>
        </div>
        <div className="col-9 d-flex align-items-center">
            <span>27/05/2001</span>
        </div>
    </div>
    <div className="row mb-2">
    <div className="col-2">
            <h5 className="f-w-500">Địa chỉ<span className="pull-right">:</span></h5>
        </div>
        <div className="col-9 d-flex align-items-center">
            <span>Rosemont Avenue Melbourne, Florida</span>
        </div>
    </div>
    <div className="row mb-2">
    <div className="col-2">
            <h5 className="f-w-500">Số điện thoại<span className="pull-right">:</span></h5>
        </div>
        <div className="col-5 d-flex align-items-center">
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
                                                                <label className="form-label">Số căn cước công dân</label>
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
                                                        {/* <div className="form-group mb-3">
                                                            <label className="form-label">ID Quốc gia</label>
                                                            <input type="text" placeholder="Địa chỉ" className="form-control" />
                                                        </div> */}
                                                        <div className="form-group mb-3">
                                                            <label className="form-label">Địa chỉ </label>
                                                            <input type="text" placeholder="Apartment, studio, or floor" className="form-control" />
                                                        </div>
                                                        <div className="row">
                                                            <div className="form-group mb-3 col-md-12">
                                                                <label className="form-label">Về bản thân</label>
                                                                <textarea className="form-control" rows="4"></textarea>
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
        </div>
        </div>
       
        
    </Fragment>
    );
};

export default AppProfile;
