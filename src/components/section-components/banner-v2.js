import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class BannerV2 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="banner-area banner-area-2" style={{backgroundImage: 'url("'+publicUrl+'assets/img/banner/2.png")'}}>
		  <div className="container">
		    <div className="row">
		      <div className="col-lg-8 align-self-center">
		        <div className="banner-inner style-white text-center text-lg-left">
		          <h6 className="b-animate-1 sub-title">PLACE TO GROW</h6>
		          <h1 className="b-animate-2 title">WE CREATING LEADERS FOR TOMORROW</h1>
		          <Link className="btn btn-base b-animate-3 mr-sm-3 mr-2" to="/about">Get A Quote</Link>
		          <Link className="btn btn-border-white b-animate-3" to="/about">Read More</Link>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>

        }
}

export default BannerV2