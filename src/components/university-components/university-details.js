import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../blog-components/sidebar';
function UniversityDetails(){
    const Box = ({ groupName, imageUrl }) => {
        return (
          <div className="box">
            <img src={imageUrl} alt={groupName} />
            <div className="overlay"></div>
            <div className="text" >{groupName}</div>
          </div>
        );
      }
    const groupsMajor = [
        { id: 1, name: 'Group 1', imageUrl: 'https://i.pinimg.com/564x/57/d7/45/57d745474a39ccc097deb6813aa9d362.jpg' },
        { id: 2, name: 'Group 2', imageUrl:  'https://i.pinimg.com/564x/57/d7/45/57d745474a39ccc097deb6813aa9d362.jpg' },
        { id: 3, name: 'Group 3', imageUrl:  'https://i.pinimg.com/564x/57/d7/45/57d745474a39ccc097deb6813aa9d362.jpg' },
        { id: 4, name: 'Group 4', imageUrl: 'https://i.pinimg.com/564x/57/d7/45/57d745474a39ccc097deb6813aa9d362.jpg' },
    ];
    useEffect(() => {
        const $ = window.$;
        $('.footer-area.style-two').removeClass('mg-top-100');
      }, []);
    
      let publicUrl = process.env.PUBLIC_URL + '/';
      let imagealt = 'image'
    return (
		<div className="blog-area pd-top-120 pd-bottom-120">
		  <div className="container">
		    <div className="row">
		      <div className="col-lg-8">
		        <div className="blog-details-page-content">
		          <div className="single-blog-inner">
		            <div className="thumb">
		              <img src={publicUrl+"assets/img/blog/4.png"} alt="img" />
		            </div>
		            <div className="details">
		              <ul className="blog-meta">
					  <li><i className="fa fa-university" /> National University</li>
					  <li><i className="fa fa-map-marker" /> California, Hoa Kỳ</li>
		              </ul>
		              <h3 className="title">Flock by when MTV ax quiz prog quiz graced</h3>
		              <p>Lorem ipsum dolor sit amet, elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
		            
		              <p>labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam</p>
		              <div className="thumb mb-4">
		                <img src={publicUrl+"assets/img/blog/single.png"} alt="img" />
		              </div>
		              <h5>AMC Entertainment sparks calls for scrutiny</h5>
		              <p>labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam</p>
		              <ul className="single-list-wrap">
		                <li className="single-list-inner style-check">
		                  <i className="fa fa-check" />  Stet clita kasd gubergren, no sea takimata sanctus
		                </li>
		                <li className="single-list-inner style-check">
		                  <i className="fa fa-check" /> Ligula cur maecenas no sea takimata
		                </li>
		                <li className="single-list-inner style-check">
		                  <i className="fa fa-check" /> Fringilla nulla maecenas
		                </li>
		              </ul>
		            </div>
		          </div>
		          <div className="tag-and-share">
		            <div className="row">
		              <div className="col-sm-6">
		                <h6>Related Tags :</h6>
		                <div className="tags">
		                  <a href="#">Treands, </a>
		                  <a href="#">Inttero, </a>
		                  <a href="#">Estario</a>
		                </div>
		              </div>
		              <div className="col-sm-6 text-sm-right">
		                <div className="blog-share">
		                  <h6>Share :</h6>
		                  <ul>
		                    <li><a href="#"><i className="fa fa-facebook-f" aria-hidden="true" /></a></li>
		                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
		                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
		                    <li><a href="#"><i className="fa fa-behance" aria-hidden="true" /></a></li>
		                  </ul>
		                </div>
		              </div>  
		            </div>
		          </div>
                  <div className='majors'>
   <h1>Group Majors</h1>
    <h3>Information about specific majors and outstanding training schools - helping you save time searching for majors of interest</h3>
    <div className='group-major'>
     
       {groupsMajor.map(group => (
          <Box
            key={group.id}
            groupName={group.name}
            imageUrl={group.imageUrl}
          />
        ))}
    </div>
     </div>
		        </div>
		      </div>
		       <Sidebar />
		    </div>
		  </div>
		</div>


    )

}

export default UniversityDetails;
