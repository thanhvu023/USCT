import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { getAllProgram } from "../../redux/slice/programSlice";

function CoursePage() {
  const CategoryDropdown = ({ title, items }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle
          caret
          style={{ backgroundColor: "#489DF9", width: "300px", color: "black" }}
        >
          {title}
        </DropdownToggle>
        <DropdownMenu style={{ width: "300px" }}>
          {items.map((item, index) => (
            <DropdownItem key={index}>
              <Link to={item.link}>{item.label}</Link>
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
      ],
    },
    {
      title: "Trường học",
      items: [
        { label: "Đại học Harvard", link: "/instructor-details/harvard" },
        { label: "Đại học Stanford", link: "/instructor-details/stanford" },
        // Add more universities as needed
      ],
    },
    {
      title: "Học bổng du học",
      items: [
        { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
        { label: "Học bổng Chevening", link: "/scholarship/chevening" },
        // Add more scholarships as needed
      ],
    },
    {
      title: "Giới thiệu",
      items: [
        { label: "Về chúng tôi", link: "/about-us" },
        { label: "Liên hệ", link: "/contact" },
      ],
    },
  ];
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.program.programs);
  const loading = useSelector((state) => state.program.loading);
  
  useEffect(() => {
    dispatch(getAllProgram());
    
  }, []);

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="blog-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-lg-12">
            <div className="row go-top">
              {loading ? (
                <div>Loading...</div>
              ) : (
                programs.map((program, index) => (
                  <div key={index} className="col-md-6">
                    <div className="single-course-inner">
                      <div className="thumb">
                        <img src={publicUrl + "assets/img/course/programs.jpg"} alt="img" />
                      </div>
                      <div className="details">
                        <div className="details-inner">
                          {/* <div className="emt-user">
                            <span className="align-self-center">abc</span>
                          </div> */}
                          <h6>
                            <Link to={`/course-details/${program.programId}`}>abc</Link>
                          </h6>
                        </div>
                        <div className="emt-course-meta">
                          <div className="row">
                            <div className="col-6">
                              <div className="rating">
                                <span>Khoảng thời gian: {program.duration}</span>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="price text-right">
                                Học phí: <span>{program.tuition}$</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
                    <div key={index} style={{ margin: "20px" }}>
                      <CategoryDropdown
                        title={category.title}
                        items={category.items}
                      />
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
