import Select from "react-select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllMajor } from "../../../redux/slice/majorSlice";
import { getProgramTypes } from "../../../redux/slice/programSlice";
import { getAllSemester } from "../../../redux/slice/semesterSlice";
import { getAllUniversity } from "../../../redux/slice/universitySlice";
import { imageDb } from "../../FirebaseImage/Config";
const CreateProgramModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  certificates,
  addCertificate,
  handleCertificateChange,
  programFee,
  handleProgramFeeChange,
  addProgramFee,
  programDocument,
  handleProgramDocumentChange,
  addProgramDocument,
  programStage,
  handleProgramStageChange,
  addProgramStage,
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
  const programStagesOption = [
    { value: "Kết quả", label: "Kết quả" },
    { value: "Xét duyệt hồ sơ", label: "Xét duyệt hồ sơ" },
    { value: "Nộp hồ sơ", label: "Nộp hồ sơ" },
    { value: "Thư mời nhập học", label: "Thư mời nhập học" },
    { value: "Trả phí hồ sơ", label: "Trả phí hồ sơ" },
  ];
  const certificateOptions = [
    { value: 1, label: "IELTS" },
    { value: 2, label: "TOEFL" },
    { value: 3, label: "SAT" },
    { value: 4, label: "ACT" },
    { value: 6, label: "Học bạ" },
  ];
  const feeOptions = [
    {
      value: 1,
      label: "Phí nộp hồ sơ",
    },
    {
      value: 2,
      label: "Phí xin visa",
    },
    {
      value: 3,
      label: "Các phí thủ tục khác",
    },
  ];
  const documentOptions = [
    {
      value: 1,
      label: "Thư giới thiệu",
    },
    {
      value: 2,
      label: "Bài tiểu luận",
    },
  ];
  const stageFeeOptions = [
    { value: false, label: "Không" },
    { value: true, label: "Có" },
  ];
  console.log(programStage);
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
  const handleInputChange = (id, e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    handleProgramStageChange(id, name, fieldValue);
  };
  const handleUpload = async () => {
    if (!img) return;
    const imageName = img.name;
    let imgRef = ref(imageDb, "Image/Program/" + imageName);

    uploadBytes(imgRef, img).then(() => {
      getDownloadURL(imgRef).then((downloadURL) => {
        setSelectedFile(downloadURL);
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
  console.log(programDocument);
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
              <div>
                <label
                  htmlFor="programTypeId"
                  className="font-weight-bold fs-5"
                >
                  Chọn các chứng chỉ tiếng anh:
                </label>
                <div className="row col-lg-12 ml-1">
                  {certificates?.map((cert) => (
                    <div className="col-lg-6 mb-3" key={cert.id}>
                      <div className="mb-3">
                        <Select
                          placeholder="Chứng chỉ chương trình"
                          name={`certificateTypeId-${cert.id}`}
                          value={certificateOptions.find(
                            (option) => option.value === cert.certificateTypeId
                          )}
                          onChange={(e) =>
                            handleCertificateChange(
                              cert.id,
                              "certificateTypeId",
                              e.value
                            )
                          }
                          options={certificateOptions}
                        />
                        <input
                          type="number"
                          placeholder="Điểm trung bình"
                          name={`averageLevel-${cert.id}`}
                          value={cert.averageLevel}
                          onChange={(e) =>
                            handleCertificateChange(
                              cert.id,
                              "averageLevel",
                              e.target.value
                            )
                          }
                          className="form-control mt-2"
                        />
                        <input
                          type="number"
                          placeholder="Điểm tối thiểu"
                          name={`minLevel-${cert.id}`}
                          value={cert.minLevel}
                          onChange={(e) =>
                            handleCertificateChange(
                              cert.id,
                              "minLevel",
                              e.target.value
                            )
                          }
                          className="form-control mt-2"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12 mb-3">
                    <button
                      type="button"
                      onClick={addCertificate}
                      className="btn btn-primary"
                    >
                      Thêm chứng chỉ tiếng anh khác
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="font-weight-bold fs-5">
                  Các bước nộp hồ sơ của chương trình:
                </label>
                <div className="row col-lg-12 ml-1">
                  {programStage?.map((stage) => (
                    <div className="col-lg-6 mb-3" key={stage.id}>
                      <div className="mb-3">
                        <Select
                          placeholder="Các bước nộp hồ sơ"
                          name={`stageName-${stage.id}`}
                          value={programStage.find(
                            (option) => option.value === stage.stageName
                          )}
                          onChange={(e) =>
                            handleProgramStageChange(
                              stage.id,
                              "stageName",
                              e.value
                            )
                          }
                          options={programStagesOption}
                        />

                        <Select
                          placeholder="Loại phí"
                          className="mt-2"
                          name={`programFeeId-${stage.id}`}
                          value={programStage.find(
                            (option) => option.value === stage.programFeeId
                          )}
                          onChange={(e) =>
                            handleProgramStageChange(
                              stage.id,
                              "programFeeId",
                              e.value
                            )
                          }
                          options={feeOptions}
                        />
                        <div className="d-flex mt-2">
                          <p className="pt-2 mr-2">Có trả phí</p>
                          <input
                            type="checkbox"
                            name="isPayment"
                            checked={stage.isPayment}
                            onChange={(e) => handleInputChange(stage.id, e)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12 mb-3">
                    <button
                      type="button"
                      onClick={addProgramStage}
                      className="btn btn-primary"
                    >
                      Thêm các bước khác
                    </button>
                  </div>
                </div>
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
              <div
                className="form-group"
                style={{ paddingLeft: "0px !important" }}
              >
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
            <div>
              <label className="font-weight-bold fs-5">Các loại phí:</label>
              <div className="row col-lg-12 ml-1">
                {programFee?.map((fee) => (
                  <div className="col-lg-6 mb-3" key={fee.id}>
                    <div className="mb-3">
                      <Select
                        placeholder="Các phí chương trình"
                        name={`feeTypeId-${fee.id}`}
                        value={programFee.find(
                          (option) => option.value === fee.feeTypeId
                        )}
                        onChange={(e) =>
                          handleProgramFeeChange(fee.id, "feeTypeId", e.value)
                        }
                        options={feeOptions}
                      />
                      <input
                        type="number"
                        placeholder="Số tiền"
                        name={`amount-${fee.id}`}
                        value={fee.amount}
                        onChange={(e) =>
                          handleProgramFeeChange(
                            fee.id,
                            "amount",
                            e.target.value
                          )
                        }
                        className="form-control mt-2"
                      />
                    </div>
                  </div>
                ))}

                <div className="col-lg-12 mb-3">
                  <button
                    type="button"
                    onClick={addProgramFee}
                    className="btn btn-primary"
                  >
                    Thêm các phí khác
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="font-weight-bold fs-5">
                Các loại tài liệu của chương trình:
              </label>
              <div className="row col-lg-12 ml-1">
                {programDocument?.map((document) => (
                  <div className="col-lg-6 mb-3" key={document.id}>
                    <div className="mb-3">
                      <Select
                        placeholder="Các tài liệu chương trình"
                        name={`documentTypeId-${document.id}`}
                        value={programDocument.find(
                          (option) => option.value === document.documentTypeId
                        )}
                        onChange={(e) =>
                          handleProgramDocumentChange(
                            document.id,
                            "documentTypeId",
                            e.value
                          )
                        }
                        options={documentOptions}
                      />
                      <input
                        type="text"
                        placeholder="Mô tả"
                        name={`description-${document.id}`}
                        value={document.description}
                        onChange={(e) =>
                          handleProgramDocumentChange(
                            document.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="form-control mt-2"
                      />
                    </div>
                  </div>
                ))}

                <div className="col-lg-12 mb-3">
                  <button
                    type="button"
                    onClick={addProgramDocument}
                    className="btn btn-primary"
                  >
                    Thêm các tài liệu khác
                  </button>
                </div>
              </div>
            </div>
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
