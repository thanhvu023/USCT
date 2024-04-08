import React, { useState, useRef, useEffect } from "react";
import { Row, Dropdown, Modal, Button,Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './program.css'
import EditProgramModal from "./edit-program";
const gridDataBlog = [
    {
      name: "Chương trình A",
      type: "Loại A",
      field: "Chuyên ngành A",
      createdDate: "01/01/2023",
      modifiedDate: "02/02/2023",
    },
    {
      name: "Chương trình B",
      type: "Loại B",
      field: "Chuyên ngành B",
      createdDate: "03/03/2023",
      modifiedDate: "04/04/2023",
    },
    {
      name: "Chương trình C",
      type: "Loại C",
      field: "Chuyên ngành C",
      createdDate: "05/05/2023",
      modifiedDate: "06/06/2023",
    },
    {
      name: "Chương trình D",
      type: "Loại D",
      field: "Chuyên ngành D",
      createdDate: "07/07/2023",
      modifiedDate: "08/08/2023",
    },
    {
      name: "Chương trình E",
      type: "Loại E",
      field: "Chuyên ngành E",
      createdDate: "09/09/2023",
      modifiedDate: "10/10/2023",
    },
    {
      name: "Chương trình F",
      type: "Loại F",
      field: "Chuyên ngành F",
      createdDate: "11/11/2023",
      modifiedDate: "12/12/2023",
    },
    {
      name: "Chương trình G",
      type: "Loại G",
      field: "Chuyên ngành G",
      createdDate: "01/01/2024",
      modifiedDate: "02/02/2024",
    },
    {
      name: "Chương trình H",
      type: "Loại H",
      field: "Chuyên ngành H",
      createdDate: "03/03/2024",
      modifiedDate: "04/04/2024",
    },
    {
      name: "Chương trình I",
      type: "Loại I",
      field: "Chuyên ngành I",
      createdDate: "05/05/2024",
      modifiedDate: "06/06/2024",
    },
    {
      name: "Chương trình J",
      type: "Loại J",
      field: "Chuyên ngành J",
      createdDate: "07/07/2024",
      modifiedDate: "08/08/2024",
    },
  ];
  

  const AllProgram = () => {
    const [data, setData] = useState(gridDataBlog);
    const [sort, setSortata] = useState(10);
    const [feeData, setFeeData] = useState([]);
    const [showAllPrograms, setShowAllPrograms] = useState(true); 
  const[showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
    const activePag = useRef(0);
    const [test, setTest] = useState(0);
    // const [formData, setFormData] = useState({
    //     name: program.name,
    //     type: program.type,
    //     field: program.field,
    //     createdDate: program.createdDate,
    //     modifiedDate: program.modifiedDate,
    //     university: '',
    //     semester: '',
    //     tuitionFee: '',
    //     englishLevel: '',
    //     description: '',
    //   });
    
     
    
    const dataSearch = (e) => {
      const searchValue = e.target.value.toLowerCase();
      if (searchValue === "") {
        setFeeData([]);
        setShowAllPrograms(true);
      } else {
        const updatedData = gridDataBlog.filter((item) => {
          let searchData = `${item.name} ${item.type} ${item.field} ${item.createdDate}${item.modifiedDate}`.toLowerCase();
          return searchData.includes(searchValue);
        });
        setFeeData(updatedData);
        setShowAllPrograms(false);
      }
    };
  
    const changeData = (first, second) => {
      const newData = data.map((item, index) => {
        if (index >= first && index < second) {
          return { ...item, visible: true };
        } else {
          return { ...item, visible: false };
        }
      });
      setData(newData);
    };
  
    useEffect(() => {
      changeData(0, sort);
    }, [test, sort]);
  
    const handleShowDetailModal = (program) => {
        setSelectedProgram(program);
        setShowModal(true);
      };
    
      const handleCloseDetailModal = () => {
        setShowModal(false);
        setSelectedProgram(null);
      };
      const handleShowEditModal = (program) => {
        setSelectedProgramForEdit(program);
        setShowEditModal(true);
      };
      
      const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedProgramForEdit(null);
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        // setFormData({
        //   ...formData,
        //   [name]: value,
        // });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // You can use formData to send data to backend or update state
        // console.log(formData);
        // Close the modal after handling submission
        // handleClose();
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
    return (
      <>
        <Row>
          <div className="col-lg-12">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách chương trình</h4>
              <div className="dataTables_filter">
                <label>
                  Tìm kiếm :{" "}
                  <input
                    type="search"
                    className="mr-4"
                    placeholder=""
                    onChange={dataSearch}
                  />
                </label>
                <Link to="/add-program" className="btn btn-primary">
                  + Thêm mới
                </Link>
              </div>
            </div>
            <div className="row">
              {(showAllPrograms ? data : feeData).map((item, ind) => (
                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={ind}>
                  <div className="card mx-4 mt-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-end">
                        <Dropdown>
                          <Dropdown.Toggle
                            as="button"
                            className="btn  "
                            type="button"
                          >
                            <span className="fs--1">...</span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            align="end"
                            className="dropdown-menu dropdown-menu-right border py-0"
                          >
                            <div className="py-2">
                            <button onClick={() => handleShowEditModal(item)} className="dropdown-item">
                                Chỉnh sửa
                              </button>
                              <button 
                              onClick={handleShowDeleteModal}
                              className="dropdown-item text-danger">
                                Xóa
                              </button>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="text-center">
                        <h3 className="mt-4 mb-1">{item.name}</h3>
                        <p className="text-muted">{item.type}</p>
                        <ul className="list-group mb-3 list-group-flush">
                          <li className="list-group-item px-0 d-flex justify-content-between">
                            <span className="mb-0">Chuyên ngành :</span>
                            <strong>{item.field}</strong>
                          </li>
                          <li className="list-group-item px-0 d-flex justify-content-between">
                            <span className="mb-0">Ngày tạo :</span>
                            <strong>{item.createdDate}</strong>
                          </li>
                          <li className="list-group-item px-0 d-flex justify-content-between">
                            <span className="mb-0">Ngày sửa đổi :</span>
                            <strong>{item.modifiedDate}</strong>
                          </li>
                        </ul>
                        <button
                          className="btn btn-primary btn-rounded mt-3 px-4"
                          onClick={() => handleShowDetailModal(item)}

                        >
                        Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Row>
        <Modal show={showModal} onHide={handleCloseDetailModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Chi tiết chương trình {selectedProgram && selectedProgram.name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProgram && (
      <div className="row">
        <div className="col-md-6">
          <h5>Thông tin cơ bản</h5>
          <p><strong>Trường:</strong> Há Vợt</p>
          <p><strong>Loại chương trình:</strong> {selectedProgram.type}</p>
          <p><strong>Chuyên ngành:</strong> {selectedProgram.field}</p>
          <p><strong>Ngày tạo:</strong> {selectedProgram.createdDate}</p>
          <p><strong>Ngày sửa đổi:</strong> {selectedProgram.modifiedDate}</p>
        </div>
        <div className="col-md-6">
          <h5>Thông tin chi tiết</h5>
          <p><strong>Học kỳ:</strong> 2025</p>
          <p><strong>Học phí:</strong> 2025</p>
          <p><strong>Trình độ tiếng Anh:</strong> 2025</p>
          <p><strong>Mô tả:</strong> fsdafashuifhasuifhasuifhasuifhasuifhasufihasifoiuashfisuahuhi</p>
        </div>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDetailModal}>
      Đóng
    </Button>
  </Modal.Footer>
</Modal>
<Modal show={showEditModal} onHide={handleCloseEditModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Chỉnh sửa chương trình</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formName">
            <Form.Label>Tên chương trình</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên chương trình"
              name="name"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label>Loại chương trình</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập loại chương trình"
              name="type"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formField">
            <Form.Label>Chuyên ngành</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập chuyên ngành"
              name="field"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCreatedDate">
            <Form.Label>Ngày tạo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập ngày tạo"
              name="createdDate"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formModifiedDate">
            <Form.Label>Ngày sửa đổi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập ngày sửa đổi"
              name="modifiedDate"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formUniversity">
            <Form.Label>Tên trường đại học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên trường đại học"
              name="university"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSemester">
            <Form.Label>Học kỳ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập học kỳ"
              name="semester"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTuitionFee">
            <Form.Label>Học phí</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập học phí"
              name="tuitionFee"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEnglishLevel">
            <Form.Label>Trình độ tiếng Anh</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập trình độ tiếng Anh"
              name="englishLevel"
              value={"fdsafasfas"}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <h5>Mô tả</h5>
      <Form.Group controlId="formDescription">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Nhập mô tả"
          name="description"
          value={"fdsafasfas"}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginTop:'24px'}}>
        Lưu thay đổi
      </Button>
    </Form>
  </Modal.Body>
</Modal>


      </>
    );
  };
  
  export default AllProgram;
