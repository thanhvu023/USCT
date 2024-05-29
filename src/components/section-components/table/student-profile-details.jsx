import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudentProfileById } from "../../../redux/slice/studentSlice";
import { Avatar, Backdrop, CircularProgress, Container, Box, Typography, Card, CardContent, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getFile, setStudentFileUrl } from "../../../redux/slice/authSlice";

const StudentProfileDetails = () => {
  const { studentProfileId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentProfileById(studentProfileId));
  }, []);
  const studentDetail = useSelector((state) => state.student.profileById);
  console.log(studentDetail);
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleCancelClick = () => {
    setEditMode(false);
  };
  console.log(studentDetail);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };
  // const handleDownloadFile = () => {
  //   // Assuming studentDetail.fileUploads is an array of file objects
  //   studentDetail.fileUploads.forEach((file) => {
  //     dispatch(getFile(file.fileAttach))
  //       .then((fileUrl) => {
  //         // Create a temporary link element
  //         const link = document.createElement("a");
  //         link.href = fileUrl.payload;
  //         link.setAttribute("download", file.fileName); // Set the file name
  //         // Trigger the download
  //         document.body.appendChild(link);
  //         link.click();
  //         // Clean up
  //         document.body.removeChild(link);
  //       })
  //       .catch((error) => {
  //         // Handle error
  //         console.error("Error downloading file:", error);
  //       });
  //   });
  // };
  const options = [
    { value: "basic_english", label: "Tiếng Anh cơ bản" },
    { value: "ielts", label: "IELTS" },
    { value: "toefl", label: "TOEFL" },
    { value: "toeic", label: "TOEIC" },
    { value: "esol", label: "ESOL" },
  ];

  // Options for country select
  const SettingProfile = () => (
    <div className="pt-3">
      <div className="settings-form">
        <h4 className="text-primary">Chỉnh sửa thông tin </h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group mb-3 col-md-6">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                placeholder="Họ và tên"
                className="form-control"
                value={"NAME"}
                disabled
              />
            </div>

            <div className="form-group mb-3 col-md-6">
              <label className="form-label">Căn cước công dân</label>
              <input
                type="text"
                placeholder="ID Quốc gia "
                className="form-control"
                value={"34214214242424224"}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-3 col-md-6">
              <label className="form-label">Ngày sinh</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group mb-3 col-md-6">
              <label className="form-label">Nơi sinh</label>
              <input
                type="text"
                placeholder="Nơi sinh"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Quá trình học tập</label>
            <div className="card h-auto">
              <div className="card-body">
                <form></form>
                <label className="form-label">Mô tả ở đây</label>
                <div className="custom-ekeditor cms-radius add-content-ckeditor ">
                  <CKEditor
                    editor={ClassicEditor}
                    // onReady={ editor => {

                    // } }
                    // onChange={ ( event, editor ) => {
                    //     // const data = editor.getData();
                    // } }
                    // onBlur={ ( event, editor ) => {

                    // } }
                    // onFocus={ ( event, editor ) => {

                    // } }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mb-3 ">
            <label className="form-label">Chứng chỉ tiếng Anh</label>
            <Select
              options={options}
              className="basic-multi-select"
              isMulti
              classNamePrefix="select"
            />
          </div>
          <div className="row">
            <div className="col-md-6 text-left">
              <button className="btn btn-primary" type="submit">
                Cập nhật
              </button>
            </div>
            <div className="col-md-6 text-right mb-3">
              <Link to="/students-profile" className="btn btn-secondary">
                Quay lại
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  const handleDownloadFile = (fileUrl, fileName) => {
    // Fetch the file using getFile action
    dispatch(getFile(fileUrl))
      .then((response) => {
        const url = response.payload;
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Set the file name
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
      })
      .catch((error) => {
        // Handle error
        console.error("Error downloading file:", error);
      });
  };
  const downloadFile = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const loading = useSelector((state) => state?.student?.loading);
  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div className="col-xl-8 mx-auto mt-5">
      <div className="card">
        <div className="inner-content">
          <div className="card-body">
            {editMode ? (
              <SettingProfile handleSubmit={handleSubmit} />
            ) : (
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <div className="profile-personal-info mt-3">
                    <h3 className="text-primary mb-4"  style={{textAlign:'center'}}>Thông Tin Học Sinh</h3>
                    <div className="col-lg-12">
                      <div
                        className="card overflow-hidden"
                        id="student-avatar-card"
                      >
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="text-center p-3 overlay-box">
                              <div className="profile-photo" style={{ display:'flex',justifyContent:'center',alignItems:'center' }}> 
                                <Avatar
                                  src={studentDetail.img}
                                  alt="img"
                                  style={{ width: "80px", height: "80px" }}
                                />
                              </div>
                              <h3 className="mt-3 mb-1 text-black">
                                {studentDetail.fullName}
                              </h3>
                            </div>
                          </div>
                          <div className="col-lg-7 align-self-center">
                            <div className="row mb-2 align-items-center">
                              <div className="col-6">
                                <h5 className="f-w-500">
                                  Nơi Sinh<span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-6">
                                <span>{studentDetail.placeOfBirth}</span>
                              </div>
                            </div>
                            <div className="row mb-2 align-items-center">
                              <div className="col-6">
                                <h5 className="f-w-500">
                                  Email<span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-6">
                                <span>{studentDetail.email}</span>
                              </div>
                            </div>
                            <div className="row mb-2 align-items-center">
                              <div className="col-6">
                                <h5 className="f-w-500">
                                  Số điện thoại
                                  <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-6">
                                <span>{studentDetail.phone}</span>
                              </div>
                            </div>
                            <div className="row mb-2 align-items-center">
                              <div className="col-6">
                                <h5 className="f-w-500">
                                  Căn cước công dân
                                  <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-6">
                                <span>{studentDetail.nationalId}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-about-me">
                    <div className="pt-4 border-bottom-1 ">
                    <Typography variant="h5" color="primary">1. Quá trình học tập</Typography>
                      {studentDetail.studyProcess}
                      <Box mt={4}>
                  <Typography variant="h5" color="primary"style={{marginBottom:'10px'}}>2. Văn bằng tiếng Anh</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Chứng chỉ</TableCell>
                          <TableCell>Trình độ</TableCell>
                          <TableCell>Tải về</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentDetail.certificateDtos?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.certificateTypeDto.certificateName}</TableCell>
                            <TableCell>{item.certificateValue}</TableCell>
                            <TableCell>
                              <Button onClick={() => handleDownloadFile(item.file, `${item.certificateTypeDto.certificateName}.jpg`)} variant="contained" color="primary">
                                Tải về
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box mt={4}>
                  <Typography variant="h5" color="primary" style={{marginBottom:'10px'}}>3. Điểm học bạ</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Năm học</TableCell>
                          <TableCell>GPA</TableCell>
                          <TableCell>Tải về</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentDetail.schoolProfileDtos?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>Lớp {item.schoolGrade}</TableCell>
                            <TableCell>{item.gpa}</TableCell>
                            <TableCell>
                              <Button onClick={() => handleDownloadFile(item.img, `Diem_nam_lop_${item.schoolGrade}.jpg`)} variant="contained" color="primary">
                                Tải về
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                    </div>
                  </div>
                  
                </div>
              </div>
            )}
            <div className="d-flex justify-content-between mt-4">
              {/* <div>
                <button
                  onClick={handleDownloadFile}
                  className="btn btn-secondary ml-3"
                >
                  Tải file
                </button>
              </div> */}
              <div className="text-right mb-3">
                <Link to="/students-profile" className="btn btn-secondary">
                  Quay lại
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDetails;
