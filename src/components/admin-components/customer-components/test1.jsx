import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentProfileByCustomerId } from "../../../redux/slice/studentSice";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES } from "./contants/theme-student";
import { Row, Button, Modal, Alert } from "react-bootstrap";
import Swal from "sweetalert2"
const theadData = [
  { heading: "ID học sinh", sortingVale: "id" },
  { heading: "Họ và tên", sortingVale: "name" },
  { heading: "Tư vấn viên phụ trách", sortingVale: "advisor" },
  { heading: "Ngày tạo", sortingVale: "date" },
  { heading: "Chương trình", sortingVale: "program" },
  { heading: "Trạng thái", sortingVale: "status" },
  { heading: "Thao tác", sortingVale: "action" },
];

const Test1 = () => {

  const [sort, setSortata] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const [test, settest] = useState(0);
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
    settest(i);
  };

  function SotingData(name) {
    const sortedPeople = [...feeData];
    switch (name) {
      case "sno":
        sortedPeople.sort((a, b) => (a.sno < b.sno ? -1 : 1));
        break;
      case "name":
      case "designation":
      case "mobile":
      case "address":
        sortedPeople.sort((a, b) => {
          return iconData.complete
            ? a[name].localeCompare(b[name])
            : b[name].localeCompare(a[name]);
        });
        break;
      default:
        break;
    }
    setFeeData(sortedPeople);
  }

  function DataSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  }
  
  
  
  const studentProfileByCustomerId = useSelector(
    (state) => state.student.studentProfileByCustomerId
  );
  const loading = useSelector((state) => state.student.loading);
  useEffect(() => {
    const filteredData = studentProfileByCustomerId.filter((student) => {
      return (
        student.fullName.toLowerCase().includes(searchTerm) ||
        student.address.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.createDate.toLowerCase().includes(searchTerm)

      );
    });
    setFeeData(filteredData);
  }, [searchTerm, studentProfileByCustomerId]);
  
  useEffect(() => {
    setFeeData(studentProfileByCustomerId); // Cập nhật feeData bằng dữ liệu từ API
  }, [studentProfileByCustomerId]);
  useEffect(() => {
    dispatch(getStudentProfileByCustomerId(1)); // Thay userId bằng giá trị tương ứng
  }, [dispatch]);
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
                <h4 className="card-title">Danh sách hồ sơ</h4>
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
                              <Dropdown.Item onClick={() => setSortata("10")}>
                                10
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => setSortata("20")}>
                                20
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => setSortata("30")}>
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
                              onClick={() => {
                                SotingData(item.sortingVale);
                                setIconDate((prevState) => ({
                                  complete: !prevState.complete,
                                  ind: ind,
                                }));
                              }}
                            >
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
                        {feeData.map((data) => (
                          <tr key={data.id}>
                            <td>
                            {data.studentProfileId}
                            </td>
                            <td>{data.fullName}</td>
                            <td>{data.customerId}</td>
                            <td>{data.createDate}</td>
                            <td>{data.phone}</td>
                            <td>{data.customerId}</td>
                            {/* <td>{data.dob}</td> */}
                            {/* <td>
                              <Link to="#">
                                <strong>{data.mobile}</strong>
                              </Link>
                            </td>
                            <td>
                              <Link to="#">
                                <strong>{data.email}</strong>
                              </Link>
                            </td>
                            <td>{data.address}</td>
                            <td>{data.join}</td> */}
                            <td style={{ display: "flex", alignItems: "center" }}>
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
                              <Modal
                                className="custom-modal"
                                show={showCheckModal}
                                onHide={handleCloseCheckModal}
                                backdrop="static"
                                centered
                              >
                                <Modal.Header>
                                  <Modal.Title>Modal Check Title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Bạn có chắc chắn muốn thực hiện hành động này?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleCloseCheckModal}
                                  >
                                    Hủy
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => {
                                      handleCloseCheckModal();
                                      setShowCheckSuccess(true);
                                    }}
                                  >
                                    Đồng ý
                                  </Button>
                                </Modal.Footer>
                              </Modal>
  
                              <Modal
                                className="custom-modal"
                                show={showDeleteModal}
                                onHide={handleCloseDeleteModal}
                                backdrop="static"
                                centered
                              >
                                <Modal.Header>
                                  <Modal.Title>Modal Delete Title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Bạn có chắc chắn muốn xóa mục này?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleCloseDeleteModal}
                                  >
                                    Hủy
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      handleCloseDeleteModal();
                                      setShowDeleteSuccess(true);
                                    }}
                                  >
                                    Xóa
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {(activePag.current + 1) * sort < data.length
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
      )}
      
    </div>
  );
};

export default Test1;
