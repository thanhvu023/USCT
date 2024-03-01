import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class EventDetails extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="course-single-area pd-top-120 pd-bottom-110">
		  <div className="container">
		    <div className="row">
		      <div className="col-lg-8 order-lg-12">
		        <div className="event-detaila-inner">
		          <div className="thumb mb-4">
		            <img src={publicUrl+"assets/img/other/5.png"} alt="img" />
		          </div>
		          <ul className="event-meta">
		            <li><i className="fa fa-clock-o" /> 12:00 AM  To 11:59 PM</li>
		            <li><i className="fa fa-map-marker" /> Melbourne, Australia</li>
		          </ul>
		          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea</p>
		          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem</p>
		          <div className="row pt-4 pb-4">
		            <div className="col-lg-5">
		              <div className="thumb mb-3 mb-lg-0">
		                <img src={publicUrl+"assets/img/other/6.png"} alt="img" />
		              </div>
		            </div>
		            <div className="col-lg-7 align-self-center">
		              <h6>Quality Control System</h6>
		              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>
		              <h6>Highly Professional Staff</h6>
		              <p className="mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>
		            </div>
		          </div>
		          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea</p>
		        </div>
		      </div>
		      <div className="col-lg-4 order-lg-1">
		        <div className="td-sidebar">
		          <div className="widget widget_event">
		            <h4 className="widget-title text-white">Event Info :</h4>                                 
		            <ul>
		              <li><i className="fa fa-calendar" />Start Date: 12:00 AM</li>
		              <li><i className="fa fa-clock-o" />Start Time: May 08</li>
		              <li><i className="fa fa-calendar" />End Date: April 04</li>
		              <li><i className="fa fa-clock-o" />End Time: 11:59 PM</li>
		              <li><i className="fa fa-ticket" />Number of Participants: 10</li>
		              <li><i className="fa fa-map-marker" />Location: Melbourne, Australia</li>
		            </ul>
		          </div>
		          <div className="widget widget_catagory">
		            <h4 className="widget-title">Location</h4>                                 
		            <div className="widget-g-map">
		              <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d29208.601361499546!2d90.3598076!3d23.7803374!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1589109092857!5m2!1sen!2sbd" />
		            </div>
		          </div> 
		          <div className="widget widget-contact">
		            <h4 className="widget-title">Get a Quote</h4> 
		            <div className="single-input-inner style-right-icon">
		              <input type="text" placeholder="Full name" />
		              <img src={publicUrl+"assets/img/icon/25.png"} alt="img" />
		            </div>
		            <div className="single-input-inner style-right-icon">
		              <input type="text" placeholder="Email Address" />
		              <img src={publicUrl+"assets/img/icon/26.png"} alt="img" />
		            </div>
		            <div className="single-input-inner style-right-icon">
		              <textarea placeholder="Your Message" defaultValue={""} />
		              <img src={publicUrl+"assets/img/icon/27.png"} alt="img" />
		            </div>
		            <a className="btn btn-base" href="#">Send Message</a>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>

        }
}

export default EventDetails