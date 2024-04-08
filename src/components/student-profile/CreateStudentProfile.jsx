import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const MultiStepProgressBar = () => {};

const CreateStudentProfile = () => {
  const [page, setPage] = useState("basicInfo");
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [studyProcess, setStudyProcess] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
  const handleSubmitForm = (event) => {
    event.preventDefault();
    // Additional form submission logic here
    console.log("Form submitted with selected file:", selectedFile);
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
                    onSubmit={handleSubmitForm}
                  >
                    <div className="row">
                      {/* Input fields for basic information */}
                      {/* Full Name */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* National ID */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="National ID"
                            name="nationalId"
                            value={nationalId}
                            onChange={(e) => setNationalId(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Date of Birth */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="date"
                            name="dob"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Place of Birth"
                            name="placeofbirth"
                            value={placeOfBirth}
                            onChange={(e) => setPlaceOfBirth(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Address */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Education Level */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Education Level"
                            name="studyProcess"
                            value={studyProcess}
                            onChange={(e) => setStudyProcess(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Gender */}
                      <div className="col-lg-6">
                        <Select
                          value={genderOptions.find(
                            (option) => option.value === gender
                          )}
                          onChange={(selectedOption) =>
                            setGender(selectedOption.value)
                          }
                          options={genderOptions}
                          placeholder="Select Gender"
                        />
                      </div>
                      {/* File Upload */}
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            name="profileFile"
                          />
                        </div>
                      </div>
                      {/* Additional Information */}
                      <div className="col-12">
                        <div className="single-input-inner style-bg-border">
                          <textarea placeholder="Additional Information" />
                        </div>
                      </div>
                      {/* Submit Button */}
                      <div className="col-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-base">
                          Submit
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
