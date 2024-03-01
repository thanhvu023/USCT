import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class IntroV2 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="intro-area intro-area--top">
			  <div className="container">
			    <div className="intro-area-inner-2">
			      <div className="row justify-content-center">
			        <div className="col-lg-6">
			          <div className="section-title text-center">
			            <h6 className="sub-title double-line">FEATURES</h6>
			            <h2 className="title">An exemplary <br /> learning community</h2>
			          </div>
			        </div>
			      </div>
			      <div className="row">
			        <div className="col-md-4">
			          <div className="single-intro-inner style-thumb text-center">
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/intro/4.png"} alt="img" />
			            </div>
			            <div className="details">
			              <h5>Postgraduate</h5>
			              <p>Lorem ipsum dolor</p>
			            </div>
			          </div>
			        </div>
			        <div className="col-md-4">
			          <div className="single-intro-inner style-thumb text-center">
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/intro/5.png"} alt="img" />
			            </div>
			            <div className="details">
			              <h5>Postgraduate</h5>
			              <p>Lorem ipsum dolor</p>
			            </div>
			          </div>
			        </div>
			        <div className="col-md-4">
			          <div className="single-intro-inner style-thumb text-center">
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/intro/6.png"} alt="img" />
			            </div>
			            <div className="details">
			              <h5>Postgraduate</h5>
			              <p>Lorem ipsum dolor</p>
			            </div>
			          </div>
			        </div>
			      </div>
			      <div className="intro-footer bg-base">
			        <div className="row">
			          <div className="col-md-4">
			            <div className="single-list-inner">
			              <div className="media">
			                <div className="media-left">
			                  <img src={publicUrl+"assets/img/icon/19.png"} alt="img" />
			                </div>
			                <div className="media-body align-self-center">
			                  <h5>Engineering</h5>
			                  <p>Lorem ipsum dolor</p>
			                </div>
			              </div>
			            </div>
			          </div>
			          <div className="col-md-4">
			            <div className="single-list-inner">
			              <div className="media">
			                <div className="media-left">
			                  <img src={publicUrl+"assets/img/icon/20.png"} alt="img" />
			                </div>
			                <div className="media-body align-self-center">
			                  <h5>PHD Scholarship</h5>
			                  <p>Lorem ipsum dolor</p>
			                </div>
			              </div>
			            </div>
			          </div>
			          <div className="col-md-4">
			            <div className="single-list-inner">
			              <div className="media">
			                <div className="media-left">
			                  <img src={publicUrl+"assets/img/icon/21.png"} alt="img" />
			                </div>
			                <div className="media-body align-self-center">
			                  <h5>Accounting</h5>
			                  <p>Lorem ipsum dolor</p>
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

export default IntroV2