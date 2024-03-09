import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => (
	<div className="col-lg-4 col-md-6">
	  <div className="single-course-inner">
		<div className="thumb">
		  <img src={course.image} alt="img" />
		</div>
		<div className="details">
		  <div className="details-inner">
			<div className="emt-user">
			  <span className="u-thumb"><img src={course.authorImage} alt="img" /></span>
			  <span className="align-self-center">{course.authorName}</span>
			</div>
			<h6><Link to={`/course-details/${course.id}`}>{course.title}</Link></h6> {/* Thêm link cho xem thêm */}
		  </div>
		  <div className="emt-course-meta " >
			<div className="row  d-flex justify-content-evenly">
			  <div className="col-6">
				<i  className="fa fa-university" />
			  <span>{course.state}</span>
			  </div>
			  <div className="col-6">
				<div className="price text-right">
				
				  <Link to={`/course-details/${course.id}`}>Xem thêm</Link> {/* Thêm link cho xem thêm */}
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  );
  
class CourseFilter extends Component {
  state = {
   
	
		courses: [
		  {
			id: 1,
			category: 'Graphics & Design',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/1.png`,
			authorName: 'Đại học A',
			title: 'Fox nymphs grab quick-jived waltz. Brick quiz whangs',
			rating: '4.3',
			reviewCount: 23,
			price: '$54.00',
			state: 'Califoria'
		  },
		  {
			id: 2,
			category: 'Graphics & Design',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/2.png`,
			authorName: 'Đại học A',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			rating: '4.5',
			reviewCount: 17,
			price: '$49.99',
			state: 'Califoria'

		  },
		  {
			id: 3,
			category: 'Graphics & Design',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/3.png`,
			authorName: 'Đại học A',
			title: 'Etiam vehicula sapien ac turpis hendrerit, a malesuada justo eleifend',
			rating: '4.0',
			reviewCount: 30,
			price: '$39.99',
			state: 'Califoria'

		  },
		  {
			id: 4,
			category: 'Graphics & Design',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/4.png`,
			authorName: 'Đại học A',
			title: 'Vestibulum vel nisi in elit accumsan eleifend nec vitae est',
			rating: '4.8',
			reviewCount: 42,
			price: '$59.99',
			state: 'Califoria'

		  },
		  {
			id: 5,
			category: 'Graphics & Design',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/5.png`,
			authorName: 'Đại học A',
			title: 'Aliquam sollicitudin eros nec semper blandit',
			rating: '4.2',
			reviewCount: 28,
			price: '$29.99',
			state: 'Califoria'

		  },
		  {
			id: 6,
			category: 'Graphics & Design',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Praesent vel augue a elit interdum laoreet',
			rating: '4.6',
			reviewCount: 36,
			price: '$45.00',
			state: 'Califoria'

		  },
		  {
			id: 7,
			category: 'Digital Marketing',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/7.png`,
			authorName: 'Đại học A',
			title: 'Duis id velit aliquam, laoreet magna ac, vehicula orci',
			rating: '4.1',
			reviewCount: 20,
			price: '$39.00',
			state: 'Califoria'

		  },
		  {
			id: 8,
			category: 'Digital Marketing',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/7.png`,
			authorName: 'Đại học A',
			title: 'Curabitur sed neque nec eros dignissim gravida',
			rating: '4.7',
			reviewCount: 39,
			price: '$55.00',
			state: 'Califoria'

		  },
		  {
			id: 9,
			category: 'Digital Marketing',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/7.png`,
			authorName: 'Đại học A',
			title: 'Nam eget metus sit amet sem faucibus facilisis id at mi',
			rating: '4.4',
			reviewCount: 25,
			price: '$42.00',
			state: 'Califoria'

		  },
		  {
			id: 10,
			category: 'Digital Marketing',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Integer sit amet nisi vitae orci volutpat commodo',
			rating: '4.9',
			reviewCount: 48,
			price: '$60.00',
			state: 'Califoria'

		  },
		  {
			id: 11,
			category: 'Digital Marketing',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Vivamus rutrum quam non turpis ullamcorper, vitae aliquet arcu tincidunt',
			rating: '4.3',
			reviewCount: 29,
			price: '$48.00',
			state: 'Califoria'

		  },
		  {
			id: 12,
			category: 'Digital Marketing',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Proin sagittis ligula vel ante tincidunt, in finibus ligula interdum',
			rating: '4.6',
			reviewCount: 35,
			price: '$47.50',
			state: 'Califoria'

		  },
		  {
			id: 13,
			category: 'Writing & Translation',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Sed fermentum dui at congue fermentum',
			rating: '4.2',
			reviewCount: 27,
			price: '$38.50',
			state: 'Califoria'

		  },
		  {
			id: 14,
			category: 'Writing & Translation',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Fusce a elit non diam condimentum aliquam',
			rating: '4.7',
			reviewCount: 40,
			price: '$57.00',
			state: 'Califoria'

		  },
		  {
			id: 15,
			category: 'Writing & Translation',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas',
			rating: '4.5',
			reviewCount: 31,
			price: '$53.00',
			state: 'Califoria'

		  },
		  {
			id: 16,
			category: 'Writing & Translation',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Quisque sed tortor at tellus ullamcorper dapibus',
			rating: '4.4',
			reviewCount: 26,
			price: '$44.99',
			state: 'Califoria'

		  },
		  {
			id: 17,
			category: 'Writing & Translation',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Morbi vel urna nec ligula gravida auctor',
			rating: '4.8',
			reviewCount: 44,
			price: '$62.00',
			state: 'Califoria'

		  },
		  {
			id: 18,
			category: 'Writing & Translation',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Vestibulum eu risus at ipsum lacinia vehicula',
			rating: '4.3',
			reviewCount: 24,
			price: '$46.00',
			state: 'Califoria'

		  },
		  {
			id: 19,
			category: 'Music & Audio',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Curabitur ornare nisl id justo tincidunt, ut tincidunt odio laoreet',
			rating: '4.6',
			reviewCount: 37,
			price: '$51.50',
			state: 'Califoria'

		  },
		  {
			id: 20,
			category: 'Music & Audio',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Phasellus ullamcorper magna nec sagittis dapibus',
			rating: '4.5',
			reviewCount: 32,
			price: '$52.00',
			state: 'Califoria'

		  },
		  {
			id: 21,
			category: 'Music & Audio',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Phasellus ullamcorper magna nec sagittis dapibus',
			rating: '4.5',
			reviewCount: 32,
			price: '$52.00',
			state: 'Califoria'

		  },
		  {
			id: 22,
			category: 'Music & Audio',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Phasellus ullamcorper magna nec sagittis dapibus',
			rating: '4.5',
			reviewCount: 32,
			price: '$52.00',
			state: 'Califoria'

		  },
		  {
			id: 23,
			category: 'Music & Audio',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Phasellus ullamcorper magna nec sagittis dapibus',
			rating: '4.5',
			reviewCount: 32,
			price: '$52.00',
			state: 'Califoria'

		  },
		  {
			id: 24,
			category: 'Music & Audio',
			image: `${process.env.PUBLIC_URL}/assets/img/course/10.jpg`,
			authorImage: `${process.env.PUBLIC_URL}/assets/img/author/6.png`,
			authorName: 'Đại học A',
			title: 'Phasellus ullamcorper magna nec sagittis dapibus',
			rating: '4.5',
			reviewCount: 32,
			price: '$52.00',
			state: 'Califoria'

		  }
		],

	  
    // Define your tabs structure here
    tabs: [
      { id: 'tab1', title: 'Graphics & Design', category: 'Graphics & Design' },
      { id: 'tab2', title: 'Digital Marketing', category: 'Digital Marketing' },
      { id: 'tab3', title: 'Writing & Translation', category: 'Writing & Translation' },
      { id: 'tab4', title: 'Music & Audio', category: 'Music & Audio' },
    ]
  };

