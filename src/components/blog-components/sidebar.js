import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUniByName } from "../../redux/slice/universitySlice";

function Sidebar() {
  const state = {
    minPrice: 100000,
    maxPrice: 2000000,
    currentValue: 100000,
  };

  const handleSliderChange = (event) => {
    this.setState({ currentValue: event.target.value });
  };

  const formatCurrency = (value) => {
    // Chia số tiền thành các đơn vị và thêm dấu '.' sau mỗi 3 chữ số
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const [universityName, setUniversityName] = useState("");
  const handleInputChangeName = (event) => {
    setUniversityName(event.target.value); // Update the program name state with the input value
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUniByName(universityName));
  }, [universityName]);
  return (
    <div className="col-lg-4 col-12">
      <div className="td-sidebar">
        <div className="widget widget_search">
          <form className="search-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Tên trường đại học"
                onChange={handleInputChangeName}
                value={universityName}
              />
            </div>
            <button className="submit-btn" type="submit">
              <i className="fa fa-search" />
            </button>
          </form>
        </div>
        <div className="widget widget_catagory">
          <h4 className="widget-title">Loại Trường</h4>
          <ul className="catagory-items go-top">
            <li>
              <Link to="/university-type">
                Đại học Liberal Arts <i className="fa fa-caret-right" />
              </Link>
            </li>
            <li>
              <Link to="/university-type">
                Đại học Quốc gia
                <i className="fa fa-caret-right" />
              </Link>
            </li>
            <li>
              <Link to="/university-type">
                Đại học miền <i className="fa fa-caret-right" />
              </Link>
            </li>
            <li>
              <Link to="/university-type">
                Cao đẳng cộng đồng
                <i className="fa fa-caret-right" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="widget widget_tags mb-0">
          <h4 className="widget-title">Tags</h4>
          <div className="tagcloud go-top">
            <Link to="/tag">Du học Mỹ</Link>
            <Link to="/tag">Visa</Link>
            <Link to="/tag">Học bổng</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
