
import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import React, { useState,useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../FirebaseImage/Config";

const CreateProgramModal = ({ show, onClose, onSubmit, formData, setFormData  }) => {
  
    const [selectedFile, setSelectedFile] = useState(null);
   useEffect(()=>{
    if(setSelectedFile){
      let OBJ = {...formData, img: selectedFile};
      setFormData(OBJ);
      
    }
   },[selectedFile])
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,

      });
    };
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
          // ...selectedProgramForEdit,
          img: imageUrl,
          // major: {
          //   majorId: selectedProgramForEdit.majorId 
          // }
        };
        // setEditedProgram(editedProgramCopy);
        // setSelectedProgramForEdit(editedProgramCopy);
        setSelectedFile(imageUrl);
        
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
        }
      } else {
        console.error("No file selected.");
      }
    };
    
    const handleSubmit = (e) => {
      
        onSubmit();
      
   
    
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
                  <label htmlFor="img">Ảnh:</label>
                  <input
                    type="file" 
                    className="form-control"
                    id="img"
                    name="img"
                    accept="image/*" 
                    onChange={handleImageUpload} 
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
            {/* <div className="form-group">
              <label htmlFor="img">Ảnh:</label>
              <input
                type="text"
                className="form-control"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
              />
            </div> */}
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
      <Button variant="primary" onClick={handleSubmit}>
        Tạo mới
      </Button>
    </Modal.Footer>
  </Modal>

    );
  };

  export default CreateProgramModal;