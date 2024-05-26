import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { createStudentProfile } from "../../redux/slice/studentSlice";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../FirebaseImage/Config";
import { Backdrop, CircularProgress } from "@mui/material";
import "./create-student-profile.css";
const MultiStepProgressBar = () => {};
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

const scoreOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

const subjects = [
  { subjectId: 1, subjectName: "Toán học" },
  { subjectId: 2, subjectName: "Vật lí" },
  { subjectId: 3, subjectName: "Hóa học" },
  { subjectId: 4, subjectName: "Sinh học" },
  { subjectId: 5, subjectName: "Tin học" },
  { subjectId: 6, subjectName: "Ngữ văn" },
  { subjectId: 7, subjectName: "Lịch sử" },
  { subjectId: 8, subjectName: "Địa lí" },
  { subjectId: 9, subjectName: "Tiếng Anh" },
  { subjectId: 10, subjectName: "GDCD" },
];

const CreateStudentProfile = () => {
  const [page, setPage] = useState("basicInfo");
  const customerId = useSelector((state) => state.auth.userById.customerId);
  const loading = useSelector((state) => state?.student?.loading);
  const [loadingUpFile, setLoadingUpfile] = useState(false);
  const [loadingUpFile10, setLoadingUpfile10] = useState(false);
  const [loadingUpFile11, setLoadingUpfile11] = useState(false);
  const [loadingUpFile12, setLoadingUpfile12] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [selectedCert, setSelectedCert] = useState("");
  const [addMoreCertificate, setAddMoreCertificate] = useState(false);
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
  const [certificates, setCertificates] = useState([
    { id: 1, certificateTypeId: '', certificateValue: '', file: '' },
  ]);
  const certificateOptions = [
    { value: 1, label: "IELTS" },
    { value: 2, label: "TOEFL" },
    { value: 3, label: "SAT" },
    { value: 4, label: "ACT" },
    { value: 6, label: "Học bạ" },
  ];

  const handleCertificateChange = (id, field, value) => {
    setCertificates((prevCertificates) =>
      prevCertificates.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };
  console.log(certificates)
  const addCertificate = () => {
    setCertificates([
      ...certificates,
      { id: Date.now(), certificateTypeId: '', certificateValue: '', file: '' },
    ]);
  };
  const [schoolProfile10, setSchoolProfile10] = useState({
    semester: 23,
    schoolGrade: 10,
    img: "string",
  });
  const [schoolProfile11, setSchoolProfile11] = useState({
    semester: 23,
    schoolGrade: 11,
    img: "string",
  });
  const [schoolProfile12, setSchoolProfile12] = useState({
    semester: 23,
    schoolGrade: 12,
    img: "string",
  });
  const [errors, setErrors] = useState({});
  const [scoreProfile10, setScoreProfile10] = useState(
    subjects.map((subject) => ({ ...subject, score: null }))
  );
  const [scoreProfile11, setScoreProfile11] = useState(
    subjects.map((subject) => ({ ...subject, score: null }))
  );
  const [scoreProfile12, setScoreProfile12] = useState(
    subjects.map((subject) => ({ ...subject, score: null }))
  );
  const handleScore10Change = (selectedOption, subjectId) => {
    setScoreProfile10((prevProfile) =>
      prevProfile.map((item) =>
        item.subjectId === subjectId
          ? { ...item, score: selectedOption.target.value }
          : item
      )
    );
  };
  const handleScore11Change = (selectedOption, subjectId) => {
    setScoreProfile11((prevProfile) =>
      prevProfile.map((item) =>
        item.subjectId === subjectId
          ? { ...item, score: selectedOption.target.value }
          : item
      )
    );
  };
  const handleScore12Change = (selectedOption, subjectId) => {
    setScoreProfile12((prevProfile) =>
      prevProfile.map((item) =>
        item.subjectId === subjectId
          ? { ...item, score: selectedOption.target.value }
          : item
      )
    );
  };
  const [loadingCertificate, setLoadingCertificate] = useState(false);

  // const handleUpload = async (e) => {
  //   const selectedFiles = e.target.files; // Get all selected files
  //   // Loop through each file and upload to Firebase Storage
  //   for (let i = 0; i < selectedFiles?.length; i++) {
  //     const selectedFile = selectedFiles[i];
  //     const imgRef = ref(imageDb, `Image/ProfileStudent/${selectedFile.name}`);
  //     try {
  //       setLoadingUpfile(true);
  //       await uploadBytes(imgRef, selectedFile);
  //       const imageUrl = await getDownloadURL(imgRef);
  //       // Update the state properly to append the new file URL
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         fileString: [...prevState.fileString, imageUrl],
  //       }));
  //       setLoadingUpfile(false);
  //       setErrors((prevState) => ({
  //         ...prevState,
  //         fileString: "",
  //       }));
  //     } catch (error) {
  //       console.error(`Error uploading ${selectedFile.name}:`, error);
  //     }
  //   }
  // };
  const handleUploadCertificate = async (certId, field, file) => {
    const imgRef = ref(imageDb, `Image/Certificate/${file.name}`);
    try {
      setLoadingCertificate(true);
      await uploadBytes(imgRef, file);
      const imageUrl = await getDownloadURL(imgRef);
      setCertificates((prevState) =>
        prevState.map((cert) =>
          cert.id === certId ? { ...cert, [field]: imageUrl } : cert
        )
      );
      setLoadingCertificate(false);
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      setLoadingCertificate(false);
    }
  };
  const handleUploadScore10 = async (e) => {
    const selectedFiles = e.target.files; // Get all selected files
    // Loop through each file and upload to Firebase Storage
    for (let i = 0; i < selectedFiles?.length; i++) {
      const selectedFile = selectedFiles[i];
      const imgRef = ref(
        imageDb,
        `Image/ScoreStudentProfile10/${selectedFile.name}`
      );
      try {
        setLoadingUpfile10(true);
        await uploadBytes(imgRef, selectedFile);
        const imageUrl = await getDownloadURL(imgRef);
        // Update the state properly to append the new file URL
        setSchoolProfile10((prevState) => ({
          ...prevState,
          img: imageUrl,
        }));
        setLoadingUpfile10(false);
        setErrors((prevState) => ({
          ...prevState,
          img: "",
        }));
      } catch (error) {
        console.error(`Error uploading ${selectedFile.name}:`, error);
      }
    }
  };

  const handleUploadScore11 = async (e) => {
    const selectedFiles = e.target.files; // Get all selected files
    // Loop through each file and upload to Firebase Storage
    for (let i = 0; i < selectedFiles?.length; i++) {
      const selectedFile = selectedFiles[i];
      const imgRef = ref(
        imageDb,
        `Image/ScoreStudentProfile10/${selectedFile.name}`
      );
      try {
        setLoadingUpfile11(true);
        await uploadBytes(imgRef, selectedFile);
        const imageUrl = await getDownloadURL(imgRef);
        // Update the state properly to append the new file URL
        setSchoolProfile11((prevState) => ({
          ...prevState,
          img: imageUrl,
        }));
        setLoadingUpfile11(false);
        setErrors((prevState) => ({
          ...prevState,
          img: "",
        }));
      } catch (error) {
        console.error(`Error uploading ${selectedFile.name}:`, error);
      }
    }
  };
  const handleUploadScore12 = async (e) => {
    const selectedFiles = e.target.files; // Get all selected files
    // Loop through each file and upload to Firebase Storage
    for (let i = 0; i < selectedFiles?.length; i++) {
      const selectedFile = selectedFiles[i];
      const imgRef = ref(
        imageDb,
        `Image/ScoreStudentProfile10/${selectedFile.name}`
      );
      try {
        setLoadingUpfile12(true);
        await uploadBytes(imgRef, selectedFile);
        const imageUrl = await getDownloadURL(imgRef);
        // Update the state properly to append the new file URL
        setSchoolProfile12((prevState) => ({
          ...prevState,
          img: imageUrl,
        }));
        setLoadingUpfile12(false);
        setErrors((prevState) => ({
          ...prevState,
          img: "",
        }));
      } catch (error) {
        console.error(`Error uploading ${selectedFile.name}:`, error);
      }
    }
  };
  const handleImageUpload = async (e) => {
    const selectedFiles = e.target.files; // Get all selected files
    // Loop through each file and upload to Firebase Storage
    for (let i = 0; i < selectedFiles?.length; i++) {
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

  const navigate = useNavigate();

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

    if (
      formData.nationalId.trim() === "" ||
      !/^\d+$/.test(formData.nationalId)
    ) {
      newErrors.nationalId = "Căn cước công dân không hợp lệ!";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    console.log(newErrors);
    if (Object.keys(newErrors)?.length === 0) {
      dispatch(
        createStudentProfile({
          formData,
          schoolProfile10,
          schoolProfile11,
          schoolProfile12,
          scoreProfile10,
          scoreProfile11,
          scoreProfile12,
          certificates,
        })
      );
      // Hiển thị thông báo khi hoàn tất khởi tạo thành công
      Swal.fire({
        icon: "success",
        title: "Hoàn tất khởi tạo hồ sơ thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/students-profile");
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
                      Danh sách hồ sơ đã nộp đơn
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
                      <div className="row col-lg-12 ml-1">
                        {certificates.map((cert) => (
                          <div className="col-lg-6 mb-3" key={cert.id}>
                            <div className="mb-3">
                              <Select
                                placeholder="Chứng chỉ tiếng anh"
                                name={`certificateTypeId-${cert.id}`}
                                value={certificateOptions.find(
                                  (option) =>
                                    option.value === cert.certificateTypeId
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
                                placeholder="Điểm trung bình"
                                name={`certificateValue-${cert.id}`}
                                value={cert.certificateValue}
                                onChange={(e) =>
                                  handleCertificateChange(
                                    cert.id,
                                    "certificateValue",
                                    e.target.value
                                  )
                                }
                                className="form-control mt-2"
                              />
                              <input
                                type="file"
                                placeholder="File"
                                name={`file-${cert.id}`}
                                onChange={(e) =>
                                  handleUploadCertificate(
                                    cert.id,
                                    "file",
                                    e.target.files[0]
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
                            Thêm chứng chỉ tiếng anh khác
                          </button>
                        </div>
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
                      <div className="container">
                        <div className="col-12">Điểm học bạ năm lớp 10</div>
                        <div className="row ml-2">
                          {scoreProfile10.map((item) => (
                            <div key={item.subjectId} className="m-2 col-lg-2">
                              <input
                                type="number"
                                placeholder={item.subjectName}
                                value={item.score ?? ""}
                                onChange={(e) =>
                                  handleScore10Change(e, item.subjectId)
                                }
                                className="form-control"
                              />
                            </div>
                          ))}
                          <p className="mr-4">
                            Tải lên hình ảnh điểm học bạ năm 10
                          </p>
                          <input
                            type="file"
                            // onChange={handleFileChange}
                            name="img"
                            onChange={(e) => {
                              handleUploadScore10(e);
                            }}
                          />
                          {loadingUpFile10 && (
                            <i className="fa fa-refresh mt-2 " />
                          )}
                        </div>
                      </div>
                      <div className="container">
                        <div className="col-12">Điểm học bạ năm lớp 11</div>
                        <div className="row ml-2">
                          {scoreProfile11.map((item) => (
                            <div key={item.subjectId} className="m-2 col-lg-2">
                              <input
                                type="number"
                                placeholder={item.subjectName}
                                value={item.score ?? ""}
                                onChange={(e) =>
                                  handleScore11Change(e, item.subjectId)
                                }
                                className="form-control"
                              />
                            </div>
                          ))}
                          <p className="mr-4">
                            Tải lên hình ảnh điểm học bạ năm 11
                          </p>
                          <input
                            type="file"
                            // onChange={handleFileChange}
                            name="img"
                            onChange={(e) => {
                              handleUploadScore11(e);
                            }}
                          />
                          {loadingUpFile11 && (
                            <i className="fa fa-refresh mt-2 " />
                          )}
                        </div>
                      </div>
                      <div className="container">
                        <div className="col-12">Điểm học bạ năm lớp 12</div>
                        <div className="row ml-2">
                          {scoreProfile12.map((item) => (
                            <div key={item.subjectId} className="m-2 col-lg-2">
                              <input
                                type="number"
                                placeholder={item.subjectName}
                                value={item.score ?? ""}
                                onChange={(e) =>
                                  handleScore12Change(e, item.subjectId)
                                }
                                className="form-control"
                              />
                            </div>
                          ))}
                          <p className="mr-4">
                            Tải lên hình ảnh điểm học bạ năm 12
                          </p>
                          <input
                            type="file"
                            // onChange={handleFileChange}
                            name="img"
                            onChange={(e) => {
                              handleUploadScore12(e);
                            }}
                          />
                          {loadingUpFile12 && (
                            <i className="fa fa-refresh mt-2 " />
                          )}
                        </div>
                      </div>
                      {/* File Upload */}
                      {/* <div className="col-lg-6">
                        <div className=" style-bg-border mb-4">
                          <label
                            htmlFor="imageInput"
                            className="custom-file-upload mr-3"
                          >
                            Tải lên thông tin cá nhân / các bằng cấp
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
                      </div> */}
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
