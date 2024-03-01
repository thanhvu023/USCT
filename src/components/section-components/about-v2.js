import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV2 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

           let SectionClass = this.props.sectionclass ? this.props.sectionclass : ''

    return <div className={"about-area pd-top-120 go-top "+SectionClass}>
			  <div className="container">
			    <div className="about-area-inner">
			      <div className="row">
			        <div className="col-lg-6 col-md-10">
			          <div className="about-thumb-wrap after-shape" style={{backgroundImage: 'url("'+publicUrl+'assets/img/about/2.png")'}}>
			          </div>
			        </div>
			        <div className="col-lg-6">
			          <div className="about-inner-wrap">  
			            <div className="section-title mb-0">
			              <h6 className="sub-title right-line">ABOUT US</h6>
			              <h2 className="title">Education in continuing a proud tradition.</h2>
			              <p className="content">The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph,</p>
			              <div className="row">
			                <div className="col-sm-6">
			                  <ul className="single-list-wrap">
			                    <li className="single-list-inner style-check-box">
			                      <i className="fa fa-check" /> Metus interdum metus
			                    </li>
			                    <li className="single-list-inner style-check-box">
			                      <i className="fa fa-check" /> Ligula cur maecenas
			                    </li>
			                    <li className="single-list-inner style-check-box">
			                      <i className="fa fa-check" /> Fringilla nulla 
			                    </li>
			                  </ul>
			                </div>
			                <div className="col-sm-6">
			                  <ul className="single-list-wrap">
			                    <li className="single-list-inner style-check-box">
			                      <i className="fa fa-check" /> Metus interdum metus
			                    </li>
			                    <li className="single-list-inner style-check-box">
			                      <i className="fa fa-check" /> Ligula cur maecenas
			                    </li>
			                    <li className="single-list-inner style-check-box">
			                      <i className="fa fa-check" /> Fringilla nulla 
			                    </li>
			                  </ul>
			                </div>
			              </div>
			              <Link className="btn btn-border-black " to="/about">Read More</Link>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default AboutV2