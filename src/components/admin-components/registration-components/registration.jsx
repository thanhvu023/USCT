import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Row, Button, Modal, Alert, Form, Badge  } from "react-bootstrap";
import Swal from "sweetalert2";
import { getRegistration, getRegistrationByCustomerId, updateRegistrationById } from "../../../redux/slice/registrationSlice";
import { getUserById } from "../../../redux/slice/authSlice";
import { getConsultants } from "../../../redux/slice/authSlice";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
// import './registration.css'
const theadData = [
  { heading: "ID đơn", sortingVale: "id" },  
  { heading: "Chuyên ngành đã chọn", sortingVale: "majorChoose" },
  { heading: "Chương trình đã chọn", sortingVale: "programChoose" },
  { heading: "Tư vấn viên", sortingVale: "consultant" },
  { heading: "Trạng thái", sortingVale: "status" },
  // { heading: "Thao tác", sortingVale: "action" },
];
const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return (
        <Badge bg=" badge-lg " className='badge-danger '>
         CHƯA TƯ VẤN
        </Badge>
      );
    case 1:
      return (
        <Badge bg="  " className='badge-warning '>
          ĐANG ĐANG TƯ VẤN
        </Badge>
      );
    case 2:
      return (
        <Badge bg="" className='badge-success '>
        ĐÃ TƯ VẤN  
        </Badge>
      );
    default:
      return null; 
  }
};
const Registration = () => {
  const [sort, setSortata] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const [test, setTest] = useState(0);
  const [feeData, setFeeData] = useState([]);
  const [iconData, setIconDate] = useState({ complete: false, ind: null });
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [selectedConsultantId, setSelectedConsultantId] = useState("");
  // const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedConsultantName, setSelectedConsultantName] = useState("");


  const customers = useSelector((state)=>state.auth.userById);


  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const customerId = jwtDecode(token).UserId;

  const registrationProfileByCustomerId = useSelector(
    (state) => state?.registration?.registrationForms
  );
// console.log("registrationProfileByCustomerId:",registrationProfileByCustomerId)
const getFullName = (customerId) => {
  if (!customers || !Array.isArray(customers)) {
    return "Không tìm thấy";
  }

  const customer = customers.find((customer) => customer.customerId == customerId);

  return customer ? customer.fullName : "Không tìm thấy tên";
};

  const getCustomerImage  = (customerId) => {
    if (!customers || !Array.isArray(customers)) {
      return "Không tìm thấy";
    }
  
    const customer = customers.find((customer) => customer.customerId === customerId);
    
    return customer ? customer.img : "Không tìm thấy ảnh";
  };
  const getFullNameByConsultantId = (consultantId) => {
    const consultant = consultants.find((c) => c.consultantId === consultantId);
    return consultant ? consultant.userName : "Unknown";
  };
  const consultants = useSelector((state) => state.auth.consultants);

  useEffect(() => {
    dispatch(getConsultants());
  }, [dispatch]);


  useEffect(() => {
    if (customers) {
      setFeeData(customers);
    }
  }, [customers]);

  useEffect(() => {
    if (registrationProfileByCustomerId) {
      setInitialList(registrationProfileByCustomerId);
    }
  }, [registrationProfileByCustomerId]);

  useEffect(() => {
    dispatch(getRegistration());
  }, [dispatch]);

  // const registrationStatusList = useSelector((state) => state.auth.registrationStatusList);
  // console.log("registrationStatusList",registrationStatusList)
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

  const { loading } = useSelector((state) => state.registration);

  function searchData(searchTerm) {
    if (searchTerm.trim() !== "") {
      const filteredData = initialList.filter((registration) => {
        return (
          registration.majorChoose.toLowerCase().includes(searchTerm) ||
          registration.programChoose.toLowerCase().includes(searchTerm) ||
          getFullName(registration.customerId).toLowerCase().includes(searchTerm)
        );
      });
      setSearchResults(filteredData);
    } else {
      setSearchResults(initialList);
    }
  }

  const handleClickName = (registration) => {
    setSelectedRegistration(registration);
    setShowCheckModal(true);
  };

  const handleUpdateRegistration = () => {
    if (selectedConsultantId === "") {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn consultant",
      });
    } else {
      dispatch(
        updateRegistrationById({
          registrationFormId: selectedRegistration.registrationFormId,
          consultantId: selectedConsultantId,
        })
      ).then(() => {
        setShowCheckSuccess(true);
        handleCloseCheckModal();
  
        dispatch(getRegistration());
          Swal.fire({
        icon: "success",
        title: "Cập nhật tư vấn viên thành công!",
        text: `Đã cập nhật tư vấn viên cho đơn tư vấn có ID: ${selectedRegistration.registrationFormId}`,
        showConfirmButton: false,
        timer: 3000,
      });
      }).catch((error) => {
        console.error("Error updating registration:", error);
      });
    }
  };
  

  
  
  
  
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
                            Hiển thị
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
                              onChange={(e) => searchData(e.target.value.toLowerCase())}
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
                          {(searchResults.length > 0 ? searchResults : initialList).map(
                            (registration) => (
                              <tr key={registration.id}>
                                <td>
                                 
                                    {registration.registrationFormId}
                                </td>
                                <Link
                                    onClick={() =>
                                      handleClickName(registration)
                                    }
                                  >
                                <td>{registration.majorChoose}</td>
                                </Link>
                                <td>{registration.programChoose}</td>
                                <td>{getFullNameByConsultantId(registration.consultantId)}</td>
                                <td>
                                {getStatusLabel(registration.status)}

                                </td>
                                {/* <td style={{ display: "flex", alignItems: "center" }}>
                                 
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
                                </td> */}
                              </tr>
                            )
                          )}
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
          {/* Modal */}
          <Modal show={showCheckModal} onHide={handleCloseCheckModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Thông tin chi tiết đơn tư vấn - Mã ID:{" "}
                {selectedRegistration &&
                  selectedRegistration.registrationFormId}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedRegistration && (
                <div style={{ display: "flex",  }}>
                  <div>
                    <img
                      src={getCustomerImage(selectedRegistration.customerId)}
                      style={{ width: "300px", marginRight: "20px" }}
                      alt="Customer Avatar"
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold", color: "#007bff" }}>
                      Thông tin chi tiết:
                    </p>
                    <p>
                      <span>
                        Tên khách hàng:{" "}
                        <span style={{ color: "#007bff" }}>
                          {getFullName(selectedRegistration.customerId)}
                        </span>
                      </span>
                    </p>
                    <p>
                      <span>
                        Chuyên ngành đã chọn:{" "}
                        <span style={{ color: "#007bff" }}>
                          {selectedRegistration.majorChoose}
                        </span>
                      </span>
                    </p>
                    <p>
                      Chương trình đã chọn:{" "}
                      <span style={{ color: "#007bff" }}>
                        {selectedRegistration.programChoose}
                      </span>
                    </p>
                    <p>
  Tư vấn viên phụ trách:{" "}
  <span style={{ color: "#007bff" }}>
    {getFullNameByConsultantId(selectedRegistration.consultantId)}
  </span>
</p>

                    <p>
                      Khu vực:{" "}
                      <span style={{ color: "#007bff" }}>
                        {selectedRegistration.area}
                      </span>{" "}
                    </p>
                  
                  </div>
                  <div className="ml-4">
                    <p style={{ fontWeight: "bold", color: "#007bff" }}>
                      Lý do và ưu tiên:
                    </p>
                    <div>
                      <p>
                        Lý do du học:{" "}
                        <span style={{ color: "#007bff" }}>
                          {selectedRegistration.studyAbroadReason}
                        </span>
                      </p>
                      <p>
                        Lý do chọn điểm đến:{" "}
                        <span style={{ color: "#007bff" }}>
                          {selectedRegistration.destinationReason}
                        </span>
                      </p>
                      <p>
                      Thông tin thêm:{" "}
                      <span style={{ color: "#007bff" }}>
                        {selectedRegistration.moreInformation}
                      </span>
                    </p>
                    <p>
                    <Form.Select
  value={selectedConsultantId}
  onChange={(e) => setSelectedConsultantId(e.target.value)}
>
  <option value="">Chọn Consultant</option>
  {consultants.map((consultant) => (
    <option key={consultant.consultantId} value={consultant.consultantId}>
      {consultant.userName}
    </option>
  ))}
</Form.Select>

        </p>
        {/* <p>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Chọn Trạng thái
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedStatus(0)}>
                Đã hủy
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus(1)}>
                Chưa duyệt
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus(2)}>
                Đã duyệt
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </p> */}
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCheckModal}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleUpdateRegistration}>
                Duyệt
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                Xóa đơn tư vấn - Mã ID:{" "}
                {selectedRegistration && selectedRegistration.registrationFormId}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn xóa đơn tư vấn này không?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Hủy
              </Button>
              <Button variant="danger">
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Registration;
