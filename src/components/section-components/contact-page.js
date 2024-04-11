import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  const [formData, setFormData] = useState({
    area: "",
    moreInformation: "",
    studyAbroadReason: "",
    destinationReason: "",
    programChoose: "",
    majorChoose: "",
    majorChooseReason: "",
    universityChooseReason: "",
    priorityOfStudyAbroad: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({ ...errors, [name]: "" });
  };
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
      dispatch();
    } else {
      setErrors(newErrors);
    }
  };
  let stepPercentage = 0;
  switch (page) {
    case "basicInfo":
      stepPercentage = 0;
      break;
    case "uploadFile":
      stepPercentage = 50;
      break;
    case "complete":
      stepPercentage = 100;
      break;
    default:
      stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("basicInfo")}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("uploadFile")}
          >
            {index + 1}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("complete")}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

const Registration = () => {
  const [select, setSelect] = useState("");
  const [step, setStep] = useState(1);
  const [page, setPage] = useState("basicInfo");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  const handleSubmitFile = () => {
    // Thực hiện các thao tác xử lý khi người dùng nhấn nút gửi tệp tin
    // Ví dụ: kiểm tra xem tệp tin đã được chọn chưa và gửi nó đi

    if (!selectedFile) {
      alert("Vui lòng chọn một tệp tin.");
      return;
    }

    // Thực hiện các thao tác xử lý khác tại đây, ví dụ: gửi tệp tin đến máy chủ
  };
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const nextPageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleNextStep = () => {
    switch (page) {
      case "basicInfo":
        setPage("uploadFile");
        break;
      case "uploadFile":
        setPage("complete");
        break;
      default:
        setPage("basicInfo");
    }
  };

  const handlePreviousStep = () => {
    switch (page) {
      case "uploadFile":
        setPage("basicInfo");
        break;
      case "complete":
        setPage("uploadFile");
        break;
      default:
        setPage("basicInfo");
    }
  };

  const stateOptions = [
    { value: "north", label: "Miền Bắc" },
    { value: "central", label: "Miền Trung" },
    { value: "south", label: "Miền Nam" },
  ];
  const genderOptions = [
    { value: "1", label: "Nam" },
    { value: "2", label: "Nữ" },
    { value: "3", label: "Gioi tính khác" },
  ];

  const reasonGOptions = [
    { value: "1", label: "Giao dục " },
    { value: "2", label: "Cơ hội nghề nghiệp" },
    { value: "3", label: "Văn hóa" },
  ];

  const feeOptions = [
    { value: "1", label: "Tiết kiệm" },
    { value: "2", label: "Vừa phải" },
    { value: "3", label: "Cao cấp" },
  ];
  const reasonUOptions = [
    { value: "1", label: "Giao dục " },
    { value: "2", label: "Cơ hội nghề nghiệp" },
    { value: "3", label: "Trải nghiệm mới" },
  ];

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      <div className="contact-list pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="contact-list-inner">
                <div className="media">
                  <div className="media-left">
                    <img src={publicUrl + "assets/img/icon/17.png"} alt="img" />
                  </div>
                  <div className="media-body align-self-center">
                    <h5>Số Điện Thoại</h5>
                    <p>000 2324 39493</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-list-inner">
                <div className="media">
                  <div className="media-left">
                    <img src={publicUrl + "assets/img/icon/18.png"} alt="img" />
                  </div>
                  <div className="media-body align-self-center">
                    <h5>Email Của Chúng Tôi</h5>
                    <p>name@website.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-list-inner">
                <div className="media">
                  <div className="media-left">
                    <img src={publicUrl + "assets/img/icon/16.png"} alt="img" />
                  </div>
                  <div className="media-body align-self-center">
                    <h5>Địa Chỉ Của Chúng Tôi</h5>
                    <p>2 St, Loskia, amukara.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="counter-area pd-bottom-120">
        {page === "basicInfo" && (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="section-title mb-0">
                    <h6 className="sub-title right-line">
                      Trang Tư Vấn Đăng Ký Chương Trình Du Học
                    </h6>
                    <h2 className="title">Write Us a Message</h2>
                    <p className="content pb-3">
                      Vui lòng điền đầy đủ thông tin
                    </p>
                  </div>
                </div>
                <div className="col-lg-8 mt-5 mt-lg-0">
                  <form className="contact-form-inner  mt-5 mt-md-0">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Họ"
                            name="firstName"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Tên"
                            name="lastName"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Tên"
                            name="lastName"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Ngày sinh (dd/mm/yyyy)"
                            name="dob"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Địa chỉ"
                            name="address"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-bg-border">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <Select
                          value={stateOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={handleChange}
                          options={stateOptions}
                          placeholder="Chọn khu vực"
                        />
                      </div>
                      <div className="col-12">
                        <div className="single-input-inner style-bg-border">
                          <textarea
                            placeholder="Thông tin thêm"
                            defaultValue={""}
                            name="moreInformation"
                          />
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <Select
                          value={reasonGOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={handleChange}
                          options={reasonGOptions}
                          placeholder="Chọn lý do du học"
                        />
                      </div>
                      <div className="col-12 mb-4">
                        <Select
                          value={reasonUOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={handleChange}
                          options={reasonUOptions}
                          placeholder="Chọn lý do đích đến"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Select
                          value={reasonUOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={handleChange}
                          options={reasonUOptions}
                          placeholder="Chọn ưu tiên khi đi du học"
                        />
                      </div>
                      <div className="col-lg-6 mb-2">
                        <Select
                          value={feeOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={handleChange}
                          options={feeOptions}
                          placeholder="Ngân sách"
                        />
                      </div>
                      <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-base">Hoàn tất</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <button
                className="btn btn-base"
                style={{ width: "200px" }}
                onClick={handleNextStep}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}
        {page === "uploadFile" && (
          <div
            className="container"
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "20px",
              width: "400px",
              margin: "0 auto",
            }}
          >
            <form className="file-upload-form" style={{ textAlign: "center" }}>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ marginBottom: "20px" }}
              />
              <br />
              <button
                type="submit"
                className="btn btn-base"
                onClick={handleSubmitFile}
              >
                Upload File
              </button>
            </form>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                className="btn btn-base"
                style={{ marginRight: "20px" }}
                onClick={handlePreviousStep}
              >
                Quay lại
              </button>
              <button className="btn btn-base" onClick={handleNextStep}>
                Tiếp tục
              </button>
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
                Hoàn tất!{" "}
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
      <div className="contact-g-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d29208.601361499546!2d90.3598076!3d23.7803374!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1589109092857!5m2!1sen!2sbd" />
      </div>
    </div>
  );
};

export default Registration;
