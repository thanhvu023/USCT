import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { createStudentProfile } from "../../redux/slice/studentSice";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

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
    fileString: [
      "https://firebasestorage.googleapis.com/v0/b/capstone-project-5362d.appspot.com/o/Image%2FProfileStudent%2FResume.pdf?alt=media&token=9912665c-f830-415f-9ee6-4daa96bbeb24",
    ],
    customerId,
  });
  const [errors, setErrors] = useState({});
  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const fileNames = files.map((file) => file.name);

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     fileString: [...prevState.fileString, ...fileNames],
  //   }));
  // };

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
  const placeOfBirthOptions = [
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
            <div className="">
              <div className="row">
                <Sidebar className="ml-4">
                  <Menu className="mt-5">
                    <MenuItem
                      component={<Link to={`/students-profile`}></Link>}
                    >
                      Hồ sơ học sinh
                    </MenuItem>
                    <MenuItem
                      component={
                        <Link to={`/students-profile/registrationList`}></Link>
                      }
                    >
                      Danh sách đơn tư vấn
                    </MenuItem>
                    <MenuItem
                      component={
                        <Link to={`/students-profile/appliedList`}></Link>
                      }
                    >
                      Danh sách hồ sơ đã duyêt
                    </MenuItem>
                    <MenuItem
                      component={<Link to={`/create-student-profile`}></Link>}
                    >
                      Khởi tạo hồ sơ học sinh
                    </MenuItem>
                  </Menu>
                </Sidebar>
                <div className="col-xl-9 mt-5 ">
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
                            placeholder="Căn cước công dân"
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
                        <div>
                          <Select
                            placeholder="Nơi sinh"
                            name="placeOfBirth"
                            value={placeOfBirthOptions.find(
                              (option) => option.value === formData.placeOfBirth
                            )}
                            onChange={(selectedOption) =>
                              handleInputChange({
                                target: {
                                  name: "placeOfBirth",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            options={placeOfBirthOptions}
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
                            // onChange={handleFileChange}
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
