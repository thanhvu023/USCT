import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../customer-components/contants/theme-student";
import { Row, Dropdown, Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const holidayTable = [
  {
    id: 1,
    name: "Garrett Winters",
    email: "info@example.com",
    profile: IMAGES.smallpic10,
    description: "Mô tả 1safsafsafsadfsafsafsfsadf"
  },
  {
    id: 2,
    name: "Airi Satou",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 2"
  },
  {
    id: 3,
    name: "Tiger Nixon",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 3"
  },
  {
    id: 4,
    name: "Cedric Kelly",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 4"
  },
  {
    id: 5,
    name: "Gavin Joyce",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 5"
  },
  {
    id: 6,
    name: "Angelica Ramos",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 6"
  },
  {
    id: 7,
    name: "Paul Byrd",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 7"
  },
  {
    id: 8,
    name: "Ashton Cox",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 8"
  },
  {
    id: 9,
    name: "Rhona Davidson",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 9"
  },
  {
    id: 10,
    name: "Colleen Hurst",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 10"
  },
  {
    id: 11,
    name: "John Doe",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 11"
  },
  {
    id: 12,
    name: "Jane Smith",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 12"
  },
  {
    id: 13,
    name: "Michael Johnson",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 13"
  },
  {
    id: 14,
    name: "Emily Brown",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 14"
  },
  {
    id: 15,
    name: "William Wilson",
    email: "info@example.com",
    profile: IMAGES.smallpic9,
    description: "Mô tả 15"
  }
];

const theadData = [
  { heading: "Avatar", sortingVale: "profile" },
  { heading: "Họ và tên", sortingVale: "name" },
  { heading: "Email", sortingVale: "email" },
  { heading: "Mô tả", sortingVale: "description" },
  { heading: "Thời gian tạo", sortingVale: "join" },
  { heading: "Thao tác", sortingVale: "action" },
];


const AllConsultant = () => {
  const [sort, setSortata] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const [test, setTest] = useState(0);
  const [feeData, setFeeData] = useState([]);
  const [iconData, setIconData] = useState({ complete: false, ind: null });
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleEditClick = () => {
    handleShowModal();
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
  useEffect(() => {
    setFeeData([...holidayTable]);
    setData(document.querySelectorAll("#holidayList tbody tr"));
  }, [test]);

  useEffect(() => {
    activePag.current === 0 && changeData(0, sort);
  }, [sort]);

  let pagination = Array(Math.ceil(feeData.length / sort))
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
    changeData(activePag.current * sort, (activePag.current + 1) * sort);
    setTest(i);
  };

  const sortingData = (name) => {
    const sortedPeople = [...feeData];
    switch (name) {
      case "name":
      case "cccd":
      case "gender":
      case "dob":
      case "mobile":
      case "email":
      case "address":
      case "join":
        sortedPeople.sort((a, b) =>
          iconData.complete
            ? a[name].localeCompare(b[name])
            : b[name].localeCompare(a[name])
        );
        break;
      default:
        break;
    }
    setFeeData(sortedPeople);
  };

  const dataSearch = (e) => {
    const updatedData = holidayTable.filter((item) => {
      let searchData = `${item.name} ${item.address} ${item.mobile} ${item.email}`.toLowerCase();
      return searchData.includes(e.target.value.toLowerCase());
    });
    setFeeData([...updatedData]);
  };

  return (
    <>
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách khách hàng</h4>
              <Link to="/add-staff" className="btn btn-primary">
                + Thêm mới
              </Link>
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
                          onChange={dataSearch}
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
                              sortingData(item.sortingValue);
                              setIconData((prevState) => ({
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
                      {feeData.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            <img
                              className="rounded-circle"
                              width="35"
                              src={data.profile}
                              alt=""
                            />{" "}
                          </td>
                          <td>{data.name}</td>
                       
                         
                          <td>
                            <Link to="#">
                              <strong>{data.email}</strong>
                            </Link>
                          </td>
                          <td>{data.description}</td>
                          <td>{data.join}</td>
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
                              onClick={handleEditClick}

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
                              onClick={handleShowDeleteModal}
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
                      {(activePag.current + 1) * sort < feeData.length
                        ? (activePag.current + 1) * sort
                        : feeData.length}{" "}
                      of {feeData.length} entries
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
                        {pagination.map((number, i) => (
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
                          activePag.current === pagination.length - 1
                            ? "disabled"
                            : ""
                        }`}
                        onClick={() =>
                          activePag.current + 1 < pagination.length &&
                          onClick(activePag.current + 1)
                        }
                        disabled={activePag.current === pagination.length - 1}
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="row">
    {/* Avatar section */}
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="avatar" className="form-label">
          Avatar (Tên ảnh)
        </label>
        <input type="text" className="form-control" id="avatar" />
      </div>
      <div className="mb-3">
        <label htmlFor="avatarLink" className="form-label">
          Avatar (Link Firebase)
        </label>
        <input type="text" className="form-control" id="avatarLink" />
      </div>
    </div>
    {/* Personal information section */}
    <div className="col-md-6">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Họ và tên
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Mô tả
        </label>
        <textarea className="form-control" id="description" rows="3"></textarea>
      </div>
    </div>
  </div>
  {/* Other information */}
  {/* Các trường thông tin khác */}
</Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Đóng
    </Button>
    <Button variant="primary" onClick={handleCloseModal}>
      Lưu thay đổi
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default AllConsultant;