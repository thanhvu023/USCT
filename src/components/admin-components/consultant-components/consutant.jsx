import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Dropdown, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConsultants,
  setFilteredConsultants,
  selectFilteredConsultants
} from "../../../redux/slice/consultantSlice";

const theadData = [
  { heading: "ID", sortingValue: "consultantId" },
  { heading: "Avatar", sortingValue: "profile" },
  { heading: "Tên", sortingValue: "userName" },
  { heading: "Email", sortingValue: "email" },
  { heading: "Education", sortingValue: "education" },
  { heading: "Specialize", sortingValue: "specialize" },
  { heading: "Giới thiệu", sortingValue: "introduction" },
];

const AllConsultant = () => {
  const [sortData, setSortData] = useState(17);
  const [activePage, setActivePage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [displayedConsultants, setDisplayedConsultants] = useState([]);
  const dispatch = useDispatch();
  const consultants = useSelector(state => state.consultant.consultants);

  useEffect(() => {
    dispatch(getAllConsultants());
  }, [dispatch]);

  useEffect(() => {
    if (consultants?.length > 0) {
      setLoaded(true);
      setDisplayedConsultants(consultants);
    }
  }, [consultants]);

  const DataSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newFilteredConsultants = consultants.filter(consultant =>
      consultant.userName.toLowerCase().includes(searchTerm) ||
      consultant.email.toLowerCase().includes(searchTerm) ||
      (consultant.introduction && consultant.introduction.toLowerCase().includes(searchTerm)) ||
      consultant.education.toLowerCase().includes(searchTerm) ||
      consultant.specialize.toLowerCase().includes(searchTerm)
    );
    dispatch(setFilteredConsultants(newFilteredConsultants));
    setDisplayedConsultants(newFilteredConsultants);
    setActivePage(0); // Reset to the first page on filter
  };
  

  const pagination = Array(Math.ceil(displayedConsultants?.length / sortData)).fill().map((_, i) => i);
  const startEntry = activePage * sortData;
  const endEntry = Math.min(startEntry + sortData, displayedConsultants?.length);

  return (
    <>
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách tư vấn viên</h4>
              <div className="d-sm-flex justify-content-between align-items-center" >
                    <div className="dataTables_filter">
                      <label>
                        Tìm kiếm:
                        <input type="search" className="" placeholder="" onChange={DataSearch} />
                      </label>
                    </div>
                  </div>
            </div>
            <div className="card-body">
              {loaded && (
                <div className="table-responsive">
                  <Table striped bordered hover className="dataTable no-footer">
                
                    <thead>
                      <tr>
                        {theadData.map((item, index) => (
                          <th key={index}>{item.heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayedConsultants.slice(startEntry, endEntry).map((consultant, index) => (
                        <tr key={index}>
                                                    <td>{consultant.consultantId}</td>
                          <td><img className="rounded-circle" src={consultant.img} alt="" width="40" height="40" /></td>
                          <td>{consultant.userName}</td>
                          <td><Link to="#">{consultant.email}</Link></td>
                          <td>{consultant.education}</td>
                          <td>{consultant.specialize}</td>
                          <td>{consultant.introduction}</td>
                          {/* <td style={{ display: "flex", alignItems: "center" }}>
                            <button className="btn btn-xs sharp btn-primary me-1" style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "5px" }}><i className="fa fa-pencil" /></button>
                            <button className="btn btn-xs sharp btn-danger" style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}><i className="fa fa-trash" /></button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {displayedConsultants?.length > sortData && (
                    <div className="pagination justify-content-center mt-4">
                      <button className={`btn ${activePage === 0 ? "disabled" : ""}`} onClick={() => setActivePage(activePage - 1)}>Previous</button>
                      {pagination.map(num => (
                        <button key={num} className={`btn ${activePage === num ? "btn-primary" : "btn-light"}`} onClick={() => setActivePage(num)}>
                          {num + 1}
                        </button>
                      ))}
                      <button className={`btn ${activePage === pagination?.length - 1 ? "disabled" : ""}`} onClick={() => setActivePage(activePage + 1)}>Next</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default AllConsultant;
