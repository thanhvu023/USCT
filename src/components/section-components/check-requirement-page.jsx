import React, { useState, useEffect } from 'react';
import { Container, Box, Stepper, Step, StepLabel, Button, Typography, Grid, Card, CardContent, Avatar, Dialog, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Select as MuiSelect, MenuItem, Backdrop, CircularProgress } from '@mui/material';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createProgramApplication, getProgramById, getProgramByProgramType, getProgramByUniId, getProgramTypes, resetProgramById } from "../../redux/slice/programSlice";
import { getStudentProfileById, resetStudent } from "../../redux/slice/studentSlice";
import { getSchoolProfilesByStudentProfileId, resetSchoolProfiles } from "../../redux/slice/schoolProfileSlice";
import { getAllCertificates, filterCertificatesByProgramId } from "../../redux/slice/programCertificateSlice";
import { getAllStudentCertificates, getAllStudentCertificatesByProfile } from '../../redux/slice/studentCertificateSlice';
import { createNotification, getNotification } from "../../redux/slice/authSlice";
import { getMajorById } from "../../redux/slice/majorSlice";
import { getSemesterById } from "../../redux/slice/semesterSlice";
import { Badge } from 'react-bootstrap';
import { css, keyframes } from '@emotion/react';
import Confetti from 'react-confetti';
import jwtDecode from "jwt-decode";

const steps = ['Chọn hồ sơ học sinh', 'Điều kiện chứng chỉ', ' Hoàn tất '];

