import React, { useState, useEffect } from 'react';
import { Container, Box, Stepper, Step, StepLabel, Button, Typography, Grid, Card, CardContent, Avatar, Dialog, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Select as MuiSelect, MenuItem } from '@mui/material';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createProgramApplication, getProgramById, getProgramByProgramType, getProgramByUniId, getProgramTypes } from "../../redux/slice/programSlice";
import { getStudentProfileById } from "../../redux/slice/studentSlice";
import { getSchoolProfilesByStudentProfileId } from "../../redux/slice/schoolProfileSlice";
import { getAllCertificates, filterCertificatesByProgramId } from "../../redux/slice/programCertificateSlice";
import { getAllStudentCertificates, getAllStudentCertificatesByProfile } from '../../redux/slice/studentCertificateSlice';
import { createNotification, getNotification } from "../../redux/slice/authSlice";
import { getMajorById } from "../../redux/slice/majorSlice";
import { getSemesterById } from "../../redux/slice/semesterSlice";

import { css, keyframes } from '@emotion/react';
import Confetti from 'react-confetti';
import jwtDecode from "jwt-decode";
const steps = ['Chọn hồ sơ học sinh', 'Chọn chứng chỉ tiếng Anh', ' Kiểm tra điều kiện ứng tuyển '];



const CheckRequirementPage = () => {
  const { programById } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    studentProfileId: undefined,
    programId: programById,
  });
  
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const customerId = jwtDecode(token).UserId;
  
  const programDetail = useSelector((state) => state.program.programById);
  console.log("programDetail",programDetail)
  const majorId = useSelector((state) => state?.program?.programById?.majorId);
  const majorDetail = useSelector((state) => state?.major?.majorById);
  const programType = useSelector((state) => state?.program?.programTypes);

  const profileStudent = useSelector((state) => state.student.studentProfileByCustomerId);
  const schoolProfiles = useSelector((state) => state.schoolProfile.schoolProfilesByStudentProfileId);
  const certificatesByProgramId = useSelector((state) => state.certificate.certificatesByProgramId);
  const semesterDetails = useSelector((state) => state.semester.semesterById);
  const semesterId = useSelector(
    (state) => state?.program?.programById?.semesterId
  );
  const programTypeId = useSelector(
    (state) => state?.program?.programById?.programTypeId
  );
  const studentCertificates = useSelector((state) => state.studentCertificate.studentCertificates);
  const studentProfileDetail = useSelector((state) => state?.student?.profileById);
  
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (formData.studentProfileId) {
      dispatch(getSchoolProfilesByStudentProfileId(formData.studentProfileId));
      dispatch(getAllStudentCertificatesByProfile(formData.studentProfileId));
    }
  }, [dispatch, formData.studentProfileId]);

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      studentProfileId: selectedOption.value,
    });
    dispatch(getStudentProfileById(selectedOption.value));
  };

  useEffect(() => {
    dispatch(getAllCertificates());
  }, [dispatch]);

  useEffect(() => {
    if (programById) {
      dispatch(filterCertificatesByProgramId(Number(programById)));
    }
  }, [dispatch, programById]);

  useEffect(() => {
    dispatch(getAllStudentCertificates());
  }, [dispatch]);

  useEffect(() => {
    if (majorId) {
      dispatch(getMajorById(majorId));
    }
  }, [dispatch, majorId]);

  useEffect(() => {
    if (semesterId) {
      dispatch(getSemesterById(semesterId));
    }
    if (programDetail.semesterId) {
      dispatch(getSemesterById(programDetail.semesterId));
    }
  }, [dispatch, programDetail.semesterId, semesterId]);

  
  useEffect(() => {
    dispatch(getProgramTypes());
  }, [dispatch]);

  const getTypeName = (typeId) => {
    if (!programType) return "";
    const type = programType.find((type) => type.programTypeId === typeId);
    return type ? type.typeName : "";
  };
  const handleSelectCertificateChange = (selectedOption) => {
    const certificate = studentCertificates.find(c => c.certificateTypeDto.certificateName === selectedOption.value);
    setSelectedCertificate(certificate);
  };

  const handleSubmitProgramApplication = (e) => {
    e.preventDefault();
    if (formData.studentProfileId) {
      dispatch(createProgramApplication(formData));
      const programId = programById;
      dispatch(createNotification({ programId, customerId }));
      Swal.fire({
        icon: "success",
        title: "Nộp hồ sơ thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/students-profile');
    } else {
      Swal.fire({
        icon: "warning",
        title: "Chọn hồ sơ học sinh!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  const selectedStudentCertificate = studentCertificates?.find(c => c?.certificateTypeDto?.certificateName === selectedCertificate?.certificateType?.certificateName);
  const handleOpenDialog = (imgSrc) => {
    setSelectedImage(imgSrc);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };
  const calculateOverallGPA = () => {
    const year10 = schoolProfiles.find(profile => profile.schoolGrade === 10)?.gpa || 0;
    const year11 = schoolProfiles.find(profile => profile.schoolGrade === 11)?.gpa || 0;
    const year12 = schoolProfiles.find(profile => profile.schoolGrade === 12)?.gpa || 0;
    const overallGPA = (year10 + year11 + year12) / 3;
    return overallGPA.toFixed(2); 
  };

  const lastProgramCertificate = certificatesByProgramId[certificatesByProgramId.length - 1];

  const checkEligibility = () => {
    const gpa = calculateOverallGPA();
    const gpaEligible = gpa >= lastProgramCertificate?.minLevel;

    const certificateEligible = studentCertificates.some(certificate => {
      const programCertificate = certificatesByProgramId.find(pc => pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId);
      return programCertificate && certificate.certificateValue >= programCertificate.minLevel;
    });

    return gpaEligible && certificateEligible;
  };

  const eligibility = checkEligibility();

  const handleNext1 = () => {
    if (eligibility) {
      Swal.fire({
        title: 'Xác nhận',
        text: "Bạn có muốn nộp hồ sơ vào chương trình này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Nộp hồ sơ',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmitProgramApplication();
        }
      });
    } else {
      navigate(`/program-details/${programById}`);
    }
  };

  const handleBack1 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
  
    <Stepper activeStep={activeStep} alternativeLabel style={{ marginTop: '24px' }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {activeStep === 0 && (
      <Box style={{marginBottom:'24px'}}>
        <div className="form-group">
        <Typography variant="h4" align="center" marginBottom={2} marginTop={4}>
          Hồ sơ học sinh
        </Typography>          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '1' }}>
              {profileStudent?.length > 0 ? (
                <Select
                  options={profileStudent.map((profile) => ({
                    value: profile.studentProfileId,
                    label: profile.fullName,
                  }))}
                  placeholder="Chọn hồ sơ học sinh"
                  onChange={handleSelectChange}
                />
              ) : (
                <p style={{ fontStyle: 'italic' }}>Không có hồ sơ học sinh.</p>
              )}
            </div>
            <div style={{ marginLeft: '10px', height: '50px' }}>
              <Button variant="contained" onClick={() => navigate("/create-student-profile")} style={{ height: '100%', fontSize: '14px' }}>Tạo hồ sơ</Button>
            </div>
          </div>
        </div>
        {studentProfileDetail && (
          <Card style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h5" style={{ marginBottom: '20px', color: '#4CAF50', fontWeight: 'bold' }}>
                Thông tin Hồ sơ
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
                  <Avatar src={studentProfileDetail.img || "placeholder.jpg"} alt="Student" style={{ width: '100px', height: '100px', margin: 'auto' }} />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Họ và tên:</strong> {studentProfileDetail.fullName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Ngày sinh:</strong> {studentProfileDetail.dateOfBirth}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Email:</strong> {studentProfileDetail.email}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Giới tính:</strong> {studentProfileDetail.gender}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Số điện thoại:</strong> {studentProfileDetail.phone}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Địa chỉ:</strong> {studentProfileDetail.address}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Ngày tạo hồ sơ:</strong> {studentProfileDetail.createDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Nơi sinh:</strong> {studentProfileDetail.placeOfBirth}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Số CMND:</strong> {studentProfileDetail.nationalId}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1"><strong>Quá trình học tập:</strong> {studentProfileDetail.studyProcess}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        <Grid container spacing={2} style={{ marginTop: '24px' }}>
          {schoolProfiles.map((profile, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" align="center">
                    Lớp {profile.schoolGrade}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDialog(profile.img)}
                    fullWidth
                  >
                    Xem ảnh
                  </Button>
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogContent>
                      <img
                        src={selectedImage}
                        alt={`Lớp ${profile.schoolGrade}`}
                        style={{ width: '100%' }}
                      />
                    </DialogContent>
                  </Dialog>
                  <table className="table table-bordered" style={{ marginTop: '10px', width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Môn học</th>
                        <th>Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.profileScoreDtos.map((score) => (
                        <tr key={score.profileScoreId}>
                          <td>{score.subjectDto.subjectName}</td>
                          <td>{score.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                    <strong>GPA:</strong> {profile.gpa}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <Button variant="contained" color="primary" onClick={() => navigate(`/program-details/${programById}`)} style={{ marginTop: '20px', marginRight: '10px' }}>Quay lại</Button>
        <Button variant="contained" color="primary" onClick={handleNext} style={{ marginTop: '20px' }}>Kế tiếp</Button>
      </div>
      </Box>
    )}
    {activeStep === 1 && (
      <Box style={{marginBottom:'24px'}}>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={4}>
          Các chứng chỉ yêu cầu
        </Typography>
        <Typography variant="h6" align="center"  style={{ color: '#489DF9', marginBottom: '20px' }}>Yêu cầu phải có một trong các chứng chỉ tiếng Anh dưới đây </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loại chứng chỉ</TableCell>
              <TableCell>Điểm tối thiểu</TableCell>
              <TableCell>Điểm trung bình</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificatesByProgramId.slice(0, -1).map((certificate) => (
              <TableRow key={certificate.programCertificateId}>
                <TableCell>{certificate.certificateType.certificateName}</TableCell>
                <TableCell>{certificate.minLevel}</TableCell>
                <TableCell>{certificate.averageLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box mt={4}>
          <Typography variant="h6" align="center" marginBottom={2}>
            Điểm chứng chỉ của học sinh
          </Typography>
          <Select
            options={studentCertificates.map((certificate) => ({
              value: certificate.certificateTypeDto.certificateName,
              label: certificate.certificateTypeDto.certificateName,
            }))}
            placeholder="Chọn chứng chỉ"
            onChange={handleSelectCertificateChange}
          />
          {selectedCertificate && (
            <Box mt={2}>
              <Typography variant="body1">
                <strong>Chứng chỉ của bạn:</strong> {selectedCertificate.certificateTypeDto.certificateName}
              </Typography>
              <Typography variant="body1">
                <strong>Điểm chứng chỉ:</strong> {selectedCertificate.certificateValue}
              </Typography>
            </Box>
          )}
        </Box>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

        <Button variant="contained" color="primary" onClick={handleBack} style={{ marginRight: '10px', marginTop: '20px' }}>Quay lại</Button>
        <Button variant="contained" color="primary" onClick={handleNext} style={{ marginTop: '20px' }}>Kế tiếp</Button>
      </div>
      </Box>
    )}
 {activeStep === 2 && (
  
    <form onSubmit={handleSubmitProgramApplication}>
      {eligibility && <Confetti />}
      <Box style={{marginBottom:'24px'}}>

    
          <Typography variant="h4" align="center" marginBottom={2} marginTop={4}>
            Kết quả xét tuyển
          </Typography>
      
        <Typography
          variant="h2"
          align="center"
          className={eligibility ? 'success-animation' : 'failure-animation'}
          style={{ color: '#FF5733', marginBottom: '20px' }}
        >
          {eligibility ? 'Bạn đủ điều kiện xét tuyển !' : 'Bạn không đủ điều kiện xét tuyển.'}
        </Typography>
        <Card className='card-styles'>
  <CardContent>
    <Typography variant="h5" align="center" marginBottom={2}>
      {programDetail.nameProgram}
    </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <img src={programDetail.img} alt={programDetail.nameProgram} style={{ width: '100%', borderRadius: '8px' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
      <Typography variant="body1"><strong>Chuyên ngành chính:</strong> {majorDetail.majorName}</Typography>
        <Typography variant="body1"><strong>Trường Đại học:</strong> {programDetail.university.universityName}</Typography>
        <Typography variant="body1"><strong>Tiểu Bang:</strong> {programDetail.university.state.stateName}</Typography>
        <Typography variant="body1"><strong>Lộ trình học:</strong> {programDetail.duration}</Typography>
        <Typography variant="body1"><strong>Trình độ đào tạo:</strong> {programDetail.level}</Typography>
        <Typography variant="body1"><strong>Học kỳ:</strong> {semesterDetails.startDate} đến {semesterDetails.endDate}</Typography>
        <Typography variant="body1"><strong>Loại chương trình:</strong> {getTypeName(programDetail.programTypeId)}</Typography>
      </Grid>
    </Grid>
  </CardContent>
</Card>


        <Box mt={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" align="center" marginBottom={2}>
                    Điểm trung bình GPA tổng ba năm học
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={eligibility ? 'success-animation' : 'failure-animation'}
                  >
                    <strong>GPA tổng:</strong> {calculateOverallGPA()}
                    {calculateOverallGPA() >= lastProgramCertificate?.minLevel ? ' >= ' : ' < '}
                    {lastProgramCertificate?.minLevel} (Min GPA yêu cầu)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" align="center" marginBottom={2}>
                    Điểm chứng chỉ
                  </Typography>
                  {studentCertificates.map((certificate) => {
                    const programCertificate = certificatesByProgramId.find(pc => pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId);
                    return (
                      programCertificate && (
                        <Typography
                          variant="body1"
                          align="center"
                          key={certificate.certificateId}
                          className={eligibility ? 'success-animation' : 'failure-animation'}
                        >
                          <strong>{certificate.certificateTypeDto.certificateName}:</strong> {certificate.certificateValue}
                          {certificate.certificateValue >= programCertificate.minLevel ? ' >= ' : ' < '}
                          {programCertificate.minLevel} (Min điểm chứng chỉ yêu cầu)
                        </Typography>
                      )
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
  
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

          <Button variant="contained" color="primary" onClick={handleBack1} style={{ marginRight: '10px', marginTop: '20px' }}>Quay lại</Button>
          {eligibility ? (
            <Button variant="contained" color="primary" onClick={handleNext1} style={{ marginTop: '20px' }}>Nộp hồ sơ</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => navigate(`/program-details/${programById}`)} style={{ marginTop: '20px' }}>Quay lại</Button>
          )}
       </div>
      </Box>
      </form>
    )}
   
  </Container>
  );
};

export default CheckRequirementPage;
