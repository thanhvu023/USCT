import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllProgram,
    getProgramTypes,
    getProgramById,
    updateProgram,
    createProgram,
    deleteProgram
  } from "../../../redux/slice/programSlice";
  import { getAllMajor, getMajorById } from "../../../redux/slice/majorSlice";
  import { getAllSemester } from "../../../redux/slice/semesterSlice";
  import{getAllUniversity} from '../../../redux/slice/universitySlice'

import "./program.css";
import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const CreateProgramModal = ({ show, onClose, onSubmit, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
<Modal show={show} onHide={onClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Tạo chương trình mới</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="row">
      <div className="col">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="nameProgram">Tên chương trình:</label>
            <input
              type="text"
              className="form-control"
              id="nameProgram"
              name="nameProgram"
              value={formData.nameProgram}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Trạng thái:</label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="universityId">University ID:</label>
            <input
              type="text"
              className="form-control"
              id="universityId"
              name="universityId"
              value={formData.universityId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="majorId">Major ID:</label>
            <input
              type="text"
              className="form-control"
              id="majorId"
              name="majorId"
              value={formData.majorId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="semesterId">Semester ID:</label>
            <input
              type="text"
              className="form-control"
              id="semesterId"
              name="semesterId"
              value={formData.semesterId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="programTypeId">Program Type ID:</label>
            <input
              type="text"
              className="form-control"
              id="programTypeId"
              name="programTypeId"
              value={formData.programTypeId}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="col">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="duration">Thời lượng:</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tuition">Học phí:</label>
            <input
              type="text"
              className="form-control"
              id="tuition"
              name="tuition"
              value={formData.tuition}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="level">Level:</label>
            <input
              type="text"
              className="form-control"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Ảnh:</label>
            <input
              type="text"
              className="form-control"
              id="img"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="responsibilities">Trách nhiệm:</label>
            <textarea
              className="form-control"
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="requirement">Yêu cầu:</label>
            <textarea
              className="form-control"
              id="requirement"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onClose}>
      Đóng
    </Button>
    <Button variant="primary" onClick={onSubmit}>
      Tạo mới
    </Button>
  </Modal.Footer>
</Modal>

  );
};
const AllPrograms = () => {
  const dispatch = useDispatch();
  const [feeData, setFeeData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
  // Thêm trạng thái mới để theo dõi sự thay đổi của dữ liệu chương trình sau khi chỉnh sửa
const [programUpdated, setProgramUpdated] = useState(false);
  const programTypes = useSelector((state) => state.program.programTypes);
  const majors = useSelector((state) => state.major.allMajor);
  const programs = useSelector((state) => state.program.programs);
  const semesters = useSelector((state)=> state.semester.allSemester)
  const universities = useSelector((state)=> state.university.universities)
  // console.log("semesters:",programs)
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

  const [formData, setFormData] = useState({
    nameProgram: "",
    status: "",
    duration: "",
    description: "",
    tuition: '',
    level: "",
    img: "",
    responsibilities: "",
    requirement: "",
    universityId: '',
    majorId: '',
    semesterId: '',
    programTypeId: '',
  });

  const handleDelete = (programId) => {
    // Gọi hàm deleteProgram khi người dùng xác nhận xóa chương trình
    dispatch(deleteProgram(programId));
  };
  // Hàm mở modal tạo mới chương trình
  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  // Hàm đóng modal tạo mới chương trình
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    // Có thể làm gì đó sau khi đóng modal, ví dụ: làm mới dữ liệu form, vv.
  };

  const handleSubmitCreateProgram = () => {
    // Gọi hàm createProgram để tạo mới một chương trình
    dispatch(createProgram(formData)).then(() => {
      // Gọi lại API để lấy danh sách tất cả các chương trình
      dispatch(getAllProgram());
    });  // dispatch action với dữ liệu của form
    
    handleCloseCreateModal(); // Đóng modal sau khi tạo chương trình thành công
  };
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
        // Đặt trạng thái cập nhật chương trình thành true
        setProgramUpdated(true);
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra trong quá trình cập nhật
        console.error("Error updating program:", error);
      });
  };
  useEffect(() => {
    // Nếu trạng thái cập nhật chương trình là true, gọi lại API để lấy danh sách chương trình mới
    if (programUpdated) {
      dispatch(getAllProgram());
      // Đặt lại trạng thái cập nhật chương trình về false sau khi đã cập nhật xong
      setProgramUpdated(false);
    }
  }, [programUpdated, dispatch]);
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
                    <h3 className="mt-4 mb-1" style={{ fontSize: "24px" }}>{program.nameProgram}</h3>
                    {/* <img
          src={"assets/img/course/programs.jpg"}
          alt="img"
          className="img-fluid"
        /> */}
                    <p className="text-muted" >
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
                onClick={handleShowCreateModal}
                className="btn btn-primary"
              >
                + Thêm mới
              </button>
              <CreateProgramModal
        show={showCreateModal} // Truyền trạng thái của modal
        onClose={handleCloseCreateModal} // Truyền hàm đóng modal
        onSubmit={handleSubmitCreateProgram} // Truyền hàm xử lý khi gửi form tạo mới chương trình
        formData={formData} // Truyền dữ liệu form vào modal
        setFormData={setFormData} // Truyền hàm setFormData để cập nhật dữ liệu form
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
  <Modal.Header>
    <Modal.Title><strong>Chỉnh sửa chương trình</strong></Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProgramForEdit && (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nameProgram"><strong>Tên chương trình:</strong></label>
              <input
                type="text"
                className="form-control"
                id="nameProgram"
                defaultValue={selectedProgramForEdit.nameProgram}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, nameProgram: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="semesterId"><strong>Học kỳ bắt đầu:</strong></label>
              <input
                type="text"
                className="form-control"
                id="semesterId"
                defaultValue={selectedProgramForEdit.semesterId}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, semesterId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status"><strong>Trạng thái:</strong></label>
              <input
                type="text"
                className="form-control"
                id="status"
                defaultValue={selectedProgramForEdit.status}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, status: e.target.value })}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="duration"><strong>Thời lượng:</strong></label>
              <input
                type="text"
                className="form-control"
                id="duration"
                defaultValue={selectedProgramForEdit.duration}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, duration: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tuition"><strong>Học phí:</strong></label>
              <input
                type="text"
                className="form-control"
                id="tuition"
                defaultValue={selectedProgramForEdit.tuition}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, tuition: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="level"><strong>Level:</strong></label>
              <input
                type="text"
                className="form-control"
                id="level"
                defaultValue={selectedProgramForEdit.level}
                onChange={(e) => setEditedProgram({ ...selectedProgramForEdit, level: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description"><strong>Mô tả:</strong></label>
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
          <label htmlFor="responsibilities"><strong>Trách nhiệm:</strong></label>
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
          <label htmlFor="requirement"><strong>Yêu cầu:</strong></label>
          <CKEditor
            editor={ClassicEditor}
            data={selectedProgramForEdit.requirement}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditedProgram({ ...selectedProgramForEdit, requirement: data });
            }}
          />
        </div>
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
