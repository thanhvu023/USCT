import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Button, Modal, Alert } from "react-bootstrap";
import { getAllUsers } from "../../../redux/slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./customer.css";

const theadData = [
  { heading: "ID", sortingVale: "customerId" },
  { heading: "Ảnh đại diện", sortingVale: "avatar" },
  { heading: "Họ và tên", sortingVale: "fullName" },
  // { heading: "Giới tính", sortingVale: "gender" },
  // { heading: "Ngày sinh", sortingVale: "dob" },
  { heading: "Số điện thoại", sortingVale: "mobile" },
  { heading: "Email", sortingVale: "email" },
  { heading: "Địa chỉ", sortingVale: "address" },
  // { heading: "Thời gian tạo", sortingVale: "join" },
  // { heading: "Thao tác", sortingVale: "action" },
];  
const AllCustomer = () => {
  const [sort, setSortData] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const dispatch = useDispatch();
  const [test, setTest] = useState(0);
  const [feeData, setFeeData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFeeData(userData);
      setOriginalData(userData);
    }
  }, [userData]);

  useEffect(() => {
    setSortData(17); 
  }, []); 

  useEffect(() => {
    setData(feeData.slice(activePag.current * sort, (activePag.current + 1) * sort));
  }, [feeData, sort, activePag.current]);

  let paggination = Array(Math.ceil(originalData.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    setTest(i);
  };

  function DataSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setFeeData(originalData);
    } else {
      const updatedData = originalData.filter((item) => {
        const searchData = `${item.name} ${item.customerId} ${item.gender} ${item.dateOfBirth} ${item.mobile} ${item.email} ${item.address}`.toLowerCase();
        return searchData.includes(searchTerm);
      });
      setFeeData(updatedData);
    }
  }

  return (
    <>
      <Row>
        <div className="col-lg-12">
          <Alert
            show={showDeleteSuccess}
            variant="danger"
            onClose={() => setShowDeleteSuccess(false)}
            dismissible
          >
            Xóa thành công!
          </Alert>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách khách hàng</h4>
              <Link to="/add-staff" className="btn btn-primary">
                + Thêm mới
              </Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div id="holidayList" className="dataTables_wrapper no-footer">
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="dataTables_length">
                      <label className="d-flex align-items-center">
                        hiển thị
                        <Dropdown className="search-drop">
                          <Dropdown.Toggle as="div" className="search-drop-btn">
                            {sort}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortData(10)}>
                              10
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortData(20)}>
                              20
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortData(30)}>
                              30
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        hàng
                      </label>
                    </div>
                    <div className="dataTables_filter">
                      <label>
                        Tìm kiếm :{" "}
                        <input
                          type="search"
                          className=""
                          placeholder=""
                          onChange={DataSearch}
                        />
                      </label>
                    </div>
                  </div>
                  <table
                    id="example4"
                    className="display dataTable no-footer w-100"
                  >
                    <thead>
                      <tr>
                        {theadData.map((item, ind) => (
                          <th
                            key={ind}
                            onClick={() => {}}
                          >
                            {item.heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data) => (
                        <tr key={data.id} className="table-row-border">
                          <td>{data.customerId}</td>
                          <td>
                            <img
                              className="rounded-circle"
                              width="40"
                              height='40'
                              src={data.img}
                              alt=""
                            />{" "}
                          </td>
                          <td>{data.fullName}</td>
                          <td>
                            <Link to="#">
                              <strong>{data.phone}</strong>
                            </Link>
                          </td>
                          <td>
                            <Link to="#">
                              <strong>{data.email}</strong>
                            </Link>
                          </td>                         
                          <td>{data.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                    <div className="dataTables_info">
                      Showing {activePag.current * sort + 1} to{" "}
                      {(activePag.current + 1) * sort < originalData.length
                        ? (activePag.current + 1) * sort
                        : originalData.length}{" "}
                      of {originalData.length} entries
                    </div>
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="example5_paginate"
                    >
                      <button
                        className={`btn btn-outline-secondary paginate_button previous ${
                          activePag.current === 0 ? "disabled" : ""
                        }`}
                        onClick={() =>
                          activePag.current > 0 &&
                          onClick(activePag.current - 1)
                        }
                        disabled={activePag.current === 0}
                      >
                        Previous
                      </button>
                      <span>
                        {paggination.map((number, i) => (
                          <button
                            key={i}
                            className={`btn btn-outline-secondary paginate_button ${
                              activePag.current === i ? "current" : ""
                            }`}
                            onClick={() => onClick(i)}
                          >
                            {number}
                          </button>
                        ))}
                      </span>
                      <button
                        className={`btn btn-outline-secondary paginate_button next ${
                          activePag.current === paggination.length - 1
                            ? "disabled"
                            : ""
                        }`}
                        onClick={() =>
                          activePag.current + 1 < paggination.length &&
                          onClick(activePag.current + 1)
                        }
                        disabled={activePag.current === paggination.length - 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default AllCustomer;