  renderCourseList = (category) => {
    // Filter courses by category and map them to Course components
    return this.state.courses
      .filter(course => course.category === category)
      .map(course => <Course key={course.id} course={course} />);
  }

  renderTabs = () => {
    // Map through tabs and create tab panes
    return this.state.tabs.map(tab => (
      <div
        key={tab.id}
        className={`tab-pane fade ${tab.id === 'tab1' ? 'show active' : ''}`}
        id={tab.id}
        role="tabpanel"
        aria-labelledby={`${tab.id}-tab`}
      >
        <div className="row">
          {this.renderCourseList(tab.category)}
        </div>
      </div>
    ));
  }

  renderTabList = () => {
    // Create tab list headings
    return this.state.tabs.map(tab => (
      <li key={tab.id} className="nav-item">
        <a
          className={`nav-link ${tab.id === 'tab1' ? 'active' : ''}`}
          id={`${tab.id}-tab`}
          data-toggle="tab"
          href={`#${tab.id}`}
          role="tab"
          aria-controls={tab.id}
          aria-selected={tab.id === 'tab1' ? 'true' : 'false'}
        >
          {tab.title}
        </a>
      </li>
    ));
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + '/';

    return (
      <div className="course-area pd-top-100 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11">
              <div className="section-title style-white text-center">
                <h2 className="title">Các Chương Trình Nổi Bật</h2>
                <p>Khám phá các chương trình đặc sắc giúp bạn mở rộng cánh cửa học thuật tại Mỹ.</p>
              </div>
            </div>
          </div>
          <div className="edmt-nav-tab style-white text-center">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {this.renderTabList()}
            </ul>
          </div>
          <div className="tab-content go-top" id="myTabContent">
            {this.renderTabs()}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseFilter;
