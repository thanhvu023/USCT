import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Dropdown, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/slice/authSlice";
import unidecode from "unidecode";  
import { Avatar } from "@mui/material";
// import './customer.css'
const theadData = [
  { heading: "ID", sortingValue: "customerId" },
  { heading: "Ảnh đại diện", sortingValue: "avatar" },
  { heading: "Họ và tên", sortingValue: "fullName" },
  { heading: "Số điện thoại", sortingValue: "mobile" },
  { heading: "Email", sortingValue: "email" },
  { heading: "Địa chỉ", sortingValue: "address" },
];

const AllCustomer = () => {
  const [sort, setSort] = useState(10);
  const [activePage, setActivePage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    const filtered = userData.filter(user => {
      return (
        unidecode(user.customerId.toString()).includes(search) ||
        unidecode(user.fullName.toLowerCase()).includes(search) ||
        unidecode(user.phone.toString()).includes(search) ||
        unidecode(user.email.toLowerCase()).includes(search) ||
        unidecode(user.address.toLowerCase()).includes(search)
      );
    });
    setFilteredData(filtered);
    setActivePage(0); 
  }, [userData, searchTerm]);

  const displayedData = filteredData.slice(activePage * sort, (activePage + 1) * sort);
  const paginationLength = Math.ceil(filteredData?.length / sort);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách khách hàng</h4>
             
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div  className="dataTables_wrapper no-footer">
                  <div className="d-sm-flex justify-content-between align-items-center" >
                    <div className="dataTables_length">
                      <label>
                        Hiển thị
                        <Dropdown className="search-drop">
                          <Dropdown.Toggle as="div" className="search-drop-btn">
                            {sort}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {[10, 20, 30].map(size => (
                              <Dropdown.Item key={size} onClick={() => setSort(size)}>
                                {size}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        hàng
                      </label>
                    </div>
                    <div className="dataTables_filter">
                      <label>
                        Tìm kiếm:
                        <input type="search" className="" placeholder="" onChange={handleSearchChange} />
                      </label>
                    </div>
                  </div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        {theadData.map((item, index) => (
                          <th key={index}>{item.heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.customerId}</td>
                          <td><Avatar className="rounded-circle" src={item.img} alt="" width="40" height="40" /></td>
                          <td>{item.fullName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="pagination justify-content-center mt-4">
                    <button
                      className={`btn ${activePage === 0 ? "disabled" : ""}`}
                      onClick={() => setActivePage(Math.max(0, activePage - 1))}
                    >
                      Trước
                    </button>
                    {[...Array(paginationLength).keys()].map(page => (
                      <button
                        key={page}
                        className={`btn ${activePage === page ? "btn-primary" : "btn-light"}`}
                        onClick={() => setActivePage(page)}
                      >
                        {page + 1}
                      </button>
                    ))}
                    <button
                      className={`btn ${activePage === paginationLength - 1 ? "disabled" : ""}`}
                      onClick={() => setActivePage(Math.min(paginationLength - 1, activePage + 1))}
                    >
                      Sau
                    </button>
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
