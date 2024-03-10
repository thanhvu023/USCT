import React, { useState} from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import parse from "html-react-parser";
function CoursePage() {

  
  const CategoryDropdown = ({ title, items }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
        <DropdownToggle caret style={{ backgroundColor: '#489DF9', width: '300px', color:'black' }}>
          {title}
        </DropdownToggle>
        <DropdownMenu  style={{ width:'300px'}}>
          {items.map((item, index) => (
            <DropdownItem key={index}>
              <Link to={item.link}>
                {item.label}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };


    const categories = [
      {
        title: "Du học các bang",
        items: [
          { label: "California", link: "/blog-details/california" },
          { label: "New York", link: "/blog-details/new-york" },
          // Add more states as needed
        ]
      },
      {
        title: "Trường học",
        items: [
          { label: "Đại học Harvard", link: "/instructor-details/harvard" },
          { label: "Đại học Stanford", link: "/instructor-details/stanford" },
          // Add more universities as needed
        ]
      },
      {
        title: "Học bổng du học",
        items: [
          { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
          { label: "Học bổng Chevening", link: "/scholarship/chevening" },
          // Add more scholarships as needed
        ]
      },
      {
        title: "Giới thiệu",
        items: [
          { label: "Về chúng tôi", link: "/about-us" },
          { label: "Liên hệ", link: "/contact" },
        ]
      }
    ];

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="blog-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-lg-12">
            <div className="row go-top">
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                          <span className="u-thumb">
                            <img
                              src={publicUrl + "assets/img/author/1.png"}
                              alt="img"
                            />
                          </span>
                          <span className="align-self-center">
                            Chương trình tuyển sinh trực tiếp bậc đại học,cao
                            đẳng
                          </span>
                        </div> */}
                      <h6>
                        <Link to="/course-details">
                          Chương trình tuyển sinh trực tiếp bậc đại học,cao đẳng
                        </Link>
                      </h6>
                    </div>
                    {/* <div className="emt-course-meta">
                        <div className="row">
                          <div className="col-6">
                            <div className="rating">
                              <i className="fa fa-star" /> 4.3
                              <span>(23)</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="price text-right">
                              Price: <span>$54.00</span>
                            </div>
                          </div>
                        </div>
                      </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                          <span className="u-thumb">
                            <img
                              src={publicUrl + "assets/img/author/2.png"}
                              alt="img"
                            />
                          </span>
                          <span className="align-self-center">Joe Powell</span>
                        </div> */}
                      <h6>
                        <Link to="/course-details">
                        Các chương trình du học được tài trợ
                        </Link>
                      </h6>
                    </div>
                    {/* <div className="emt-course-meta">
                      <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.3
                            <span>(23)</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="price text-right">
                            Price: <span>$54.00</span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                        <span className="u-thumb">
                          <img
                            src={publicUrl + "assets/img/author/3.png"}
                            alt="img"
                          />
                        </span>
                        <span className="align-self-center">
                          Timothy Willis
                        </span>
                      </div> */}
                      <h6>
                        <Link to="/course-details">
                        Thực tập ở nước ngoài
                        </Link>
                      </h6>
                    </div>
                    {/* <div className="emt-course-meta">
                      <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.9
                            <span>(73)</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="price text-right">
                            Price: <span>$74.00</span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                        <span className="u-thumb">
                          <img
                            src={publicUrl + "assets/img/author/4.png"}
                            alt="img"
                          />
                        </span>
                        <span className="align-self-center">
                          Walter Griffin
                        </span>
                      </div> */}
                      <h6>
                        <Link to="/course-details">
                        Du học mùa hè
                        </Link>
                      </h6>
                    </div>
                    <div className="emt-course-meta">
                      {/* <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.8
                            <span>(53)</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="price text-right">
                            Price: <span>$64.00</span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                        <span className="u-thumb">
                          <img
                            src={publicUrl + "assets/img/author/5.png"}
                            alt="img"
                          />
                        </span>
                        <span className="align-self-center">Aaron Powell</span>
                      </div> */}
                      <h6>
                        <Link to="/course-details">
                          Du học học bổng
                        </Link>
                      </h6>
                    </div>
                    {/* <div className="emt-course-meta">
                      <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.5
                            <span>(21)</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="price text-right">
                            Price: <span>$34.00</span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                        <span className="u-thumb">
                          <img
                            src={publicUrl + "assets/img/author/6.png"}
                            alt="img"
                          />
                        </span>
                        <span className="align-self-center">Randy Hart</span>
                      </div> */}
                      <h6>
                        <Link to="/course-details">
                          Du học tự túc
                        </Link>
                      </h6>
                    </div>
                    {/* <div className="emt-course-meta">
                      <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.4
                            <span>(20)</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="price text-right">
                            Price: <span>$55.00</span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      {/* <div className="emt-user">
                        <span className="u-thumb">
                          <img
                            src={publicUrl + "assets/img/author/2.png"}
                            alt="img"
                          />
                        </span>
                        <span className="align-self-center">Joe Powell</span>
                      </div> */}
                      <h6>
                        <Link to="/course-details">
                          Du học sau đại học
                        </Link>
                      </h6>
                    </div>
                    {/* <div className="emt-course-meta">
                      <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.3
                            <span>(23)</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="price text-right">
                            Price: <span>$54.00</span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="single-course-inner">
                  <div className="thumb">
                    <img
                      src={publicUrl + "assets/img/course/programs.jpg"}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <div className="details-inner">
                      <div className="emt-user">
                        <span className="u-thumb">
                          <img
                            src={publicUrl + "assets/img/author/3.png"}
                            alt="img"
                          />
                        </span>
                        <span className="align-self-center">
                          Timothy Willis
                        </span>
                      </div>
                      <h6>
                        <Link to="/course-details">
                          Praesent eu dolor eu orci vehicula euismod
                        </Link>
                      </h6>
                    </div>
                    <div className="emt-course-meta">
                      <div className="row">
                        <div className="col-6">
                          <div className="rating">
                            <i className="fa fa-star" /> 4.9
                            <span>(73)</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="price text-right">
                            Price: <span>$74.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <nav className="td-page-navigation">
              <ul className="pagination">
                <li className="pagination-arrow">
                  <Link to="#">
                    <i className="fa fa-angle-double-left" />
                  </Link>
                </li>
                <li>
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link className="active" to="#">
                    2
                  </Link>
                </li>
                <li>
                  <Link to="#">...</Link>
                </li>
                <li>
                  <Link to="#">3</Link>
                </li>
                <li className="pagination-arrow">
                  <Link to="#">
                    <i className="fa fa-angle-double-right" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-4 order-lg-1 col-12">
            <div className="td-sidebar mt-5 mt-lg-0">
              <div className="widget widget_search_course">
                <h4 className="widget-title">Tìm kiếm thông tin</h4>
                <form className="search-form single-input-inner">
                  <input type="text" placeholder="Nhập nội dung cần tìm" />
                  <button className="btn btn-base w-100 mt-3" type="submit">
                    <i className="fa fa-search" /> Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="widget widget_catagory">
      <h4 className="widget-title">Thông tin du học</h4>
      <ul className="catagory-items go-top">
        {categories.map((category, index) => (
          <div key={index} style={{margin:'20px'}}>
            <CategoryDropdown title={category.title} items={category.items} />
          </div>
        ))}
      </ul>
    </div>
              <div className="widget widget_checkbox_list">
                <h4 className="widget-title">Cấp bậc</h4>
                <label className="single-checkbox">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                  Bậc THPT
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  Bậc đại học
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  Bậc sau đại học
                </label>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
