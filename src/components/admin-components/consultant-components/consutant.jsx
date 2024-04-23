import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllConsultants } from "../../../redux/slice/consultantSlice";

const theadData = [
  { heading: "Avatar", sortingValue: "profile" },
  { heading: "Tên", sortingValue: "userName" },
  { heading: "Email", sortingValue: "email" },
  { heading: "Education", sortingValue: "education" },
  { heading: "Specialize", sortingValue: "specialize" },
  { heading: "Thao tác", sortingValue: "action" },
];

const AllConsultant = () => {
  const [sortData, setSortData] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const [test, setTest] = useState(0);
  const dispatch = useDispatch();
  const consultants = useSelector((state) => state.consultant.consultants);

  useEffect(() => {
    dispatch(getAllConsultants());
  }, [dispatch]);

  useEffect(() => {
    setData(document.querySelectorAll("#holidayList tbody tr"));
  }, [test]);

  useEffect(() => {
    activePag.current === 0 && changeData(0, sortData);
  }, [sortData]);

  useEffect(() => {
    setSortData(10); 
  }, []); 

  let pagination = Array(Math.ceil(consultants.length / sortData))
    .fill()
    .map((_, i) => i + 1);

  const changeData = (first, second) => {
    for (let i = 0; i < data.length; ++i) {
      if (i >= first && i < second) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  const onClick = (i) => {
    activePag.current = i;
    changeData(activePag.current * sortData, (activePag.current + 1) * sortData);
    setTest(i);
  };

  const DataSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredConsultants = consultants.filter((consultant) =>
      consultant.userName.toLowerCase().includes(searchTerm) ||
      consultant.email.toLowerCase().includes(searchTerm) ||
      consultant.education.toLowerCase().includes(searchTerm) ||
      consultant.specialize.toLowerCase().includes(searchTerm)
    );
    dispatch({
      type: 'SET_FILTERED_CONSULTANTS',
      payload: filteredConsultants
    });
  };
  
  return (
    <>
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách tư vấn viên</h4>
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
                            {sortData}
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
                  <table id="example4" className="display dataTable no-footer w-100">
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
                      {consultants.slice(activePag.current * sortData, (activePag.current + 1) * sortData).map((data, ind) => (
                        <tr key={ind} className="table-row-border">
                          <td>
                            <img
                              className="rounded-circle"
                              width="40"
                              height='40'
                              src={data.img}
                              alt=""
                            />
                          </td>
                          <td>{data.userName}</td>
                          <td>
                            <Link to="#">
                              <strong>{data.email}</strong>
                            </Link>
                          </td>
                          <td>{data.education}</td>
                          <td>{data.specialize}</td>
                          <td style={{ display: "flex", alignItems: "center" }}>
                            <button
                              className="btn btn-xs sharp btn-primary me-1"
                              style={{
                                width: "30px",
                                height: "30px",
                                padding: "0 20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "5px",
                              }}
                            >
                              <i className="fa fa-pencil" />
                            </button>
                            <button
                              to={"#"}
                              className="btn btn-xs sharp btn-danger"
                              style={{
                                width: "30px",
                                height: "30px",
                                padding: "0 20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default AllConsultant;
