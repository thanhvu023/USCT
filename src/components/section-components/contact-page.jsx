import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ProgressBar, Step } from "react-step-progress-bar";
import { createRegistration } from "../../redux/slice/registrationSlice";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { Backdrop, CircularProgress } from "@mui/material";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
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

  const token = useSelector((state) => state?.auth?.token);
  const customerId = jwtDecode(token)?.UserId;
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
    status: 0,
    customerId,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const handleInputChange = (selectedOption, name) => {
    if (selectedOption && selectedOption.value) {
      setFormData({
        ...formData,
        [name]: selectedOption.value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: null, // or whatever default value you want
      });
    }
  };

  const handleChange = (e) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors)?.length === 0) {
      dispatch(createRegistration(formData));
      await Swal.fire({
        icon: "success",
        title: "Đăng ký tư vấn thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setErrors(newErrors);
    }
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
    { value: "An Giang", label: "An Giang" },
    { value: "Bà Rịa - Vũng Tàu", label: "Bà Rịa - Vũng Tàu" },
    { value: "Bắc Giang", label: "Bắc Giang" },
    { value: "Bắc Kạn", label: "Bắc Kạn" },
    { value: "Bạc Liêu", label: "Bạc Liêu" },
    { value: "Bắc Ninh", label: "Bắc Ninh" },
    { value: "Bến Tre", label: "Bến Tre" },
    { value: "Bình Định", label: "Bình Định" },
    { value: "Bình Dương", label: "Bình Dương" },
    { value: "Bình Phước", label: "Bình Phước" },
    { value: "Bình Thuận", label: "Bình Thuận" },
    { value: "Cà Mau", label: "Cà Mau" },
    { value: "Cao Bằng", label: "Cao Bằng" },
    { value: "Đắk Lắk", label: "Đắk Lắk" },
    { value: "Đắk Nông", label: "Đắk Nông" },
    { value: "Điện Biên", label: "Điện Biên" },
    { value: "Đồng Nai", label: "Đồng Nai" },
    { value: "Đồng Tháp", label: "Đồng Tháp" },
    { value: "Gia Lai", label: "Gia Lai" },
    { value: "Hà Giang", label: "Hà Giang" },
    { value: "Hà Nam", label: "Hà Nam" },
    { value: "Hà Tĩnh", label: "Hà Tĩnh" },
    { value: "Hải Dương", label: "Hải Dương" },
    { value: "Hậu Giang", label: "Hậu Giang" },
    { value: "Hòa Bình", label: "Hòa Bình" },
    { value: "Hưng Yên", label: "Hưng Yên" },
    { value: "Tp.Hồ Chí Minh", label: "Hồ Chí Minh" },
    { value: "Khánh Hòa", label: "Khánh Hòa" },
    { value: "Kiên Giang", label: "Kiên Giang" },
    { value: "Kon Tum", label: "Kon Tum" },
    { value: "Lai Châu", label: "Lai Châu" },
    { value: "Lâm Đồng", label: "Lâm Đồng" },
    { value: "Lạng Sơn", label: "Lạng Sơn" },
    { value: "Lào Cai", label: "Lào Cai" },
    { value: "Long An", label: "Long An" },
    { value: "Nam Định", label: "Nam Định" },
    { value: "Nghệ An", label: "Nghệ An" },
    { value: "Ninh Bình", label: "Ninh Bình" },
    { value: "Ninh Thuận", label: "Ninh Thuận" },
    { value: "Phú Thọ", label: "Phú Thọ" },
    { value: "Quảng Bình", label: "Quảng Bình" },
    { value: "Quảng Nam", label: "Quảng Nam" },
    { value: "Quảng Ngãi", label: "Quảng Ngãi" },
    { value: "Quảng Ninh", label: "Quảng Ninh" },
    { value: "Quảng Trị", label: "Quảng Trị" },
    { value: "Sóc Trăng", label: "Sóc Trăng" },
    { value: "Sơn La", label: "Sơn La" },
    { value: "Tây Ninh", label: "Tây Ninh" },
    { value: "Thái Bình", label: "Thái Bình" },
    { value: "Thái Nguyên", label: "Thái Nguyên" },
    { value: "Thanh Hóa", label: "Thanh Hóa" },
    { value: "Thừa Thiên Huế", label: "Thừa Thiên Huế" },
    { value: "Tiền Giang", label: "Tiền Giang" },
    { value: "Trà Vinh", label: "Trà Vinh" },
    { value: "Tuyên Quang", label: "Tuyên Quang" },
    { value: "Vĩnh Long", label: "Vĩnh Long" },
    { value: "Vĩnh Phúc", label: "Vĩnh Phúc" },
    { value: "Yên Bái", label: "Yên Bái" },
    { value: "Phú Yên", label: "Phú Yên" },
    { value: "Cần Thơ", label: "Cần Thơ" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Hải Phòng", label: "Hải Phòng" },
    { value: "Hà Nội", label: "Hà Nội" },
  ];

  const priorityOfStudyAbroadOptions = [
    { value: "Ngành học", label: "Ngành học" },
    { value: "Trường học", label: "Trường học" },
    { value: "Chi phí du học", label: "Chi phí du học" },
    { value: "Học bổng du học", label: "Học bổng du học" },
    { value: "Hồ sơ cư trú và làm việc", label: "Hồ sơ cư trú và làm việc" },
    { value: "Hồ sơ Visa", label: "Hồ sơ Visa" },
  ];

  const feeOptions = [
    { value: "Tiết kiệm", label: "Tiết kiệm" },
    { value: "Vừa phải", label: "Vừa phải" },
    { value: "Đủ chi trả", label: "Đủ chi trả" },
  ];

  const studyAbroadReasonOptions = [
    {
      value: "Trải nghiệm nền giáo dục đẳng cấp thế giới",
      label: "Trải nghiệm nền giáo dục đẳng cấp thế giới ",
    },
    {
      value: "Phát triển như một người trưởng thành, độc lập",
      label: "Phát triển như một người trưởng thành, độc lập",
    },
    { value: "Kết nối toàn cầu", label: "Kết nối toàn cầu" },
    {
      value: "Cải thiện kỹ năng ngôn ngữ của bạn",
      label: "Cải thiện kỹ năng ngôn ngữ của bạn",
    },
    { value: "Cơ hội du lịch", label: "Cơ hội du lịch" },
    { value: "Cơ hội việc làm", label: "Cơ hội việc làm" },
    { value: "Có học bổng nên muốn đi", label: "Có học bổng nên muốn đi" },
  ];

  const universityChooseReasonOptions = [
    { value: "Bảo đảm việc làm", label: "Bảo đảm việc làm" },
    { value: "Môi trường quốc tế", label: "Môi trường quốc tế" },
    { value: "Học phí ổn định", label: "Học phí ổn định" },
    {
      value: "Ngành yêu thích là thế mạnh của trường",
      label: "Ngành yêu thích là thế mạnh của trường",
    },
    {
      value: "Chương trình ngành học đa dạng",
      label: "Chương trình ngành học đa dạng",
    },
    {
      value: "Cơ sở vật chất hiện đại, tích hợp nhiều tiện ích",
      label: "Cơ sở vật chất hiện đại, tích hợp nhiều tiện ích",
    },
  ];

  const destinationReasonOptions = [
    { value: "Chi phí du học", label: "Chi phí du học" },
    {
      value: "Cơ hội làm việc và định cư",
      label: "Cơ hội làm việc và định cư",
    },
    { value: "Chất lượng nền giáo dục", label: "Chất lượng nền giáo dục" },
    { value: "Có người thân định cư", label: "Có người thân định cư" },
    { value: "Yêu thích nền văn hóa", label: "Yêu thích nền văn hóa" },
    { value: "Nhiều người chọn du học", label: "Nhiều người chọn du học" },
    { value: "Gia đình định hướng", label: "Gia đình định hướng" },
  ];
  const programChooseOptions = [
    { value: "Cao đẳng", label: "Cao đẳng" },
    { value: "Đại học", label: "Đại học" },
    { value: "Sau đại học", label: "Sau đại học" },
    { value: "Cao học", label: "Cao học" },
  ];

  const majorChooseOptions = [
    {
      value: "Công nghệ thông tin - Khoa học máy tính",
      label: "Công nghệ thông tin - Khoa học máy tính",
    },
    { value: "Kiến trúc - xây dựng", label: "Kiến trúc - xây dựng" },
    { value: "Kinh doanh và quản trị", label: "Kinh doanh và quản trị" },
    { value: "Luật", label: "Luật" },
    {
      value: "Nghệ thuật sáng tạo - Thiết kế",
      label: "Nghệ thuật sáng tạo - Thiết kế",
    },
    { value: "Chăm sóc sức khỏe y tế", label: "Chăm sóc sức khỏe y tế" },
    { value: "Tài chính - Ngân hàng", label: "Tài chính - Ngân hàng" },
    { value: "Kế toán kiểm toán", label: "Kế toán kiểm toán" },
    { value: "Truyền thông - Media", label: "Truyền thông - Media" },
  ];

  const majorChooseReasonOptions = [
    {
      value: "Phù hợp sở thích và đam mê",
      label: "Phù hợp sở thích và đam mê",
    },
    { value: "Phù hợp năng lực học tập", label: "Phù hợp năng lực học tập" },
    {
      value: "Phù hợp với khả năng tài chính",
      label: "Phù hợp với khả năng tài chính",
    },
    { value: "Cơ hội việc làm", label: "Cơ hội việc làm" },
    { value: "Ngành dễ định cư", label: "Ngành dễ định cư" },
    { value: "Ngành nhiều người chọn", label: "Ngành nhiều người chọn" },
    { value: "Theo định hướng gia đình", label: "Theo định hướng gia đình" },
  ];
  const loading = useSelector((state) => state?.registration?.loading);

  return (
    <div>
      <div className="counter-area pd-bottom-120">
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {page === "basicInfo" && (
          <div>
            <div className="container mt-5">
              <div className="row">
                <div className="col-lg-4">
                  <div className="section-title mb-0">
                    <h6 className="sub-title right-line">
                      Trang Tư Vấn Đăng Ký Chương Trình Du Học
                    </h6>
                    <h2 className="title">Hãy gửi tin nhắn cho chúng tôi</h2>
                    <p className="content pb-3">
                      Vui lòng điền đầy đủ thông tin
                    </p>
                  </div>
                </div>
                <div className="col-lg-8 mt-5 mt-lg-0">
                  <form
                    className="contact-form-inner  mt-5 mt-md-0"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-lg-6 mb-4">
                        <Select
                          value={majorChooseOptions.find((option) => {
                            option.value === formData.majorChoose;
                          })}
                          options={majorChooseOptions}
                          onChange={(e) => {
                            handleInputChange(e, "majorChoose");
                          }}
                          placeholder="Ngành học"
                          name="majorChoose"
                        />
                      </div>
                      <div className="col-lg-6 mb-4">
                        <Select
                          value={programChooseOptions.find((opntion) => {
                            opntion.value === formData.programChoose;
                          })}
                          onChange={(e) => {
                            handleInputChange(e, "programChoose");
                          }}
                          placeholder="Chương trình"
                          name="programChoose"
                          options={programChooseOptions}
                        />
                      </div>
                      <div className="col-lg-6 mb-4">
                        <Select
                          value={universityChooseReasonOptions.find(
                            (option) =>
                              option.value === formData.universityChooseReason
                          )}
                          onChange={(selectedOption) =>
                            handleInputChange(
                              selectedOption,
                              "universityChooseReason"
                            )
                          }
                          options={universityChooseReasonOptions}
                          placeholder="Tiêu chuẩn chọn trường"
                          name="universityChooseReason"
                        />
                      </div>
                      <div className="col-lg-6 mb-4">
                        <Select
                          value={majorChooseReasonOptions.find((option) => {
                            option.value === formData.majorChooseReason;
                          })}
                          onChange={(e) => {
                            handleInputChange(e, "majorChooseReason");
                          }}
                          options={majorChooseReasonOptions}
                          placeholder="Lý do chọn chuyên ngành"
                          name="majorChooseReason"
                        />
                      </div>
                      <div className="col-lg-6 mb-4">
                        <Select
                          value={stateOptions.find(
                            (option) => option.value === formData.area
                          )}
                          onChange={(selectedOption) =>
                            handleInputChange(selectedOption, "area")
                          }
                          options={stateOptions}
                          placeholder="Khu vực sinh sống"
                          name="area"
                        />
                      </div>

                      <div className="col-lg-6 mb-4">
                        <Select
                          value={destinationReasonOptions.find(
                            (option) =>
                              option.value === formData.destinationReason
                          )}
                          onChange={(selectedOption) =>
                            handleInputChange(
                              selectedOption,
                              "destinationReason"
                            )
                          }
                          options={destinationReasonOptions}
                          //destinationReason
                          placeholder="Lý do bạn chọn điểm đến"
                          name="destinationReason"
                        />
                      </div>
                      <div className="col-12 mb-4">
                        <Select
                          value={studyAbroadReasonOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={(e) => {
                            handleInputChange(e, "studyAbroadReason");
                          }}
                          options={studyAbroadReasonOptions}
                          //studyAbroadReason
                          placeholder="Lý do bạn muốn du học"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Select
                          value={priorityOfStudyAbroadOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={(e) => {
                            handleInputChange(e, "priorityOfStudyAbroad");
                          }}
                          options={priorityOfStudyAbroadOptions}
                          //priorityOfStudyAbroad
                          placeholder="Chọn ưu tiên khi đi du học"
                        />
                      </div>
                      <div className="col-lg-6 mb-2">
                        <Select
                          value={feeOptions.find(
                            (option) => option.value === select
                          )}
                          onChange={(e) => {
                            handleInputChange(e, "budget");
                          }}
                          options={feeOptions}
                          //budget
                          placeholder="Ngân sách"
                        />
                      </div>
                      <div className="col-12">
                        <div className="single-input-inner style-bg-border">
                          <textarea
                            placeholder="Thông tin thêm"
                            name="moreInformation"
                            value={formData.moreInformation}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-base">Hoàn tất</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div style={{ textAlign: "center", margin: "20px 0" }}>
              <button
                className="btn btn-base"
                style={{ width: "200px" }}
                onClick={handleNextStep}
              >
                Tiếp tục
              </button>
            </div> */}
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
      {/* <div className="contact-g-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d29208.601361499546!2d90.3598076!3d23.7803374!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1589109092857!5m2!1sen!2sbd" />
      </div> */}
    </div>
  );
};

export default Registration;
