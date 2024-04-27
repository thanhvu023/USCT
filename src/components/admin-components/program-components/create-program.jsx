import { Row, Dropdown, Modal, Button, Form, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../FirebaseImage/Config";
import { getAllSemester } from "../../../redux/slice/semesterSlice";
import { getAllUniversity } from "../../../redux/slice/universitySlice";
import { getAllMajor } from "../../../redux/slice/majorSlice";
import { getProgramTypes } from "../../../redux/slice/programSlice";
import { useDispatch, useSelector } from "react-redux";
const CreateProgramModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(null);
  const universities = useSelector((state) => state.university.universities);
  const programTypes = useSelector((state) => state.program.programTypes);
  const majors = useSelector((state) => state.major.allMajor);
  const allSemester = useSelector((state) => state.semester.allSemester);
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);

  console.log("active:", active);
  console.log("inactive:", inactive);
  useEffect(() => {
    if (setSelectedFile) {
      let OBJ = { ...formData, img: selectedFile };
      setFormData(OBJ);
    }
  }, [selectedFile]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = async () => {
    if (!img) return;
    const imageName = img.name; 
    let imgRef = ref(imageDb, "Image/Program/" + imageName); 

    uploadBytes(imgRef, img).then(() => {
      getDownloadURL(imgRef).then((downloadURL) => {
        setSelectedFile(downloadURL);
        console.log(downloadURL);
        // console.log(`File available at ${downloadURL}`);
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const programData = {
      ...formData,
      status: active ? "Active" : inactive ? "Inactive" : "",
    };
    onSubmit(programData);
    setSelectedFile(null);
  };

  useEffect(() => {
    handleUpload();
  }, [img]);

  useEffect(() => {
    dispatch(getAllSemester());
    dispatch(getAllUniversity());
    dispatch(getAllMajor());
    dispatch(getProgramTypes());
  }, []);

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
                <label htmlFor="nameProgram" className="font-weight-bold fs-5">
                  Tên chương trình:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameProgram"
                  name="nameProgram"
                  value={formData.nameProgram}
                  onChange={handleChange}
                />
              </div>
              <img
                src={selectedFile}
                alt="Uploaded Image"
                style={{ maxWidth: "100%" }}
              />

              <div className="form-group">
                <label htmlFor="img" className="font-weight-bold fs-5">
                  Ảnh:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <label htmlFor="universityId" className="font-weight-bold fs-5">
                  Chọn trường đại học:
                </label>
                <select
                  value={formData.universityId}
                  onChange={handleChange}
                  name="universityId"
                  className="form-control"
                >
                  <option value="">Chọn trường đại học</option>
                  {universities &&
                    universities.map((university) => (
                      <option
                        key={university.id}
                        value={university.universityId}
                      >
                        {university.universityName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status" className="font-weight-bold fs-5">
                  Trạng thái:
                </label>
                <div className="d-flex">
                  <div className="mr-3">
                    <label>
                      <input
                        type="checkbox"
                        value="Active"
                        checked={active}
                        onChange={() => {
                          setActive(true);
                          setInactive(false);
                        }}
                      />
                      Active
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="Inactive"
                        checked={inactive}
                        onChange={() => {
                          setActive(false);
                          setInactive(true);
                        }}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="majorId" className="font-weight-bold fs-5">
                  Chọn chuyên ngành:
                </label>
                <select
                  value={formData.majorId}
                  onChange={handleChange}
                  name="majorId"
                  className="form-control"
                >
                  <option value="">Chọn chuyên ngành</option>
                  {majors &&
                    majors.map((major) => (
                      <option key={major.id} value={major.majorId}>
                        {major.majorName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="majorId" className="font-weight-bold fs-5">
                  Học kỳ:
                </label>
                <div className="d-flex">
                  <div className="flex-fill mr-2">
                    <select
                      value={formData.semesterId}
                      onChange={handleChange}
                      name="semesterId"
                      className="form-control"
                    >
                      <option value="">Chọn Học kỳ bắt đầu</option>
                      {allSemester.map((semester) => (
                        <option key={semester.id} value={semester.semesterId}>
                          {semester.startDate}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-fill">
                    <select
                      value={formData.semesterId}
                      onChange={handleChange}
                      name="semesterId"
                      className="form-control"
                    >
                      <option value="">Chọn Học kỳ kết thúc</option>
                      {allSemester.map((semester) => (
                        <option key={semester.id} value={semester.semesterId}>
                          {semester.endDate}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="programTypeId"
                  className="font-weight-bold fs-5"
                >
                  Chọn loại chương trình:
                </label>
                <select
                  value={formData.programTypeId}
                  onChange={handleChange}
                  name="programTypeId"
                  className="form-control"
                >
                  <option value="">Chọn loại chương trình</option>
                  {programTypes &&
                    programTypes.map((programType) => (
                      <option
                        key={programType.id}
                        value={programType.programTypeId}
                      >
                        {programType.typeName}
                      </option>
                    ))}
                </select>
              </div>
            </form>
          </div>
          <div className="col">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="duration" className="font-weight-bold fs-5">
                  Thời lượng:
                </label>
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
                <label htmlFor="description" className="font-weight-bold fs-5">
                  Mô tả:
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tuition" className="font-weight-bold fs-5">
                  Học phí:
                </label>
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
                <label htmlFor="level" className="font-weight-bold fs-5">
                  Level:
                </label>
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
                <label
                  htmlFor="responsibilities"
                  className="font-weight-bold fs-5"
                >
                  Trách nhiệm:
                </label>
                <textarea
                  className="form-control"
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="requirement" className="font-weight-bold fs-5">
                  Yêu cầu:
                </label>
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
