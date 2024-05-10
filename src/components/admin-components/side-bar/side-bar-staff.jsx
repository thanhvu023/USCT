import React, { useReducer, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuList } from "./menu-staff";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/slice/authSlice";
const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
};

const SideBarStaff = ({ setMain }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleFilterClick = (filterName) => {
    setSelectedFilter(filterName);
    setMain(filterName);
  };

  const handleDashboardClick = () => {
    setSelectedFilter("admin");
    setMain("admin");
  };

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path?.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title });
        }
        item.content?.forEach((ele) => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title });
          }
        });
      });
    });
  }, [path]);

  return (
    <div>
      <div className="dlabnav-scroll">
        <ul className="list-group list-group-flush" id="menu">
          {MenuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li
                  className={`list-group-item ${menuClass} ${
                    data.extraclass ? data.extraclass : ""
                  }`}
                  key={index}
                >
                  {data.title}
                </li>
              );
            } else {
              return (
                <li
                  className={`list-group-item ${
                    state.active === data.title ? "active" : ""
                  }`}
                  key={index}
                >
                  <Link
                    to="#"
                    className={`nav-link has-arrow ${
                      selectedFilter === data.title ? "selected" : ""
                    }`}
                    onClick={
                      data.filterName === "Thanh toán"
                        ? handleDashboardClick
                        : () => handleFilterClick(data.title)
                    }
                    onMouseEnter={() => {
                      if (state.active !== data.title) {
                        setState({ active: data.title });
                      }
                    }}
                  >
                    {data.iconStyle}
                    <span className="nav-text">{data.title}</span>
                    <span className="badge badge-xs style-1 badge-danger">
                      {data.update}
                    </span>
                  </Link>
                  <Collapse in={state.active === data.title}>
                    <ul
                      className={`${
                        menuClass === "mm-collapse" ? "mm-show" : ""
                      }`}
                    >
                      {data.content &&
                        data.content.map((data, index) => (
                          <li
                            key={index}
                            className={`${
                              state.activeSubmenu === data.title ? "active" : ""
                            }`}
                          >
                            <Link
                              to={data.to}
                              className={`nav-link ${
                                data.hasMenu ? "has-arrow" : ""
                              } ${
                                selectedFilter === data.title ? "selected" : ""
                              }`}
                              onMouseEnter={() => {
                                if (state.activeSubmenu !== data.title) {
                                  setState({ activeSubmenu: data.title });
                                }
                              }}
                              onMouseLeave={() => {
                                if (state.activeSubmenu === data.title) {
                                  setState({ activeSubmenu: "" });
                                }
                              }}
                            >
                              {data.title}
                            </Link>
                            <Collapse in={state.activeSubmenu === data.title}>
                              <ul
                                className={`${
                                  menuClass === "mm-collapse" ? "mm-show" : ""
                                }`}
                              >
                                {data.content &&
                                  data.content.map((data, index) => (
                                    <li key={index}>
                                      <Link
                                        className={`nav-link ${
                                          path === data.to ? "active" : ""
                                        }`}
                                        to={data.to}
                                      >
                                        {data.title}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </Collapse>
                          </li>
                        ))}
                    </ul>
                  </Collapse>
                </li>
              );
            }
          })}
        </ul>
        <div className="copyright">
          {/* <p>Edumin  Admin © {new Date().getFullYear()}</p> */}
          <p className="fs-12">
            Made with{" Thesis"}
            <span
              className="heart"
              onClick={(e) => e.target.classList.toggle("heart-blast")}
            ></span>{" "}
            by USCT
          </p>
        
        </div>
        <button
                        onClick={handleLogout}
                        className="btn btn-base"
                        to="/sign-in"
                    >
                        Đăng xuất
                    </button>
      </div>
    
    </div>
  );
};

export default SideBarStaff;