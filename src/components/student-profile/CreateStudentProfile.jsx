import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { createStudentProfile } from "../../redux/slice/studentSice";

const MultiStepProgressBar = () => {};

const CreateStudentProfile = () => {
  const [page, setPage] = useState("basicInfo");
  const customerId = useSelector((state) => state.auth.userById.customerId);
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    studyProcess: "",
    placeOfBirth: "",
    dateOfBirth: "",
    fileString: [],
    customerId,
  });
  const [errors, setErrors] = useState({});
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); 
    const fileNames = files.map(file => file.name); 
  
    setFormData(prevState => ({
      ...prevState,
      fileString: [...prevState.fileString, ...fileNames] 
    }));
  };

  const nextPageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleNextStep = () => {
    switch (page) {
      case "basicInfo":
        setPage("complete");
        break;
      default:
        setPage("basicInfo");
    }
  };

  const handlePreviousStep = () => {
    switch (page) {
      case "complete":
        setPage("basicInfo");
        break;
      default:
        setPage("basicInfo");
    }
  };
  const genderOptions = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Gioi tính khác" },
  ];

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    // Add validation logic here for each form field
    // Example:
    // if (formData.fullName.trim() === "") {
    //   newErrors.fullName = "Full Name is required";
    // }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      dispatch(createStudentProfile(formData));
    } else {
      setErrors(newErrors);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({ ...errors, [name]: "" });
  };
  return (
    <div>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      <div className="counter-area pd-bottom-120 mt-5">
        {page === "basicInfo" && (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-xl-12 mt-5 mt-lg-0">
                  <form
                    className="contact-form-inner mt-5 mt-md-0"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      {/* Input fields for basic information */}
                      {/* Full Name */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Họ và tên"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* National ID */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="ID Quốc Gia"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Date of Birth */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Nơi sinh"
                            name="placeOfBirth"
                            value={formData.placeOfBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Address */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Địa chỉ lưu trú"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Email */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Education Level */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Trình độ học vấn"
                            name="studyProcess"
                            value={formData.studyProcess}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Gender */}
                      <div className="col-lg-6">
                        <Select
                          value={genderOptions.find(
                            (option) => option.value === formData.gender
                          )}
                          onChange={(selectedOption) =>
                            handleInputChange({
                              target: {
                                name: "gender",
                                value: selectedOption.value,
                              },
                            })
                          }
                          options={genderOptions}
                          placeholder="Chọn giới tính"
                        />
                      </div>

                      {/* File Upload */}
                      <div className="col-lg-6">
                        <div className=" style-bg-border mb-4">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            name="fileString"
                            multiple
                          />
                        </div>
                      </div>
                      {/* Additional Information */}
                      <div className="col-12">
                        <div className="single-input-inner style-bg-border">
                          <textarea placeholder="Thông tin bổ sung" />
                        </div>
                      </div>
                      {/* Submit Button */}
                      <div className="col-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-base">
                          Hoàn tất
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === "complete" && (
          <div className="container">
            <div
              className="completion-message"
              style={{ textAlign: "center", animation: "fadeInUp 1s ease" }}
            >
              <h3
                style={{
                  color: "#4CAF50",
                  marginBottom: "10px",
                  fontSize: "64px",
                }}
              >
                Hoàn tất!
                <span role="img" aria-label="check-mark">
                  &#10004;
                </span>
              </h3>
              <p style={{ fontSize: "24px" }}>
                Cảm ơn bạn đã hoàn thành tất cả các bước.
              </p>
            </div>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <button
                className="btn btn-base"
                style={{ width: "200px" }}
                onClick={handlePreviousStep}
              >
                Quay lại
              </button>
            </div>
          </div>
        )}
      </div>

      {/* counter area end */}
      {/* contact area start */}
    </div>
  );
};

export default CreateStudentProfile;
