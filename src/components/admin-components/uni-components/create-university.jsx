import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUniversityType } from "../../../redux/slice/universitySlice";
import { getAllState } from "../../../redux/slice/stateSlice";
import { getAllStaff } from "../../../redux/staffSlice";
import Swal from "sweetalert2";
import { Row, Dropdown, Modal, Button, Form, Col, Card } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../FirebaseImage/Config";
import AutoCompleteInput from "./auto-complete-state";

const CreateUniversityModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(null);
  console.log("selectedFile", selectedFile);
  const dispatch = useDispatch();
  const staffs = useSelector(
    (state) => state.staff.staffs
  );
  const universityTypes = useSelector(
    (state) => state.university.universityTypes
  );
  console.log("staffs là", staffs);

  useEffect(() => {
    dispatch(getAllUniversityType());
    dispatch(getAllState());
    dispatch(getAllStaff());
  }, [dispatch]);

  useEffect(() => {
    if (setSelectedFile) {
      let OBJ = { ...formData, img: selectedFile };
      setFormData(OBJ);
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === "number" ? parseFloat(value) : value;

    if (name === "universityTypeId") {
      setFormData({
        ...formData,
        [name]: parseInt(newValue),
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
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
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Card style={{ width: "330px", height: "260px" }}>
                    <Card.Body>
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        {selectedFile && (
                          <img
                            src={selectedFile}
                            alt="Uploaded"
                            style={{ maxWidth: "300px", height: "220px" }}
                          />
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ảnh</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tên trường đại học</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên trường đại học"
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                    />
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
                        <option
                          key={type.universityTypeId}
                          value={type.universityTypeId}
                        >
                          {type.typeName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Tiễu bang</Form.Label>
                <AutoCompleteInput
                  value={formData.stateId}
                  onChange={(selectedState) =>
                    setFormData({ ...formData, stateId: selectedState.stateId })
                  }
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>TUITIOn</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập Tiền "
                  name="tuition"
                  value={formData.tuition}
                  onChange={handleChange}
                />
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
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
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
export default CreateUniversityModal;
