import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUniversityType } from "../../../redux/slice/universitySlice";
import { getAllState } from "../../../redux/slice/stateSlice";
import Swal from "sweetalert2";
import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../FirebaseImage/Config";
const CreateUniversityModal = ({ show, onClose, onSubmit,  formData,
  setFormData, }) => {
 
  
    const [selectedFile, setSelectedFile] = useState(null);
    const [img, setImg] = useState(null);
    console.log("selectedFile",selectedFile)
    const dispatch = useDispatch();
    const states = useSelector((state) => state.state.states); // Lấy danh sách các states từ Redux store
    const universityTypes = useSelector((state) => state.university.universityTypes);
    console.log("states",states)
 

    useEffect(() => {
      dispatch(getAllUniversityType());
      dispatch(getAllState());
    }, [dispatch])
    useEffect(() => {
      if (setSelectedFile) {
        let OBJ = { ...formData, img: selectedFile };
        setFormData(OBJ);
      }
    }, [selectedFile]);
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newValue = e.target.type === 'number' ? Number(value) : value;
      setFormData({
        ...formData,
        [name]: newValue,
      });
    };

    const handleUpload = async () => {
      if (!img) return;
      const imageName = img.name; 
      let imgRef = ref(imageDb, "Image/Universities/" + imageName); 
  
      uploadBytes(imgRef, img).then(() => {
        getDownloadURL(imgRef).then((downloadURL) => {
          setSelectedFile(downloadURL);
          console.log(downloadURL);
          // console.log(`File available at ${downloadURL}`);
        });
      });
    };
    useEffect(() => {
      handleUpload();
    }, [img]);
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     await handleUpload();
    //     const formDataWithImg = { ...formData, img: imgURL }; // Sử dụng đường dẫn ảnh từ state mới
    //     await dispatch(createUniversity(formDataWithImg)).unwrap();
    //     Swal.fire("Success", "University has been created", "success");
    //     onClose();
    //   } catch (error) {
    //     Swal.fire("Error", "There was an error creating the university", "error");
    //   }
    //   setSelectedFile(null);
    // };

    const handleSubmit = (e) => {
      e.preventDefault();
      const universityData = {
        ...formData,
      };
      onSubmit(universityData);
      setSelectedFile(null);
    };
    return (
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo mới trường đại học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label>Tên trường đại học</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên trường đại học"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
              />
               <Form.Group className="mb-3">
            <Form.Label>Ảnh</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              />
          </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Loại trường đại học</Form.Label>
            <Form.Select
              name="universityTypeId"
              value={formData.universityTypeId}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Chọn loại trường đại học</option>
              {universityTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.typeName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID nhân viên</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập ID nhân viên"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trang web</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập URL trang web"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slogan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập slogan"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
              />
            </Form.Group>
      
            <Form.Group className="mb-3">
              <Form.Label>Bang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bang"
                name="stateId"
                value={formData.stateId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Tạo mới
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  export default CreateUniversityModal