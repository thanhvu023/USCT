import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllProgram,
    getProgramTypes,
    getProgramById
  } from "../../../redux/slice/programSlice";
  import { getAllMajor, getMajorById } from "../../../redux/slice/majorSlice";
import "./program.css";
import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AllProgramsPage = () => {
  const dispatch = useDispatch();
  const [feeData, setFeeData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProgramForEdit, setSelectedProgramForEdit] = useState(null);
  const programTypes = useSelector((state) => state.program.programTypes);
  const majors = useSelector((state) => state.major.allMajor);
  const programs = useSelector((state) => state.program.programs);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const loading = useSelector((state) => state.program.loading);
  const [showAllPrograms, setShowAllPrograms] = useState(true);

  useEffect(() => {
    dispatch(getAllProgram());
  }, [dispatch]);

  const handleShowDetailModal = (programId) => {
    setSelectedProgramId(programId); // Lưu ID
    setShowModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowModal(false);
    setSelectedProgramId(null); // Reset ID
    setSelectedProgram(null); 
  };

  useEffect(() => {
    if (selectedProgramId) {
      const program = programs.find((p) => p.programId === selectedProgramId);
      setSelectedProgram(program);
    }
  }, [selectedProgramId, programs]);
  
  const handleShowEditModal = (program) => {
    setSelectedProgramForEdit(program);
    setShowEditModal(true);
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

  const dataSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setFeeData([...programs]);
      setShowAllPrograms(true);
    } else {
      const updatedData = programs.filter((item) => {
 
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
                            onClick={() => handleShowEditModal(index)}
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
                    </Dropdown>{" "}
                  </div>
                  <div className="text-center">
                    <h3 className="mt-4 mb-1">{program.nameProgram}</h3>
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
                          onClick={() => handleShowEditModal(index)}
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
                  </Dropdown>{" "}
                </div>
                <div className="text-center">
                  <h3 className="mt-4 mb-1">{program.nameProgram}</h3>
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
                      <span className="mb-0">Trạng thái :</span>
                      <strong>{program.status}</strong>
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary btn-rounded mt-3 px-4"
                    onClick={() => handleShowDetailModal(program.programId)}                  >
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

      <Modal show={showModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết chương trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProgram && (
            <>
              <p>Tên chương trình: {selectedProgram.nameProgram}</p>
              <p>Status: {selectedProgram.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
                           {/* Edit */}
      <Modal show={showEditModal} onHide={handleCloseDetailModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa chương trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllProgramsPage;
