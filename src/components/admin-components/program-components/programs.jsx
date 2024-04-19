import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProgram,
  getProgramTypes,
  getProgramById,
  updateProgram,
  createProgram,
  deleteProgram,
} from "../../../redux/slice/programSlice";
import { getAllMajor, getMajorById } from "../../../redux/slice/majorSlice";
import { getAllSemester } from "../../../redux/slice/semesterSlice";
import { getAllUniversity } from "../../../redux/slice/universitySlice";
import "./program.css";
import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../FirebaseImage/Config";
import CreateProgramModal from "./create-program";
import './program.css'

const AllPrograms = () => {
  const dispatch = useDispatch();
  const [feeData, setFeeData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
  const [programUpdated, setProgramUpdated] = useState(false);
  const programTypes = useSelector((state) => state.program.programTypes);
  const majors = useSelector((state) => state.major.allMajor);
  const programs = useSelector((state) => state.program.programs);
  const semesters = useSelector((state) => state.semester.allSemester);
  const universities = useSelector((state) => state.university.universities);
  const [imgURL, setImgURL] = useState(null);

  // console.log("semesters:",programs)
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const loading = useSelector((state) => state.program.loading);
  const [showAllPrograms, setShowAllPrograms] = useState(true);

  const [editedProgram, setEditedProgram] = useState(
    {
      programId: "",
      nameProgram: "",
      status: "",
      duration: "",
      description: "",
      tuition: "",
      level: "",
      responsibilities: "",
      requirement: "",
      universityId: "",
      majorId: "",
      semesterId: "",
      programTypeId: "",
      img: "",
    } ?? {}
  );

  const [formData, setFormData] = useState({
    nameProgram: "",
    status: "",
    duration: "",
    description: "",
    tuition: "",
    level: "",
    responsibilities: "",
    requirement: "",
    universityId: "",
    majorId: "",
    semesterId: "",
    programTypeId: "",
    img: "",
  });

  const handleImageUpload = async (file) => {
    // Check if file exists
    console.log("Selected File:", file);

    if (file) {
      const imgRef = ref(imageDb, `Image/Program/${file.name}`);
      try {
        await uploadBytes(imgRef, file);
        const imageUrl = await getDownloadURL(imgRef);
        // console.log("imageUrl là:", imageUrl);
        const editedProgramCopy = {
          ...selectedProgramForEdit,
          img: imageUrl,
          major: {
            majorId: selectedProgramForEdit.majorId,
          },
        };
        // console.log("editedProgramCopy:",editedProgramCopy)
        setEditedProgram(editedProgramCopy);
        setSelectedProgramForEdit(editedProgramCopy);
        // setImgURL(imgURL);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleDelete = (programId) => {
    dispatch(deleteProgram(programId));
  };
  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleSubmitCreateProgram = async () => {
    if (formData.img) {
      // Upload ảnh lên Firebase
      await handleImageUpload(formData.img);
    }
    dispatch(createProgram(formData)).then(() => {
      Swal.fire({
        icon: "success",
        title: "Tạo chương trình thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Gọi lại API để lấy danh sách tất cả các chương trình
      dispatch(getAllProgram());
    });
    handleCloseCreateModal();
  };

  useEffect(() => {
    dispatch(getAllProgram());
    dispatch(getAllSemester());
    dispatch(getAllMajor());
    dispatch(getAllUniversity());
    dispatch(getProgramTypes());
  }, [dispatch]);

  const handleShowDetailModal = (programId) => {
    setSelectedProgramId(programId);
    setShowModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowModal(false);
    setSelectedProgramId(null);
    setSelectedProgram(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    if (selectedProgramForEdit) {
      setEditedProgram(null);
    }
  };

  useEffect(() => {
    console.log("programs", programs);
    if (selectedProgramId && programs) {
      const program = programs.find((p) => p.programId === selectedProgramId);

      setSelectedProgram(program);
    }
  }, [selectedProgramId]);

  // console.log("edit:",selectedProgramForEdit)

  // confirm delete
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
  // const handleToggleCreateModal = () => {
  //   setShowCreateModal(!showCreateModal);
  // };

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
    const semester = semesters.find(
      (semester) => semester.semesterId === semesterId
    );
    return semester ? semester.startDate : "Unknown";
  };
  const getSemesterEndDate = (semesterId) => {
    const semester = semesters.find(
      (semester) => semester.semesterId === semesterId
    );
    return semester ? semester.endDate : "Unknown";
  };
  const getProgramName = (programId) => {
    const program = programs.find((program) => program.id === programId);
    return program ? program.programName : "Unknownprogram";
  };
  const getUniversityName = (universityId) => {
    const university = universities.find(
      (university) => university.id === universityId
    );
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

  const handleShowEditModal = (programId) => {
    // find program
    const program = programs.find((p) => p.programId === programId);
    // det init data
    setSelectedProgramForEdit(program);
    console.log({ program });
    console.log({ selectedProgramForEdit });
    // setEditedProgram({
    //   ...editedProgram,
    //   programId: programId,
    //   nameProgram: program.nameProgram,
    //   semesterId: program.semesterId,
    // });
    setShowEditModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm dispatch để gửi thông tin chương trình đã chỉnh sửa lên server
    dispatch(updateProgram(editedProgram))
      .unwrap()
      .then((data) => {
        // Hiển thị thông báo chỉnh sửa chương trình thành công
        Swal.fire({
          icon: "success",
          title: "Chỉnh sửa chương trình thành công!",
          showConfirmButton: false,
          timer: 1500, // Thời gian hiển thị thông báo
        });
        // Đặt trạng thái cập nhật chương trình thành true
        setProgramUpdated(true);
        // Đóng modal chỉnh sửa chương trình
        handleCloseEditModal();
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

  const RenderPrograms = () => {
    return (
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : showAllPrograms ? (
          programs.map((program, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={index}>
              <div className="card mx-4 mt-4">
                <div className="card-body" >
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
                            onClick={() =>
                              handleShowEditModal(program.programId)
                            }
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
                    <h3 className="mt-4 mb-1" style={{ fontSize: "24px" }}>
                      {program.nameProgram}
                    </h3>
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
                      onClick={() => handleShowDetailModal(program.programId)}
                    >
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
                            onClick={() =>
                              handleShowEditModal(program.programId)
                            }
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
                    <h3 className="mt-4 mb-1 "style={{ fontSize: "24px" }}>{program.nameProgram}</h3>
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
                      onClick={() => handleShowDetailModal(program.programId)}
                    >
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
                setFormData={setFormData}
                imgURL={imgURL} // Truyền hàm setFormData để cập nhật dữ liệu form
              />
            </div>
          </div>

          <RenderPrograms />
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
              <div className="img-container">
          <img
            src={selectedProgram?.img}
            alt="Uploaded Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-12">
  <div className="row d-flex ">
    <div className="col-md-6">
      <p>
        <strong>Học kỳ bắt đầu:</strong>{" "}
        {getSemesterStartDate(selectedProgram.semesterId)}
      </p>
      <p>
        <strong>Kết thúc học kỳ:</strong>{" "}
        {getSemesterEndDate(selectedProgram.semesterId)}
      </p>
      <p>
        <strong>Thời gian:</strong> {selectedProgram.duration}
      </p>
      <p>
        <strong>Trình độ:</strong> {selectedProgram.level}
      </p>
    </div>
    <div className="col-md-6">
      <p>
        <strong>Trường:</strong>{" "}
        {getUniversityName(selectedProgram.universityName)}
      </p>
      <p>
        <strong>Chuyên ngành:</strong>{" "}
        {getMajorName(selectedProgram.majorId)}
      </p>
      <p>
        <strong>Loại chương trình :</strong>{" "}
        {getTypeName(selectedProgram.programTypeId)}
      </p>
      <p>
        <strong>Trạng thái :</strong> {selectedProgram.status}
      </p>
    </div>
  </div>
</div>

                 
              </div>
              <div className="col-md-7">
                <h4>{selectedProgram.nameProgram}</h4>
                <div className="row">
                </div>
                <div>
                  <p>
                    <strong>Mô tả:</strong> {selectedProgram.description}
                  </p>
                  <p>
                    <strong>
                      Học phí:
                      <br />
                    </strong>
                    <span
  dangerouslySetInnerHTML={{
    __html: selectedProgram?.tuition?.replace(/\\r\\n/g, "<br/>• ") || "",
  }}
/>

                  </p>
                  <p>
                    <strong>Yêu cầu:</strong>
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedProgram?.requirement?.replace(
                            /\\r\\n/g,
                            "<br/>• "
                          ) || "",
                      }}
                    />
                  </p>
                  <p>
                    <strong>Trách nhiệm:</strong>{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedProgram?.responsibilities?.replace(
                            /\\r\\n/g,
                            "<br/>• "
                          ) || "",
                      }}
                    />
                  </p>
                 
                </div>
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
      {/* Edit */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header>
          <Modal.Title>
            <strong>Chỉnh sửa chương trình</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProgramForEdit && (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="nameProgram">
                      <strong>Tên chương trình:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameProgram"
                      defaultValue={selectedProgramForEdit.nameProgram}
                      onChange={(e) =>
                        setEditedProgram({
                          ...selectedProgramForEdit,
                          nameProgram: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">
                      <strong>Ảnh:</strong>
                    </label>
                    <div className="align-items-center">
                      <img
                        src={selectedProgramForEdit.img}
                        alt="Uploaded Image"
                        style={{
                          maxWidth: "50%",
                          height: "auto",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="semesterId">
                      <strong>Học kỳ bắt đầu:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="semesterId"
                      defaultValue={selectedProgramForEdit.semesterId}
                      onChange={(e) =>
                        setEditedProgram({
                          ...selectedProgramForEdit,
                          semesterId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">
                      <strong>Major:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      defaultValue={selectedProgramForEdit.majorId}
                      onChange={(e) =>
                        setEditedProgram({
                          ...selectedProgramForEdit,
                          majorId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">
                      <strong>Thời lượng:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="duration"
                      defaultValue={selectedProgramForEdit.duration}
                      onChange={(e) =>
                        setEditedProgram({
                          ...selectedProgramForEdit,
                          duration: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tuition">
                      <strong>Học phí:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tuition"
                      defaultValue={selectedProgramForEdit.tuition}
                      onChange={(e) =>
                        setEditedProgram({
                          ...selectedProgramForEdit,
                          tuition: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="level">
                      <strong>Level:</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="level"
                      defaultValue={selectedProgramForEdit.level}
                      onChange={(e) =>
                        setEditedProgram({
                          ...selectedProgramForEdit,
                          level: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  <strong>Mô tả:</strong>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={selectedProgramForEdit.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditedProgram({
                      ...selectedProgramForEdit,
                      description: data,
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="responsibilities">
                  <strong>Trách nhiệm:</strong>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={selectedProgramForEdit.responsibilities}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditedProgram({
                      ...selectedProgramForEdit,
                      responsibilities: data,
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="requirement">
                  <strong>Yêu cầu:</strong>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={selectedProgramForEdit.requirement}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditedProgram({
                      ...selectedProgramForEdit,
                      requirement: data,
                    });
                  }}
                />
              </div>
              <div className="d-flex justify-content-between">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
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
      )
    </div>
  );
};

export default AllPrograms;
