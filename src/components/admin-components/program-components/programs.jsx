import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllProgram,
    getProgramTypes,
    getProgramById,
    updateProgram
  } from "../../../redux/slice/programSlice";
  import { getAllMajor, getMajorById } from "../../../redux/slice/majorSlice";
  import { getAllSemester } from "../../../redux/slice/semesterSlice";
  import{getAllUniversity} from '../../../redux/slice/universitySlice'

import "./program.css";
import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CreateProgramModal = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
      nameProgram: "",
      status: "",
      duration: "",
      description: "",
      tuition: 0,
      level: "",
      img: "",
      responsibilities: "",
      requirement: "",
      universityId: 0,
      majorId: 0,
      semesterId: 0,
      programTypeId: 0,
    });
  
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleCKEditorChange = (editorData, editor) => {
      const name = editor.name;
      setFormData({
        ...formData,
        [name]: editorData,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Gửi dữ liệu formData lên backend hoặc xử lý dữ liệu ở đây
      console.log(formData);
      // Đóng modal sau khi xử lý
      onClose();
    };
  
    return (
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo mới chương trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formNameProgram">
                  <Form.Label>Tên chương trình</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên chương trình"
                    name="nameProgram"
                    value={formData.nameProgram}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Trạng thái</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      name="statusActive"
                      defaultChecked={formData.statusActive}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Inactive"
                      name="statusInactive"
                      defaultChecked={formData.statusInactive}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
  
                <Form.Group controlId="formDuration">
                  <Form.Label>Thời gian học</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập thời gian học"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTuition">
                  <Form.Label>Học phí</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập học phí"
                    name="tuition"
                    value={formData.tuition}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formLevel">
                  <Form.Label>Trình độ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập trình độ"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formImg">
                  <Form.Label>Link ảnh</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập link ảnh"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formUniversity">
                  <Form.Label>Trường đại học</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập trường đại học"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMajor">
                  <Form.Label>Chuyên ngành</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập chuyên ngành"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSemester">
                  <Form.Label>Học kỳ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập học kỳ"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProgramType">
                  <Form.Label>Loại chuyên ngành</Form.Label>
                  <Form.Control
                    as="select"
                    name="programType"
                    value={formData.programType}
                    onChange={handleChange}
                  >
                    <option value="">Chọn loại chuyên ngành</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                    <option value="type3">Type 3</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formResponsibilities">
                  <Form.Label>Trách nhiệm</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    name="responsibilities"
                    data={formData.responsibilities}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleCKEditorChange(data, editor);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formRequirement">
                  <Form.Label>Yêu cầu</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    name="requirement"
                    data={formData.requirement}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleCKEditorChange(data, editor);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Tạo mới
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
const AllPrograms = () => {
  const dispatch = useDispatch();
  const [feeData, setFeeData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [editedProgram, setEditedProgram] = useState(null);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
  const programTypes = useSelector((state) => state.program.programTypes);
  const majors = useSelector((state) => state.major.allMajor);
  const programs = useSelector((state) => state.program.programs);
  const semesters = useSelector((state)=> state.semester.allSemester)
  const universities = useSelector((state)=> state.university.universities)
  console.log("semesters:",programs)
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const loading = useSelector((state) => state.program.loading);
  const [showAllPrograms, setShowAllPrograms] = useState(true);
  const [editedProgram, setEditedProgram] = useState({
    programId: '',
    nameProgram: '',
    status: '',
    duration: '',
    description: '',
    tuition: '',
    level: '',
    responsibilities: '',
    requirement: '',
    universityId: '',
    majorId: '',
    semesterId: '',
    programTypeId: ''
  } ?? {});

  // Gọi API để lấy danh sách tất cả các chương trình khi trang được tải
  useEffect(() => {
    dispatch(getAllProgram());
    dispatch(getAllSemester());
    dispatch(getAllMajor());
    dispatch(getAllUniversity());
    dispatch(getProgramTypes());

  }, [dispatch]);

  // Hàm xử lý khi nhấp vào nút "Xem chi tiết"
  const handleShowDetailModal = (programId) => {
    setSelectedProgramId(programId); // Lưu ID của chương trình được chọn
    setShowModal(true); // Mở modal
  };

  // Hàm đóng modal
  const handleCloseDetailModal = () => {
    setShowModal(false);
    setSelectedProgramId(null); // Reset ID của chương trình được chọn
    setSelectedProgram(null); // Reset thông tin của chương trình được chọn
  };
  const handleShowEditModal = (programId) => {
    const program = programs.find((p) => p.programId === programId);
    setSelectedProgramForEdit(program);
    // Truyền giá trị của programId vào state editedProgram
    setEditedProgram({
      ...editedProgram,
      programId: programId,
      nameProgram: program.nameProgram, // Nếu bạn muốn hiển thị tên chương trình
      semesterId: program.semesterId, // Nếu bạn muốn hiển thị semesterId
      // Các trường thông tin khác
    });
    setShowEditModal(true);
  };
  // Xử lý hiển thị thông tin của chương trình được chọn trong modal
  useEffect(() => {
    if (selectedProgramId) {
      // Lấy thông tin chi tiết của chương trình từ danh sách đã có
      const program = programs.find((p) => p.programId === selectedProgramId);
      setSelectedProgram(program);
  
    }
  }, [selectedProgramId, programs]);
  

// console.log("edit:",selectedProgramForEdit)
const handleCloseEditModal = () => {
  setShowEditModal(false); // Đóng modal chỉnh sửa chương trình
  if (selectedProgramForEdit) {
    setEditedProgram(null); // Đặt lại dữ liệu của chương trình đang chỉnh sửa về null
  }
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
  const handleToggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const getTypeName = (programTypeId) => {
    if (!programTypes) return "";

    const programType = programTypes.find(
      (type) => type.programTypeId === programTypeId
    );
    return programType ? programType.typeName : "";
  };
  const getMajorName = (majorId) => {
    const major = majors.find((major) => major.majorId === majorId);
    return major ? major.majorName : "Unknown";
  };
  const getSemesterStartDate = (semesterId) => {
    const semester = semesters.find((semester) => semester.semesterId === semesterId);
    return semester ? semester.startDate : "Unknown";
  };
  const getSemesterEndDate = (semesterId) => {
    const semester = semesters.find((semester) => semester.semesterId === semesterId);
    return semester ? semester.endDate : "Unknown";
  };
  const getProgramName = (programId) => {
    const program = programs.find((program) => program.id === programId);
    return program ? program.programName : "Unknownprogram";
  };
  const getUniversityName = (universityId) => {
    const university = universities.find((university) => university.id === universityId);
    return university ? university.universityName : "Unknownhihi";
  };
  
  const dataSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      // Nếu không có giá trị tìm kiếm, hiển thị tất cả chương trình
      setFeeData([...programs]);
      setShowAllPrograms(true);
    } else {
      // Nếu có giá trị tìm kiếm, lọc dữ liệu từ API
      const updatedData = programs.filter((item) => {
        // Hãy thay thế các trường sau với các trường tương ứng từ API của bạn
        let searchData =
          `${item.nameProgram} ${item.programTypeId} ${item.majorId} ${item.createDate}`.toLowerCase();
        return searchData.includes(searchValue);
      });
      setFeeData([...updatedData]);
      setShowAllPrograms(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm dispatch để gửi thông tin chương trình đã chỉnh sửa lên server
    dispatch(updateProgram(editedProgram))
      .unwrap()
      .then((data) => {
        // Xử lý khi cập nhật thành công, có thể đóng modal hoặc cập nhật lại danh sách chương trình
        handleCloseEditModal();
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra trong quá trình cập nhật
        console.error("Error updating program:", error);
      });
  };
  

  const renderPrograms = () => {
    return (
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : showAllPrograms ? (
          programs.map((program, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={index}>
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
                          <button
                            onClick={() => handleShowEditModal(program.programId)}
                            className="dropdown-item"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={handleShowDeleteModal}
                            className="dropdown-item text-danger"
                          >
                            Xóa
                          </button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
           
                  <div className="">
                    <h3 className="mt-4 mb-1">{program.nameProgram}</h3>
                    {/* <img
          src={"assets/img/course/programs.jpg"}
          alt="img"
          className="img-fluid"
        /> */}
                    <p className="text-muted">
                      {getTypeName(program.programTypeId)}
                    </p>
                    <ul className="list-group mb-3 list-group-flush">
                      <li className="list-group-item px-0 d-flex justify-content-between">
                        <span className="mb-0" style={{ fontWeight: "400" }}>
                          Chuyên ngành:
                        </span>
                        <strong style={{ fontSize: "14px" }}>
                          {getMajorName(program.majorId)}
                        </strong>
                      </li>

                      <li className="list-group-item px-0 d-flex justify-content-between">
                        <span className="mb-0">Ngày tạo :</span>
                        <strong>{program.createDate}</strong>
                      </li>
                      <li className="list-group-item px-0 d-flex justify-content-between">
                        <span className="mb-0">Ngày sửa đổi :</span>
                        <strong>{program.modifiedDate}</strong>
                      </li>
                    </ul>
                    <button
  className="btn btn-primary btn-rounded mt-3 px-4"
  onClick={() => handleShowDetailModal(program.programId)}  >
  Xem thêm
</button>

                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          feeData.map((program, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={index}>
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
                        <button
                          onClick={() => handleShowEditModal(program.programId)}
                          className="dropdown-item"
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          onClick={handleShowDeleteModal}
                          className="dropdown-item text-danger"
                        >
                          Xóa
                        </button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
         
                <div className="text-center">
                  <h3 className="mt-4 mb-1">{program.nameProgram}</h3>
                  {/* <img
        src={"assets/img/course/programs.jpg"}
        alt="img"
        className="img-fluid"
      /> */}
                  <p className="text-muted">
                    {getTypeName(program.programTypeId)}
                  </p>
                  <ul className="list-group mb-3 list-group-flush">
                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="mb-0" style={{ fontWeight: "400" }}>
                        Chuyên ngành:
                      </span>
                      <strong style={{ fontSize: "14px" }}>
                        {getMajorName(program.majorId)}
                      </strong>
                    </li>

                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="mb-0">Ngày tạo :</span>
                      <strong>{program.createDate}</strong>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="mb-0">Ngày sửa đổi :</span>
                      <strong>{program.modifiedDate}</strong>
                    </li>
                  </ul>
                  <button
className="btn btn-primary btn-rounded mt-3 px-4"
onClick={() => handleShowDetailModal(program.programId)}  >
Xem thêm
</button>

                </div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    );
  };


  return (
    <div>
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
              <button
                onClick={handleToggleCreateModal}
                className="btn btn-primary"
              >
                + Thêm mới
              </button>
              <CreateProgramModal
                show={showCreateModal}
                onClose={handleToggleCreateModal}
              />
            </div>
          </div>

          {renderPrograms()}
        </div>
      </Row>

      <Modal show={showModal} onHide={handleCloseDetailModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Chi tiết chương trình </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {selectedProgram && (
    <div className="row">
      <div className="col-md-5">
        <img
          src={"assets/img/course/programs.jpg"}
          alt="img"
          className="img-fluid"
        />
      </div>
      <div className="col-md-7">
        <h4>{selectedProgram.nameProgram}</h4>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Start Semester:</strong> {getSemesterStartDate(selectedProgram.semesterId)}</p>
            <p><strong>End Semester:</strong> {getSemesterEndDate(selectedProgram.semesterId)}</p>
            <p><strong>Thời lượng:</strong> {selectedProgram.duration}</p>
            <p><strong>Level:</strong> {selectedProgram.level}</p>
          </div>
          <div className="col-md-6">
            <p><strong>University ID:</strong> {getUniversityName(selectedProgram.universityName)}</p>
            <p><strong>Major ID:</strong> {getMajorName(selectedProgram.majorId)}</p>
            <p><strong>Program Type ID:</strong> {getTypeName(selectedProgram.programTypeId)}</p>
            <p><strong>Status:</strong> {selectedProgram.status}</p>
          </div>
        </div>
        <div>
          <p><strong>Mô tả:</strong> {selectedProgram.description}</p>
          <p><strong>Học phí:</strong> {selectedProgram.tuition}</p>
          <p>
  <strong>Trách nhiệm:</strong>{" "}
  <span
    dangerouslySetInnerHTML={{ __html:selectedProgram.responsibilities.replace(/\\r\\n/g, "<br/>• ")  }}
  ></span>
</p>
          <p><strong>Yêu cầu:</strong>  <span
    dangerouslySetInnerHTML={{ __html: selectedProgram.requirement.replace(/\\r\\n/g, "<br/>• ") }}
  ></span></p>
        </div>
      </div>
    </div>
  )}
</Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDetailModal} >
      Đóng
    </Button>
  </Modal.Footer>
</Modal>

                           {/* Edit */}
                           <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
  <Modal.Header >
  </Modal.Header>
  <Modal.Body>
    {selectedProgramForEdit && (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            
            <div className="form-group">
              <label htmlFor="nameProgram">Tên chương trình:</label>
              <input
                type="text"
                className="form-control"
                id="nameProgram"
                value={selectedProgramForEdit.nameProgram}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, nameProgram: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="semesterId">Học kỳ bắt đầu:</label>
              <input
                type="text"
                className="form-control"
                id="semesterId"
                value={selectedProgramForEdit.semesterId}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, semesterId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Trạng thái:</label>
              <input
                type="text"
                className="form-control"
                id="status"
                value={selectedProgramForEdit.status}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, status: e.target.value })}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="duration">Thời lượng:</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                value={selectedProgramForEdit.duration}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, duration: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tuition">Học phí:</label>
              <input
                type="text"
                className="form-control"
                id="tuition"
                value={selectedProgramForEdit.tuition}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, tuition: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="level">Level:</label>
              <input
                type="text"
                className="form-control"
                id="level"
                value={selectedProgramForEdit.level}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, level: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
  <label htmlFor="description">Mô tả:</label>
  <CKEditor
    editor={ClassicEditor}
    data={selectedProgramForEdit.description}
    onChange={(event, editor) => {
      const data = editor.getData();
      setEditedProgram({ ...selectedProgramForEdit, description: data });
    }}
  />
</div>
<div className="form-group">
  <label htmlFor="responsibilities">Trách nhiệm:</label>
  <CKEditor
    editor={ClassicEditor}
    data={selectedProgramForEdit.responsibilities}
    onChange={(event, editor) => {
      const data = editor.getData();
      setEditedProgram({ ...selectedProgramForEdit, responsibilities: data });
    }}
  />
</div>
<div className="form-group">
  <label htmlFor="requirement">Yêu cầu:</label>
  <CKEditor
    editor={ClassicEditor}
    data={selectedProgramForEdit.requirement}
    onChange={(event, editor) => {
      const data = editor.getData();
      setEditedProgram({ ...selectedProgramForEdit, requirement: data });
    }}
  />
</div>

        {/* Các trường thông tin khác */}
        <div className="d-flex justify-content-between">
  <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
    Lưu chỉnh sửa
  </Button>
  <Button variant="secondary" onClick={handleCloseEditModal}>
    Đóng
  </Button>
</div>

       
      </form>
    )}
  </Modal.Body>
  
</Modal>






    </div>
  );
};

export default AllPrograms;
