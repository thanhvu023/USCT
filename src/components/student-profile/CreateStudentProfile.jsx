import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { createStudentProfile } from "../../redux/slice/studentSlice";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../FirebaseImage/Config";
import { Backdrop, CircularProgress } from "@mui/material";

const MultiStepProgressBar = () => {};

const CreateStudentProfile = () => {
  const [page, setPage] = useState("basicInfo");
  const customerId = useSelector((state) => state.auth.userById.customerId);
  const loading = useSelector((state) => state?.student?.loading);
  const [loadingUpFile, setLoadingUpfile] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

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
    englishLevel: "",
    grade: "",
    img: "",
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

  const handleUpload = async (e) => {
    const selectedFiles = e.target.files; // Get all selected files
    // Loop through each file and upload to Firebase Storage
    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      const imgRef = ref(imageDb, `Image/ProfileStudent/${selectedFile.name}`);
      try {
        setLoadingUpfile(true);
        await uploadBytes(imgRef, selectedFile);
        const imageUrl = await getDownloadURL(imgRef);
        // Update the state properly to append the new file URL
        setFormData((prevState) => ({
          ...prevState,
          fileString: [...prevState.fileString, imageUrl],
        }));
        setLoadingUpfile(false);
        setErrors((prevState) => ({
          ...prevState,
          fileString: "",
        }));
      } catch (error) {
        console.error(`Error uploading ${selectedFile.name}:`, error);
      }
    }
  };
  const handleImageUpload = async (e) => {
    const selectedFiles = e.target.files; // Get all selected files
    // Loop through each file and upload to Firebase Storage
    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      const imgRef = ref(imageDb, `Image/ProfileStudent/${selectedFile.name}`);
      try {
        setLoadingImg(true);
        await uploadBytes(imgRef, selectedFile);
        const imageUrl = await getDownloadURL(imgRef);
        // Update the state properly to append the new file URL
        setFormData((prevState) => ({
          ...prevState,
          img: imageUrl,
        }));
        setLoadingImg(false);
        setErrors((prevState) => ({
          ...prevState,
          img: "",
        }));
      } catch (error) {
        console.error(`Error uploading ${selectedFile.name}:`, error);
      }
    }
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

  // value grade
  const gradeOptions = [
    { value: "TOIEC", label: "TOIEC" },
    { value: "IETLS", label: "IETLS" },
    { value: "TOEFL", label: "TOEFL " },
    { value: "Other", label: "Other " },
  ];
  // value english level
  const englishLevelOptions = [
    { value: "A1, A2", label: "A1, A2 " },
    { value: "B1", label: "B1" },
    { value: "B2", label: "B2 " },
    { value: "C1", label: "C1 " },
    { value: "C2", label: "C2 " },
  ];
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    const validateField = (fieldName, value, errorMessage) => {
      if (!value.trim()) {
        newErrors[fieldName] = errorMessage;
      }
    };

    validateField(
      "fullName",
      formData.fullName,
      "Họ và tên không được để trống!"
    );
    validateField(
      "nationalId",
      formData.nationalId,
      "Căn cước công dân không được để trống!"
    );
    validateField(
      "dateOfBirth",
      formData.dateOfBirth,
      "Ngày sinh không được để trống!"
    );
    validateField(
      "placeOfBirth",
      formData.placeOfBirth,
      "Nơi sinh không được để trống!"
    );
    validateField(
      "address",
      formData.address,
      "Địa chỉ lưu trú không được để trống!"
    );
    validateField(
      "phone",
      formData.phone,
      "Số điện thoại không được để trống!"
    );
    validateField("email", formData.email, "Email không được để trống!");
    validateField(
      "studyProcess",
      formData.studyProcess,
      "Trình độ học vấn không được để trống!"
    );
    validateField(
      "grade",
      formData.grade,
      "Chứng chỉ tiếng Anh không được để trống!"
    );
    validateField(
      "englishLevel",
      formData.englishLevel,
      "Trình độ tiếng Anh không được để trống!"
    );
    validateField("img", formData.img, "Ảnh đại diện không được để trống!");

    if (formData.dateOfBirth.trim() !== "") {
      const currentDate = new Date();
      const dob = new Date(formData.dateOfBirth);
      let age = currentDate.getFullYear() - dob.getFullYear();
      const monthDiff = currentDate.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && currentDate.getDate() < dob.getDate())
      ) {
        age--;
      }
      if (age < 16) {
        newErrors.dateOfBirth = "Bạn phải đủ 16 tuổi để đăng ký!";
      }
      if (age < 0 || age > 60) {
        newErrors.dateOfBirth = "Ngày sinh không hợp lệ!";
      }
    }
    if (formData.phone.trim() === "" || !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }
  
    if (formData.nationalId.trim() === "" || !/^\d+$/.test(formData.nationalId)) {
      newErrors.nationalId = "Căn cước công dân không hợp lệ!";
    }
  
    if (formData.fileString.length === 0) {
      newErrors.fileString = "Thông tin hồ sơ ít nhất 1 file!";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      dispatch(createStudentProfile(formData));
      // Hiển thị thông báo khi hoàn tất khởi tạo thành công
      Swal.fire({
        icon: "success",
        title: "Hoàn tất khởi tạo hồ sơ thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
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
                          {errors.fullName && (
                            <p className="text-center text-danger mt-1">
                              {errors.fullName}
                            </p>
                          )}
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
                          {errors.nationalId && (
                            <p className="text-center text-danger mt-1">
                              {errors.nationalId}
                            </p>
                          )}
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
                          {errors.dateOfBirth && (
                            <p className="text-center text-danger mt-1">
                              {errors.dateOfBirth}
                            </p>
                          )}
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
                           {errors.placeOfBirth && (
                            <p className="text-center text-danger mt-1">
                              {errors.placeOfBirth}
                            </p>
                          )}
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
                           {errors.address && (
                            <p className="text-center text-danger mt-1">
                              {errors.address}
                            </p>
                          )}
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
                           {errors.phone && (
                            <p className="text-center text-danger mt-1">
                              {errors.phone}
                            </p>
                          )}
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
                           {errors.email && (
                            <p className="text-center text-danger mt-1">
                              {errors.email}
                            </p>
                          )}
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
                           {errors.studyProcess && (
                            <p className="text-center text-danger mt-1">
                              {errors.studyProcess}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 mb-3">
                        <Select
                          placeholder="Chứng chỉ tiếng anh"
                          name="grade"
                          value={gradeOptions.find(
                            (option) => option.value === formData.grade
                          )}
                          onChange={(e) => {
                            handleInputChange({
                              target: {
                                name: "grade",
                                value: e.value,
                              },
                            });
                          }}
                          options={gradeOptions}
                        />
                         {errors.grade && (
                            <p className="text-center text-danger mt-1">
                              {errors.grade}
                            </p>
                          )}
                      </div>
                      <div className="col-lg-6 mb-3">
                        <Select
                          placeholder="Trình độ tiếng anh"
                          name="englishLevel"
                          value={englishLevelOptions.find(
                            (option) => option.value === formData.englishLevel
                          )}
                          onChange={(e) => {
                            handleInputChange({
                              target: {
                                name: "englishLevel",
                                value: e.value,
                              },
                            });
                          }}
                          options={englishLevelOptions}
                        />
                         {errors.englishLevel && (
                            <p className="text-center text-danger mt-1">
                              {errors.englishLevel}
                            </p>
                          )}
                      </div>
                      {/* Gender */}
                      <div className="col-lg-6 mb-3">
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
                         {errors.gender && (
                            <p className="text-center text-danger mt-1">
                              {errors.gender}
                            </p>
                          )}
                      </div>

                      {/* File Upload */}
                      <div className="col-lg-6">
                        <div className=" style-bg-border mb-4">
                          <label
                            htmlFor="imageInput"
                            className="custom-file-upload mr-3"
                          >
                            Tải lên thông tin cá nhân
                          </label>
                          {loadingUpFile && (
                            <i className="fa fa-refresh fa-spin mr-2" />
                          )}
                          <input
                            type="file"
                            multiple
                            // onChange={handleFileChange}
                            name="fileString"
                            onChange={(e) => {
                              handleUpload(e);
                            }}
                          />
                           {errors.fileString && (
                            <p className="text-center text-danger mt-1">
                              {errors.fileString}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className=" style-bg-border mb-4">
                          <label
                            htmlFor="imageInput"
                            className="custom-file-upload mr-3"
                          >
                            Chọn ảnh đại diện
                          </label>
                          {loadingImg && (
                            <i className="fa fa-refresh fa-spin mr-2" />
                          )}
                          <input
                            id="imageInput"
                            type="file"
                            name="image"
                            onChange={(e) => {
                              handleImageUpload(e);
                            }}
                            title="Chọn hình đại diện hồ sơ"
                            className="hidden"
                          />
                           {errors.img && (
                            <p className="text-center text-danger mt-1">
                              {errors.img}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Additional Information */}
                      {/* <div className="col-12">
                        <div className="single-input-inner style-bg-border">
                          <textarea placeholder="Thông tin bổ sung" />
                        </div>
                      </div> */}
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
