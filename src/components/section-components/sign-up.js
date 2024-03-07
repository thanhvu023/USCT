import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class SignUP extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="signup-page-area pd-top-120 pd-bottom-120">
			  <div className="container">
			    <div className="row justify-content-center">
			      <div className="col-xl-6 col-lg-7">
			        <form className="signin-inner">
			          <div className="row">
			            <div className="col-12">
			              <div className="single-input-inner style-bg-border">
			                <input type="text" placeholder="Họ và tên" />
			              </div>
			            </div>
			            <div className="col-12">
			              <div className="single-input-inner style-bg-border">
			                <input type="text" placeholder="Số CCCD" />
			              </div>
			            </div>
			            <div className="col-12">
			              <div className="single-input-inner style-bg-border">
			                <input type="text" placeholder="Email" />
			              </div>
			            </div>
			            <div className="col-12">
			              <div className="single-input-inner style-bg-border">
			                <input type="text" placeholder="Mật khẩu" />
			              </div>
			            </div>
			            <div className="col-12">
			              <div className="single-input-inner style-bg-border">
			                <input type="text" placeholder="Xác nhận mật khẩu" />
			              </div>
			            </div>
			            <div className="col-12 mb-4">
			              <button className="btn btn-base w-100">Tạo tài khoản</button>
			            </div>
			            <div className="col-12">
			              <span>Đã có tài khoản trước đó?</span>
			              <a className="ml-2" href="signin.html"><strong>Đăng nhập</strong></a>
			            </div>
			          </div>
			        </form>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default SignUP