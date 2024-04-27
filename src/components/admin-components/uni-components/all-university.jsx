import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUniversity,
  createUniversity,
} from "../../../redux/slice/universitySlice";
import { getStateById } from "../../../redux/slice/stateSlice";
import { Row, Dropdown, Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../FirebaseImage/Config";
import CreateUniversityModal from "./create-university";


const AllUniversitiesPage = () => {
    const dispatch = useDispatch();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUniversityForEdit, setSelectedUniversityForEdit] = useState(null);
    const [selectedUniversityId, setSelectedUniversityId] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [imgURL, setImgURL] = useState(null);
    const [formData, setFormData] = useState({
      universityName: "",
      tuition: "",
      description: "",
      img: "",
      slogan: "",
      universityTypeId: "",
      staffId: "",
      website: "",
      email: ""
    });


    const universities = useSelector((state) => state.university.universities);
    const loading = useSelector((state) => state.university.loading);
    const itemsPerPage = 6;
    const stateDetail = useSelector((state) => state?.state?.stateById);
    

    console.log("stateName",stateDetail)
  const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
      dispatch(getAllUniversity());

    }, [dispatch]);
    useEffect(() => {
      if (selectedUniversity) {
        dispatch(getStateById(selectedUniversity.stateId));
      }
    }, [dispatch, selectedUniversity]);
    
    const handleShowEditModal = (university) => {
      setSelectedUniversityForEdit(university);
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
  
    const handleShowUniversityDetailModal = (universityId) => {
      const selectedUni = universities.find((uni) => uni.universityId === universityId);
      setSelectedUniversity(selectedUni);
      setShowModal(true);
    };
    
    const handleCloseUniversityDetailModal = () => {
      setSelectedUniversityId(null);
      setShowModal(false); 
    };
    const handleImageUpload = async (file) => {
      // Kiểm tra xem có file được chọn không
      if (file) {
        // Tạo tham chiếu đến nơi lưu trữ ảnh trên Firebase Storage
        const imgRef = ref(imageDb, `Image/Universities/${file.name}`);
        try {
          await uploadBytes(imgRef, file);
          const imageUrl = await getDownloadURL(imgRef);
          setImgURL(imageUrl);
          setFormData({
            ...formData,
            img: imageUrl
          });
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error(`Error uploading ${file.name}:`, error);
        }
      } else {
        // Nếu không có file được chọn
        console.error("No file selected.");
      }
    };
    
    const handleSubmitCreateUniversity = async () => {
      if (formData.img) {
        await handleImageUpload(formData.img);
      }
      dispatch(createUniversity(formData)).then(() => {
        Swal.fire({
          icon: "success",
          title: "Tạo Trường  thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
  
        dispatch(getAllUniversity());
      });
   
    };
    const renderUniversities = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUniversities = universities.slice(indexOfFirstItem, indexOfLastItem);
      return (
        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            currentUniversities.map((university, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={index}>
                <div className="card mx-4 mt-4" style={{ width: '450px', height: '551px',boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-end mb-2">
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
                              onClick={() => handleShowEditModal(university)}
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
                      <img
                        src={university.img}
                        style={{ width: '350px', height: '250px' }}
                        className="university-img"
                        alt={university.universityName}
                      />
                      <h3 className="mt-4 mb-1">{university.universityName}</h3>
                      <p className="text-muted">{university.slogan}</p>
                      <button
                        className="btn btn-primary btn-rounded mt-3 px-4"
                        onClick={() => handleShowUniversityDetailModal(university.universityId)}
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
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    return (
      <div>
        <Row>
          <div className="col-lg-12">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Danh sách trường đại học</h4>
              <div className="dataTables_filter">
                <label>
                  Tìm kiếm :{" "}
                  <input
                    type="search"
                    className="mr-4"
                    placeholder=""
                  />
                </label>
                <button
                  onClick={handleToggleCreateModal}
                  className="btn btn-primary"
                >
                  + Thêm mới
                </button>
                <CreateUniversityModal
                  show={showCreateModal}
                  onClose={handleToggleCreateModal}
                  onSubmit={handleSubmitCreateUniversity}
                  formData={formData}
                  setFormData={setFormData}
                  imgURL={imgURL}
                />
              </div>
            </div>
  
            {renderUniversities()}
          </div>
        </Row>
        <Modal show={showModal} on  Hide={handleCloseUniversityDetailModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết trường đại học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUniversity && (
             <>
             <h3 className="mb-3" style={{ fontSize: '20px', fontWeight: 'bold' }}>Tên trường đại học: {selectedUniversity.universityName}</h3>
             <h5 className="mb-2" style={{ fontSize: '16px' }}>Bang: <p>{stateDetail?.stateName}</p></h5>
             <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>Chi phí nhập học: {selectedUniversity.tuition}</h5>
             <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>Mô tả:</h5>
             <p>{selectedUniversity.description}</p>
             <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>Slogan:</h5>
             <p>{selectedUniversity.slogan}</p>
             <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>Trang web:</h5>
             <p><a href={selectedUniversity.website}>{selectedUniversity.website}</a></p>
             <h5 className="mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>Email:</h5>
             <p>{selectedUniversity.email}</p>
           </>
               
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUniversityDetailModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-12 mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(universities.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  };
  
  export default AllUniversitiesPage;