const getBadgeProps = (isEligible) => {
  if (isEligible) {
    return (
      <Badge bg=" badge-lg " className="badge-success " style={{ width: '60px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Đạt
      </Badge>
    );
  } else {
    return (
      <Badge bg="  " className="badge-danger " style={{ width: '60px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Không đạt
      </Badge>
    );
  }
};

const EnglishCertificates = ({ certificates, studentCertificates, getBadgeProps }) => (
  <>
    <Box mt={4}>
      <Typography variant="h6" align="center" style={{ color: '#489DF9', marginBottom: '20px' }}>
        Điểm chứng chỉ Tiếng Anh của học sinh
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loại chứng chỉ</TableCell>
            <TableCell>Điểm chứng chỉ</TableCell>
            <TableCell>Điểm tối thiểu yêu cầu</TableCell>
            <TableCell>Đánh giá</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentCertificates.filter(certificate => certificate.certificateTypeDto.certificateName === 'IELTS' || certificate.certificateTypeDto.certificateName === 'TOEFL').map((certificate) => {
            const programCertificate = certificates.find(pc => pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId);
            if (programCertificate) {
              const isEligible = certificate.certificateValue >= programCertificate.minLevel;
              return (
                <TableRow key={certificate.certificateId}>
                  <TableCell>{certificate.certificateTypeDto.certificateName}</TableCell>
                  <TableCell>{certificate.certificateValue}</TableCell>
                  <TableCell>{programCertificate.minLevel}</TableCell>
                  <TableCell>{getBadgeProps(isEligible)}</TableCell>
                </TableRow>
              );
            }
            return null;
          })}
        </TableBody>
      </Table>
    </Box>
  </>
);

const SATCertificates = ({ certificates, studentCertificates, getBadgeProps }) => {
  const hasEligibleCertificates = certificates.some(
    (certificate) =>
      (certificate.certificateType.certificateName === 'SAT' ||
        certificate.certificateType.certificateName === 'ACT') &&
      certificate.minLevel > 0
  );

  if (!hasEligibleCertificates) {
    return null;
  }

  return (
    <>
      <Box mt={4}>
        <Typography variant="h6" align="center" style={{ color: '#489DF9', marginBottom: '20px' }}>Điểm chứng chỉ SAT/ACT của học sinh
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loại chứng chỉ</TableCell>
              <TableCell>Điểm chứng chỉ</TableCell>
              <TableCell>Điểm tối thiểu yêu cầu</TableCell>
              <TableCell>Đánh giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentCertificates.filter(certificate => certificate.certificateTypeDto.certificateName === 'SAT' || certificate.certificateTypeDto.certificateName === 'ACT').map((certificate) => {
              const programCertificate = certificates.find(pc => pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId);
              if (programCertificate) {
                const isEligible = certificate.certificateValue >= programCertificate.minLevel;
                return (
                  <TableRow key={certificate.certificateId}>
                    <TableCell>{certificate.certificateTypeDto.certificateName}</TableCell>
                    <TableCell>{certificate.certificateValue}</TableCell>
                    <TableCell>{programCertificate.minLevel}</TableCell>
                    <TableCell>{getBadgeProps(isEligible)}</TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

const GPACertificates = ({ schoolProfiles, programCertificates }) => {
  const totalGPA = (schoolProfiles.reduce((acc, profile) => acc + profile.gpa, 0) / schoolProfiles.length).toFixed(2);
  const lastGpaCertificate = programCertificates.filter(certificate => certificate.certificateType.certificateName === 'Học bạ').slice(-1)[0];

  return (
    <>
      <Typography variant="h6" align="center" style={{ color: '#489DF9', marginBottom: '20px', marginTop: '20px' }}>Yêu cầu GPA</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Năm học</TableCell>
            <TableCell>GPA</TableCell>
            <TableCell>GPA đầu vào</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schoolProfiles.map((profile) => (
            <TableRow key={profile.schoolProfileId}>
              <TableCell>Lớp {profile.schoolGrade}</TableCell>
              <TableCell>{profile.gpa}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>GPA tổng</TableCell>
            <TableCell>{totalGPA}</TableCell>
            <TableCell>{lastGpaCertificate.minLevel}</TableCell>
          </TableRow>
          {lastGpaCertificate && (
            <TableRow>
              <TableCell>Đánh giá</TableCell>
              <TableCell>{totalGPA >= lastGpaCertificate.minLevel ? "Đạt" : "Không đạt"}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

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
  const majorId = useSelector((state) => state?.program?.programById?.majorId);
  const majorDetail = useSelector((state) => state?.major?.majorById);
  const programType = useSelector((state) => state?.program?.programTypes);

  const profileStudent = useSelector((state) => state.student.studentProfileByCustomerId);
  const schoolProfiles = useSelector(
    (state) => Array.isArray(state.schoolProfile.schoolProfilesByStudentProfileId) ? state.schoolProfile.schoolProfilesByStudentProfileId : []
  );
  const certificatesByProgramId = useSelector((state) => state.certificate.certificatesByProgramId);
  const semesterDetails = useSelector((state) => state.semester.semesterById);
  const semesterId = useSelector((state) => state?.program?.programById?.semesterId);
  const programTypeId = useSelector((state) => state?.program?.programById?.programTypeId);
  const studentCertificates = useSelector((state) => state.studentCertificate.studentCertificates);
  const studentProfileDetail = useSelector((state) => state?.student?.profileById);

  useEffect(() => {
    dispatch(resetSchoolProfiles()); // Reset schoolProfiles when the component mounts
  }, [dispatch]);

  const handleNext = () => {
    if (activeStep === 0 && !formData.studentProfileId) {
      Swal.fire({
        icon: "warning",
        title: "Chọn hồ sơ học sinh!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
    if (e) {
      e.preventDefault();
    }
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
    const year10 = schoolProfiles?.find(profile => profile.schoolGrade === 10)?.gpa || 0;
    const year11 = schoolProfiles?.find(profile => profile.schoolGrade === 11)?.gpa || 0;
    const year12 = schoolProfiles?.find(profile => profile.schoolGrade === 12)?.gpa || 0;
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

  const handleNext1 = (event) => {
    if (event) {
      event.preventDefault();
    }

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
          dispatch(resetProgramById());
          dispatch(resetSchoolProfiles());
        }
      });
    } else {
      navigate(`/program-details/${programById}`);
    }
  };

  const handleBack1 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const englishCertificates = studentCertificates.filter(
    (certificate) =>
      (certificate.certificateTypeDto.certificateName === 'IELTS' ||
        certificate.certificateTypeDto.certificateName === 'TOEFL') &&
      certificate.certificateValue >=
      certificatesByProgramId.find(
        (pc) => pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId
      )?.minLevel
  );

  const satActCertificates = studentCertificates.filter(
    (certificate) =>
      (certificate.certificateTypeDto.certificateName === 'SAT' ||
        certificate.certificateTypeDto.certificateName === 'ACT') &&
      certificate.certificateValue >=
      certificatesByProgramId.find(
        (pc) => pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId
      )?.minLevel
  );

  const overallGPA = calculateOverallGPA();
  const minGpaRequired = lastProgramCertificate?.minLevel;
  const gpaEligible = overallGPA >= minGpaRequired;
  const isEnglishEligible = englishCertificates.length > 0;
  const isSatActEligible = satActCertificates.length > 0;
  const isEligible = (isEnglishEligible || isSatActEligible) && gpaEligible;

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
        <Box style={{ marginBottom: '24px' }}>
          <div className="form-group">
            <Typography variant="h4" align="center" marginBottom={2} marginTop={4}>
              Hồ sơ học sinh
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/program-details/${programById}`)} style={{ marginTop: '20px', marginRight: '10px' }}>Quay lại</Button>
            <Button variant="contained" color="primary" onClick={handleNext} style={{ marginTop: '20px' }}>Kế tiếp</Button>
          </div>
        </Box>
      )}
      {activeStep === 1 && (
        <Box style={{ marginBottom: '24px' }}>
          <Typography variant="h4" align="center" marginBottom={2} marginTop={4}>
            Các chứng chỉ yêu cầu
          </Typography>
          <EnglishCertificates certificates={certificatesByProgramId} studentCertificates={studentCertificates} getBadgeProps={getBadgeProps} />
          <SATCertificates certificates={certificatesByProgramId} studentCertificates={studentCertificates} getBadgeProps={getBadgeProps} />
          <GPACertificates schoolProfiles={schoolProfiles} programCertificates={certificatesByProgramId} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleBack} style={{ marginRight: '10px', marginTop: '20px' }}>Quay lại</Button>
            <Button variant="contained" color="primary" onClick={handleNext} style={{ marginTop: '20px' }}>Kế tiếp</Button>
          </div>
        </Box>
      )}
      {activeStep === 2 && (
        <form onSubmit={handleSubmitProgramApplication}>
          {eligibility && <Confetti />}
          <Box style={{ marginBottom: '24px' }}>
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
              <Typography variant="h5" align="center" color="green" gutterBottom>
                Điều kiện xét tuyển
              </Typography>
              <Typography variant="h6" align="center" color="green" gutterBottom>
                Đạt yêu cầu điểm GPA và một trong các chứng chỉ Tiếng Anh (IELTS/TOEFL) hoặc một trong các chứng chỉ SAT/ACT.
              </Typography>
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
                        className={gpaEligible ? 'success-animation' : 'failure-animation'}
                      >
                        <strong>GPA tổng:</strong> {overallGPA} {gpaEligible ? ' >= ' : ' < '} {minGpaRequired} (Min GPA yêu cầu)
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
                      {studentCertificates
                        .filter((certificate) => {
                          const programCertificate = certificatesByProgramId.find(
                            (pc) =>
                              pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId &&
                              pc.minLevel > 0
                          );
                          return programCertificate && certificate.certificateValue >= programCertificate.minLevel;
                        })
                        .map((certificate) => {
                          const programCertificate = certificatesByProgramId.find(
                            (pc) =>
                              pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId &&
                              pc.minLevel > 0
                          );
                          return (
                            programCertificate && (
                              <Typography
                                variant="body1"
                                align="center"
                                key={certificate.certificateId}
                                className={
                                  certificate.certificateValue >= programCertificate.minLevel
                                    ? 'success-animation'
                                    : 'failure-animation'
                                }
                              >
                                <strong>{certificate.certificateTypeDto.certificateName}:</strong>{' '}
                                {certificate.certificateValue}
                                {certificate.certificateValue >= programCertificate.minLevel ? ' >= ' : ' < '}
                                {programCertificate.minLevel} (Min điểm chứng chỉ yêu cầu)
                              </Typography>
                            )
                          );
                        })}
                      {studentCertificates
                        .filter((certificate) => {
                          const programCertificate = certificatesByProgramId.find(
                            (pc) =>
                              pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId &&
                              pc.certificateTypeId.minLevel > 0
                          );
                          return programCertificate && certificate.certificateValue < programCertificate.minLevel;
                        })
                        .map((certificate) => {
                          const programCertificate = certificatesByProgramId.find(
                            (pc) =>
                              pc.certificateTypeId === certificate.certificateTypeDto.certificateTypeId &&
                              pc.minLevel > 0
                          );
                          return (
                            programCertificate && (
                              <Typography
                                variant="body1"
                                align="center"
                                key={certificate.certificateId}
                                className={
                                  certificate.certificateValue >= programCertificate.minLevel
                                    ? 'success-animation'
                                    : 'failure-animation'
                                }
                              >
                                <strong>{certificate.certificateTypeDto.certificateName}:</strong>{' '}
                                {certificate.certificateValue}
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleBack1} style={{ marginRight: '10px', marginTop: '20px' }}>Quay lại</Button>
              {eligibility ? (
                <Button variant="contained" color="primary" onClick={(event) => handleNext1(event)} style={{ marginTop: '20px' }}>Nộp hồ sơ</Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => navigate(`/program-details/${programById}`)} style={{ marginTop: '20px' }}>Trở về trang hồ sơ</Button>
              )}
            </div>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default CheckRequirementPage;
