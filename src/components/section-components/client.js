import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Client extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="client-area bg-base pd-top-100 pd-bottom-100" style={{backgroundImage: 'url('+publicUrl+'assets/img/institute/bg.png)'}}>
			  <div className="container">
			    <div className="row justify-content-center">
			      <div className="col-lg-12">
			        <div className="institute-slider owl-carousel">
			          <div className="item">
			            <img src={publicUrl+"assets/img/institute/1.png"} alt="img" />
			          </div>
			          <div className="item">
			            <img src={publicUrl+"assets/img/institute/2.png"} alt="img" />
			          </div>
			          <div className="item">
			            <img src={publicUrl+"assets/img/institute/3.png"} alt="img" />
			          </div>
			          <div className="item">
			            <img src={publicUrl+"assets/img/institute/4.png"} alt="img" />
			          </div>
			          <div className="item">
			            <img src={publicUrl+"assets/img/institute/5.png"} alt="img" />
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>


        }
}

export default Client