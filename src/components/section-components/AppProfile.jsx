import React, { Fragment, useReducer } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from 'react-select';

// import styles



//** Import Image */
//** Import Image */


// import profile from "../../../assets/images/profile/profile.png";

import PageTitle from "./PageTitle";


const initialState = false;
const reducer = (state, action) =>{
	switch (action.type){
		case 'sendMessage':
			return { ...state, sendMessage: !state.sendMessage }		
		case 'postModal':
			return { ...state, post: !state.post }
		case 'linkModal':
			return { ...state, link: !state.link }		
		case 'cameraModal':
			return { ...state, camera: !state.camera }		
		case 'replyModal':
			return { ...state, reply: !state.reply }
		default:
			return state	
	}	
}
const options = [
    { value: 'basic_english', label: 'Tiếng Anh cơ bản' },
    { value: 'ielts', label: 'IELTS' },
    { value: 'toefl', label: 'TOEFL' },
    { value: 'toeic', label: 'TOEIC' },
    { value: 'esol', label: 'ESOL' }
];
const AppProfile = () => {

	let publicUrl = process.env.PUBLIC_URL + "/";

	const onInit = () => {
		//console.log('lightGallery has been initialized');
	};
  	// const options = {
    //  	settings: {
	// 		overlayColor: "#000000",
    //  	},
 	// };
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Fragment>
		  <PageTitle activeMenu="Profile" motherMenu="App" />	
		  <div className="row">
			<div className="col-lg-12">
			  <div className="profile card card-body px-3 pt-3 pb-0">
				<div className="profile-head">
				  <div className="photo-content ">
					<div className="cover-photo rounded"></div>
				  </div>
				  <div className="profile-info">
					<div className="profile-photo">
					<img className="img-fluid rounded-circle " src={publicUrl + "assets/img/logo.png"} alt="img" />
		
					</div>
					<div className="profile-details">
					  <div className="profile-name px-3 pt-2">
						<h4 className="text-primary mb-0">Lê Minh A</h4>
						<p>Admin</p>
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
								{/* <Nav.Item as='li' className="nav-item">
									<Nav.Link to="#my-posts" eventKey='Posts'>Posts</Nav.Link>
								</Nav.Item> */}
								<Nav.Item as='li' className="nav-item">
									<Nav.Link to="#about-me"  eventKey='About'>Hồ sơ khách hàng</Nav.Link>
								</Nav.Item>
								<Nav.Item as='li' className="nav-item">
									<Nav.Link to="#profile-settings" eventKey='Setting'>Cập nhật thông tin</Nav.Link>
								</Nav.Item>
							</Nav>
							<Tab.Content>
								<Tab.Pane id="my-posts"  eventKey='Posts'>
									<div className="my-post-content pt-3">
										<div className="post-input">
												<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control bg-transparent" placeholder="Please type what you want...."defaultValue={""}/>
												<Link to="/app-profile" className="btn btn-primary light px-3 me-1"  onClick={() => dispatch({type:'linkModal'})}>
													<i className="fa fa-link m-0" />{" "}
												</Link>
											{/* Modal */}
											
											<Link to={"#"} className="btn btn-primary light px-3 me-1"  data-target="#cameraModal" onClick={() => dispatch({type:'cameraModal'})}>
												<i className="fa fa-camera m-0" />{" "}
											</Link>
											{/* Modal */}
											
											<Link to={"#"} className="btn btn-primary ms-1" data-target="#postModal" onClick={() => dispatch({type:'postModal'})}>Post</Link>
											{/* Modal */}
											
										</div>
	
										<div className="profile-uoloaded-post border-bottom-1 pb-5">
											<img src={''} alt="" className="img-fluid w-100 rounded" />
											<Link className="post-title" to="/post-details">
												<h3 >How To Get (A) Fabulous EDUCATION On A Tight Budget</h3>
											</Link>
											<p>
												A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take 
												possession of my entire soul like these sweet morning of spare which enjoy whole heart.
											</p>
											<button className="btn btn-primary me-2">
												<span className="me-2"> <i className="fa fa-heart" /> </span>Like 
											</button>
											<button className="btn btn-secondary" onClick={() => dispatch({type:'replyModal'})}>
												<span className="me-2"> <i className="fa fa-reply" /></span>Reply
											</button>
										</div>
										<div className="profile-uoloaded-post border-bottom-1 pb-5">
											<img src={''} alt="" className="img-fluid w-100 rounded" />
											<Link className="post-title" to="/post-details">
												<h3 >How To Win Clients And Influence Markets with EDUCATION</h3>
											</Link>
											<p>
												A wonderful serenity has take possession of my
												entire soul like these sweet morning of spare which
												enjoy whole heart.A wonderful serenity has take
												possession of my entire soul like these sweet
												morning of spare which enjoy whole heart.
											</p>
											<button className="btn btn-primary me-2">
												<span className="me-2"> <i className="fa fa-heart" /> </span>Like
											</button>
											<button className="btn btn-secondary" onClick={() => dispatch({type:'replyModal'})}>
												<span className="me-2">  <i className="fa fa-reply" /></span>Reply
											</button>
										</div>
										<div className="profile-uoloaded-post pb-3">
											<img src={''} alt="" className="img-fluid  w-100 rounded" />
											<Link className="post-title" to="/post-details">
												<h3 >What Can Instagramm Teach You About EDUCATION</h3>
											</Link>
											<p>
												A wonderful serenity has take possession of my
												entire soul like these sweet morning of spare which
												enjoy whole heart.A wonderful serenity has take
												possession of my entire soul like these sweet
												morning of spare which enjoy whole heart.
											</p>
											<button className="btn btn-primary me-2">
												<span className="me-2"><i className="fa fa-heart" /></span>Like
											</button>
											<button className="btn btn-secondary" onClick={() => dispatch({type:'replyModal'})}>
												<span className="me-2"> <i className="fa fa-reply" /></span>Reply
											</button>
										</div>
										
									</div>
								</Tab.Pane>
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
									{/* <div className="profile-skills mb-5">
										<h4 className="text-primary mb-2">Trình độ tiếng anh</h4>
										<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1"> Admin</Link>
										<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1" > Dashboard</Link>
										<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Photoshop</Link>
										<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Bootstrap</Link>
										<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Responsive</Link>
										<Link to="/app-profile" className="btn btn-primary light btn-xs mb-1 me-1">Crypto</Link>
									</div>
									<div className="profile-lang  mb-5">
										<h4 className="text-primary mb-2">Language</h4>
										<Link to="/app-profile" className="text-muted pe-3 f-s-16">
											<i className="flag-icon flag-icon-us" />English
										</Link>
										<Link to="/app-profile" className="text-muted pe-3 f-s-16">
											<i className="flag-icon flag-icon-fr" />French
										</Link>
										<Link to="/app-profile" className="text-muted pe-3 f-s-16">
											<i className="flag-icon flag-icon-bd" />Bangla
										</Link>
									</div> */}
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
										<h4 className="text-primary">Profile Khách Hàng</h4>
	<form onSubmit={(e) => e.preventDefault()}>
		<div className="row">
			<div className="form-group mb-3 col-md-6">
				<label className="form-label">Họ và tên</label>
				<input type="text" placeholder="Họ và tên" className="form-control"/>
			</div>
			<div className="form-group mb-3 col-md-6">
				<label className="form-label">Email</label>
				<input type="email" placeholder="Email" className="form-control"/>
			</div>
		</div>
		<div className="row">
			<div className="form-group mb-3 col-md-6">
				<label className="form-label">Mật khẩu</label>
				<input type="password" placeholder="Password" className="form-control"/>
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
				<input type="date" className="form-control"/>
			</div>
			<div className="form-group mb-3 col-md-6">
				<label className="form-label">Số điện thoại</label>
				<input type="tel" placeholder="Số điện thoại" className="form-control"/>
			</div>
		</div>
		<div className="form-group mb-3">
			<label className="form-label">Địa chỉ</label>
			<input type="text" placeholder="Địa chỉ" className="form-control"/>
		</div>
		<div className="form-group mb-3">
			<label className="form-label">Địa chỉ 2</label>
			<input type="text" placeholder="Apartment, studio, or floor" className="form-control"/>
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
				<input type="checkbox" className="form-check-input" id="gridCheck"/>
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
		  {/* send Modal */}
		<Modal className="modal fade" show={state.sendMessage} onHide={()=>dispatch({type:'sendMessage'})} centered>				
			<div className="modal-header">
				<h5 className="modal-title">Send Message</h5>
				<Button variant="" type="button" className="btn-close"  onClick={() => dispatch({type:'sendMessage'})}></Button>
			</div>
			<div className="modal-body">
				<form className="comment-form" onSubmit={(e) => { e.preventDefault(); dispatch({type:'sendMessage'}); }}>
					<div className="row">
						<div className="col-lg-6">
							<div className="form-group mb-3">
								<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
								<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group mb-3">
								<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
								<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="form-group mb-3">
								<label htmlFor="comment" className="text-black font-w600">Comment</label>
								<textarea rows={4} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="form-group mb-3">
								<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
							</div>
						</div>
					</div>
				</form>
			</div>
			
		</Modal>
			{/* Post Modal */}
				<Modal show={state.post} className="modal fade" id="postModal" onHide={() => dispatch({type:'postModal'})} centered>				
					<div className="modal-header">
						<h5 className="modal-title">Post</h5>
						<Button variant=""  type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'postModal'})}  />
					</div>
					<div className="modal-body">
						<textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""}/>
						<Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
					</div>
				
			</Modal>
				{/* Link Modal */}
				<Modal show={state.link}  className="modal fade post-input" id="linkModal" onHide={() => dispatch({type:'linkModal'})} centered>				
					<div className="modal-header">
						<h5 className="modal-title">Social Links</h5>
						<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'linkModal'})}>
						</button>
					</div>
					<div className="modal-body">
						<Link className="btn-social me-1 facebook" to="/app-profile"><i className="fab fa-facebook-f" /></Link>
						<Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fab fa-google-plus" /></Link>
						<Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fab fa-linkedin" /></Link>
						<Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fab fa-instagram" /></Link>
						<Link className="btn-social me-1 twitter" to="/app-profile"><i className="fab fa-twitter" /></Link>
						<Link className="btn-social me-1 youtube" to="/app-profile"><i className="fab fa-youtube" /></Link>
						<Link className="btn-social whatsapp" to="/app-profile"><i className="fab fa-whatsapp" /></Link>
					</div>
				
			</Modal>
			 {/* Camera Modal */}
			  <Modal show={state.camera}  className="modal fade" id="cameraModal" onHide={() => dispatch({type:'cameraModal'})} centered>				
					<div className="modal-header">
						<h5 className="modal-title">Upload images</h5>
						<button type="button" className="btn-close" data-dismiss="modal" onClick={() => dispatch({type:'cameraModal'})}>
						</button>
					</div>
					<div className="modal-body">						
						<div className="input-group custom_file_input mb-3">
							<span className="input-group-text">Upload</span>
							<div className="form-file">
								<input type="file" className="form-file-input form-control" />
							</div>
						</div>
					</div>
				
			</Modal>
			 {/* Reply Modal */}
			  <Modal   show={state.reply}  className="modal fade" id="replyModal" onHide={()=>dispatch({type:'replyModal'})} centered>			
				<div className="modal-header">
					<h5 className="modal-title">Post Reply</h5>
					<button type="button" className="btn-close"  onClick={() => dispatch({type:'replyModal'})}></button>
				</div>
				<div className="modal-body">
					<form>
						<textarea className="form-control" rows="4" defaultValue={"Message"} />
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-danger light"  onClick={() => dispatch({type:'replyModal'})}>Close</button>
					<button type="button" className="btn btn-primary">Reply</button>
				</div>
				
			</Modal>
		</Fragment>
	  );
};

export default AppProfile;