import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES } from "./contants/theme-student";
import { Row, Button, Modal, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import "./customer.css";
const holidayTable = [
  {
    id: 1,
    name: "Garrett Winters",
    cccd: "123456789",
    gender: "Male",
    dob: "1990/01/15",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#8901 Demo Road ",
    join: "2020/07/25",
    profile: IMAGES.smallpic9,
  },
  {
    id: 10,
    name: "Airi Satou",
    cccd: "987654321",
    gender: "Female",
    dob: "1995/05/20",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#1001 Demo Road ",
    join: "2021/11/28",
    profile: IMAGES.smallpic9,
  },
  {
    id: 3,
    name: "Tiger Nixon",
    cccd: "234567890",
    gender: "Male",
    dob: "1988/11/30",
    mobile: "123 456 7890",
    email: "info@example.com",
    address: "#8911 Demo Road ",
    join: "2019/04/25",
    profile: IMAGES.smallpic9,
  },
  {
    id: 4,
    name: "Cedric Kelly",
    cccd: "345678901",
    gender: "Male",
    dob: "1992/03/10",
    mobile: "123 456 7890",
    email: "info@example.com",
    address: "#1201 Demo Road ",
    join: "2018/04/25",
    profile: IMAGES.smallpic9,
  },
  {
    id: 2,
    name: "Gavin Joyce",
    cccd: "456789012",
    gender: "Male",
    dob: "1991/07/05",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#8881 Demo Road ",
    join: "2020/04/25",
    profile: IMAGES.smallpic9,
  },
  {
    id: 9,
    name: "Angelica Ramos",
    cccd: "567890123",
    gender: "Female",
    dob: "1985/09/12",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#4101 Demo Road ",
    join: "2015/08/25",
    profile: IMAGES.smallpic9,
  },
  {
    id: 7,
    name: "Paul Byrd",
    cccd: "678901234",
    gender: "Male",
    dob: "1993/02/28",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#3301 Demo Road ",
    join: "2023/09/01",
    profile: IMAGES.smallpic9,
  },
  {
    id: 8,
    name: "Ashton Cox",
    cccd: "789012345",
    gender: "Male",
    dob: "1987/06/20",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#4401 Demo Road ",
    join: "2015/02/22",
    profile: IMAGES.smallpic9,
  },
  {
    id: 6,
    name: "Rhona Davidson",
    cccd: "890123456",
    gender: "Female",
    dob: "1994/10/17",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#8801 Demo Road ",
    join: "2018/06/12",
    profile: IMAGES.smallpic9,
  },
  {
    id: 5,
    name: "Colleen Hurst",
    cccd: "901234567",
    gender: "Female",
    dob: "1996/12/25",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#9901 Demo Road ",
    join: "2021/11/19",
    profile: IMAGES.smallpic9,
  },
  {
    id: 11,
    name: "John Doe",
    cccd: "012345678",
    gender: "Male",
    dob: "1980/08/12",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#1234 Demo Road ",
    join: "2022/03/15",
    profile: IMAGES.smallpic9,
  },
  {
    id: 12,
    name: "Jane Smith",
    cccd: "123456789",
    gender: "Female",
    dob: "1982/05/25",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#5678 Demo Road ",
    join: "2023/09/28",
    profile: IMAGES.smallpic9,
  },
  {
    id: 13,
    name: "Michael Johnson",
    cccd: "234567890",
    gender: "Male",
    dob: "1984/11/18",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#9876 Demo Road ",
    join: "2019/07/10",
    profile: IMAGES.smallpic9,
  },
  {
    id: 14,
    name: "Emily Brown",
    cccd: "345678901",
    gender: "Female",
    dob: "1986/04/30",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#2468 Demo Road ",
    join: "2020/11/05",
    profile: IMAGES.smallpic9,
  },
  {
    id: 15,
    name: "William Wilson",
    cccd: "456789012",
    gender: "Male",
    dob: "1988/10/08",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#1357 Demo Road ",
    join: "2017/02/20",
    profile: IMAGES.smallpic9,
  },
  {
    id: 16,
    name: "Emma Taylor",
    cccd: "567890123",
    gender: "Female",
    dob: "1990/02/14",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#3698 Demo Road ",
    join: "2016/08/30",
    profile: IMAGES.smallpic9,
  },
  {
    id: 17,
    name: "James Martinez",
    cccd: "678901234",
    gender: "Male",
    dob: "1992/06/22",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#7531 Demo Road ",
    join: "2018/04/12",
    profile: IMAGES.smallpic9,
  },
  {
    id: 18,
    name: "Olivia Brown",
    cccd: "789012345",
    gender: "Female",
    dob: "1994/12/05",
    mobile: "987 654 3210",
    email: "info@example.com",
    address: "#8523 Demo Road ",
    join: "2015/10/25",
    profile: IMAGES.smallpic9,
  },
  {
    id: 19,
    name: "Alexander Garcia",
    cccd: "890123456",
    gender: "Male",
    dob: "1996/08/28",
    mobile: "(123) 4567 890",
    email: "info@example.com",
    address: "#9632 Demo Road ",
    join: "2021/06/17",
    profile: IMAGES.smallpic9,
  },
  {
    id: 20,
    name: "Sophia Rodriguez",
    cccd: "901234567",
    gender: "Female",
    dob: "1998/04/03",
    mobile: "987 654 3210",
    email: "info@example.com    ",
    address: "#7410 Demo Road ",
    join: "2014/12/19",
    profile: IMAGES.smallpic9,
  },
];

const theadData = [
  { heading: "Avatar", sortingVale: "profile" },
  { heading: "Họ và tên", sortingVale: "name" },
  { heading: "Mã số CCCD", sortingVale: "cccd" },
  { heading: "Giới tính", sortingVale: "gender" },
  { heading: "Ngày sinh", sortingVale: "dob" },
  { heading: "Số điện thoại", sortingVale: "mobile" },
  { heading: "Email", sortingVale: "email" },
  { heading: "Địa chủ", sortingVale: "address" },
  { heading: "Thời gian tạo", sortingVale: "join" },
  { heading: "Thao tác", sortingVale: "action" },
];

const AllCustomer = () => {
  const [sort, setSortata] = useState(10);
  const [data, setData] = useState([]);
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [feeData, setFeeDate] = useState([...holidayTable]);
  const [iconData, setIconDate] = useState({ complete: false, ind: null });
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

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
    setFeeDate(sortedPeople);
  }

  function DataSearch(e) {
    const updatesDate = holidayTable.filter((item) => {
      let selectdata =
        `${item.name} ${item.address} ${item.designation} ${item.mobile}`.toLowerCase();
      return selectdata.includes(e.target.value.toLowerCase());
    });
    setFeeDate([...updatesDate]);
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
                          <td>{data.cccd}</td>
                          <td>{data.gender}</td>
                          <td>{data.dob}</td>
                          <td>
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
                          <td>{data.join}</td>
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
  );
};

export default AllCustomer;
