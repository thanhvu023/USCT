import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProgram } from "../../redux/slice/programSlice";

const handleSliderChange = (event, setCurrentValue) => {
  setCurrentValue(event.target.value);
};

const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function CoursePage() {
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [currentValue, setCurrentValue] = useState(100000);

  const CategoryCheckboxList = ({ title, items }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (item) => {
      if (selectedItems.includes(item)) {
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem !== item)
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    };   
    return (
      <div className="widget widget_checkbox_list">
        <h4 className="widget-title">{title}</h4>
        {items.map((item, index) => (
          <label key={index} className="single-checkbox">
            <input
              type="checkbox"
              defaultChecked={item.defaultChecked}
              onChange={() => handleCheckboxChange(item.label)}
            />
            <span className="checkmark" />
            {item.label}
          </label>
        ))}
      </div>
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
        { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
        { label: "Học bổng Chevening", link: "/scholarship/chevening" },
        { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
        { label: "Học bổng Chevening", link: "/scholarship/chevening" },
        // Add more scholarships as needed
      ],
    },
    {
      title: "Chuyên ngành",
      items: [
        { label: "Khoa học máy tính", link: "/computer-science" },
        { label: "Kỹ thuật phần mềm", link: "/software-engineering" },
        { label: "Mạng máy tính", link: "/computer-networks" },
        { label: "Trí tuệ nhân tạo", link: "/artificial-intelligence" },
        { label: "An toàn thông tin", link: "/information-security" },

        // Add more majors as needed
      ],
    },
  ];
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.program.programs);
  const loading = useSelector((state) => state.program.loading);
  const token = useSelector((state) => state.auth?.token);
  useEffect(() => {
    dispatch(getAllProgram(token));
  }, []);

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="blog-area pd-top-120 pd-bottom-120">
      <div class="container">
        <div className="row">
          <div className="col-lg-8 order-lg-12 m-0">
            <div className="row go-top">
              {loading ? (
                <div>Loading...</div>
              ) : (
                programs.map((program, index) => (
                  <div key={index} className="col-md-6">
                    <div className="single-course-inner">
                      <div className="thumb">
                        <img
                          src={publicUrl + "assets/img/course/programs.jpg"}
                          alt="img"
                        />
                      </div>
                      <div className="details">
                        <div className="details-inner ">
                          {/* <div className="emt-user">
                            <span className="align-self-center">abc</span>
                          </div> */}
                          <h6>
                            <Link to={`/program-details/${program.programId}`}>
                              {program.nameProgram}
                            </Link>
                          </h6>
                        </div>
                        <div className="emt-course-meta">
                          <div className="row">
                            <div className="col-6">
                              <div className="rating">
                                <span>Lộ trình: {program.duration}</span>
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
                      <CategoryCheckboxList
                        title={category.title}
                        items={category.items}
                      />
                    </div>
                  ))}
                </ul>
              </div>
              <div className="widget widget_checkbox_list">
                <h4 className="widget-title">Trình độ Tiếng Anh</h4>
                <label className="single-checkbox">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                  TOEFL
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  IELTS
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  GMAT
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  SAT
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  GRE
                </label>
              </div>
              <div className="widget widget_price">
                <h4 className="widget-title">Chi Phí Du Học</h4>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  value={currentValue}
                  className="custom-range"
                  onChange={(event) =>
                    handleSliderChange(event, setCurrentValue)
                  }
                  style={{
                    width: "100%",
                    height: "25px",
                    background: "#ddd",
                    outline: "none",
                    opacity: "0.7",
                    transition: "opacity .2s",
                    position: "relative",
                    backgroundColor: "#007bff",
                    border: "2px solid #007bff",
                  }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ color: "#007bff" }}
                >
                  <span>$100k</span>
                  <span>$2M</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "900px",
                    left: `${
                      ((currentValue - 100000) / (2000000 - 100000)) * 100
                    }%`,
                    transform: "translateX(-10%)",
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(currentValue)}$
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
