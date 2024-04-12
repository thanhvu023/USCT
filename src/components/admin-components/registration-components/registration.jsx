import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Row, Button, Modal, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { getRegistration } from "../../../redux/slice/registrationSlice"; // Import the action for fetching registration forms

const theadData = [
  { heading: "ID đơn", sortingVale: "id" },
  { heading: "Họ và tên", sortingVale: "name" },
  { heading: "Chuyên ngành đã chọn", sortingVale: "majorChoose" },
  { heading: "Chương trình đã chọn", sortingVale: "programChoose" },
  { heading: "Tư vấn viên phụ trách", sortingVale: "advisor" },
  { heading: "Thao tác", sortingVale: "action" },
];

const Registration = () => {
  const [sort, setSortata] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const [test, setTest] = useState(0);
  const [feeData, setFeeData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [iconData, setIconDate] = useState({ complete: false, ind: null });
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleCloseCheckModal = () => setShowCheckModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  
  const handleShowCheckModal = () => {
    Swal.fire({
      icon: "success",
      title: "Duyệt thành công!",
      showConfirmButton: false,
      timer: 3000,
    });
    setShowCheckSuccess(true);
  };

  const handleShowDeleteModal = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd6b55",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  useEffect(() => {
    setData(document.querySelectorAll("#holidayList tbody tr"));
  }, [test]);

  activePag.current === 0 && chageData(0, sort);

  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    setTest(i);
  };

  function DataSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  }

  useEffect(() => {
    dispatch(getRegistration()); // Fetch registration forms when the component mounts
  }, [dispatch]);

  const { registrationForms, loading } = useSelector(
    (state) => state.registration
  );
  console.log("registrationForms:",registrationForms)

  useEffect(() => {
    const filteredData = registrationForms.filter((form) => {
      return (
        form.fullName.toLowerCase().includes(searchTerm) ||
        form.majorChoose.toLowerCase().includes(searchTerm) ||
        form.programChoose.toLowerCase().includes(searchTerm) ||
        form.advisor.toLowerCase().includes(searchTerm)
      );
    });
    setFeeData(filteredData);
  }, [searchTerm, registrationForms]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                  <h4 className="card-title">
                    Danh sách đơn tư vấn của khách hàng
                  </h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="holidayList"
                      className="dataTables_wrapper no-footer"
                    >
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <div className="dataTables_length">
                          <label className="d-flex align-items-center">
                            hiển thị
                            <Dropdown className="search-drop">
                              <Dropdown.Toggle
                                as="div"
                                className="search-drop-btn"
                              >
                                {sort}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSortata(10)}>
                                  10
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortata(20)}>
                                  20
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSortata(30)}>
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
                              <th key={ind}>
                                {item.heading}
                                <span>
                                  {ind !== iconData.ind && (
                                    <i
                                      className="fa fa-sort ms-2 fs-12"
                                      style={{ opacity: "0.3" }}
                                    />
                                  )}
                                  {ind === iconData.ind &&
                                    (iconData.complete ? (
                                      <i
                                        className="fa fa-arrow-down ms-2 fs-12"
                                        style={{ opacity: "0.7" }}
                                      />
                                    ) : (
                                      <i
                                        className="fa fa-arrow-up ms-2 fs-12"
                                        style={{ opacity: "0.7" }}
                                      />
                                    ))}
                                </span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {registrationForms.map((data) => (
                            <tr key={data.id}>
                              <td>{data.studentProfileId}</td>
                              <td>{data.fullName}</td>
                              <td>{data.majorChoose}</td>
                              <td>{data.programChoose}</td>
                              <td>{data.advisor}</td>
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                  onClick={handleShowCheckModal}
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
                                  <i className="fa fa-check" />
                                </button>
                                <button
                                  onClick={handleShowDeleteModal}
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
                      <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                        <div className="dataTables_info">
                          Showing {activePag.current * sort + 1} to{" "}
                          {activePag.current + 1 < paggination.length
                            ? (activePag.current + 1) * sort
                            : data.length}{" "}
                          of {data.length} entries
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
                            disabled={
                              activePag.current === paggination.length - 1
                            }
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
      )}
    </div>
  );
};

export default Registration;
