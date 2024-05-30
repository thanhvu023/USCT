import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
  Accordion
} from "react-bootstrap";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogContent,
  CardContent,
  Dialog,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  Check as CheckIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import {
  getPaymentByProgramApplicationId,
  createPayment,
  updatePayment
} from "../../../redux/slice/paymentSlice";
import {
  getAllProgramFees,
  getProgramFeesByProgramId,
} from "../../../redux/slice/programFeeSlice";
import { getAllFeeTypes } from "../../../redux/slice/feeTypeSlice";
import {
  getAllStage,
  updateApplyStage,
} from "../../../redux/slice/applyStageSlice";
import { getFile } from "../../../redux/slice/authSlice";
import { useLocation, useParams } from "react-router-dom";
import { getProgramApplicationById } from "../../../redux/slice/programApplicationSlice";
import { getDocumentsByProgramApplicationId, updateDocument } from "../../../redux/slice/student-document"; 
import { getAllDocumentTypes } from "../../../redux/slice/documentTypesSlice";
import { getProgramCertificateByProgramId } from "../../../redux/slice/program-document";
import { getSchoolProfilesByStudentProfileId } from "../../../redux/slice/schoolProfileSlice";
import { getAllStudentCertificatesByProfile } from "../../../redux/slice/studentCertificateSlice";
import { Grid } from "rsuite";

const PaymentDetailsPage = () => {
  const { programApplicationId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [application, setApplication] = useState(location.state || null);
  const program = application?.program;
  const studentProfile = application?.studentProfile;
  
console.log("studentProfile",studentProfile)
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!application || refresh) {
      const fetchApplication = async () => {
        const response = await dispatch(getProgramApplicationById(programApplicationId));
        if (response.payload) {
          setApplication(response.payload);
        }
      };
      fetchApplication();
      setRefresh(false);
    }
  }, [dispatch, programApplicationId, application, refresh]);

  if (!application) {
    return <div>Loading...</div>;
  }

  const applyStages = useSelector((state) => state.applyStage.applyStages || []);
  const activeStage = application?.applyStage?.find((stage) => stage?.status === 1);
  const [tabIndex, setTabIndex] = useState(0);
  console.log("activeStage",activeStage)
  const payments = useSelector((state) => state.payment.paymentsByApplicationId);
  const customers = useSelector((state) => state.auth.user);
  const fees = useSelector((state) => state.programFee.fees);
  const feeTypes = useSelector((state) => state.feeType.feeTypes);
  const programDocuments = useSelector((state) => state.programDocument.programCertificateByProgramId);
  const documents = useSelector(state => state.studentDocument.documentsByProgramApplicationId); 
  const schoolProfiles = useSelector((state) => state.schoolProfile.schoolProfilesByStudentProfileId);
  const studentCertificates = useSelector((state) => state.studentCertificate.studentCertificates);

  console.log("tài liệu:",program)
  useEffect(() => {
    dispatch(getAllStage());
  }, [dispatch]);
  
  useEffect(()=>{
    if(program && program.programId){
      dispatch(getProgramCertificateByProgramId(program.programId)); 

    }
  },[dispatch, program]);

  useEffect(() => {
    if (application && application.programApplicationId) {

      dispatch(getDocumentsByProgramApplicationId(application.programApplicationId)); // Fetch documents by programApplicationId
    }
  }, [dispatch, application]);
  useEffect(()=>{
    dispatch(getAllDocumentTypes());

  },[dispatch]);
  useEffect(() => {
    if (application && application.programApplicationId) {
      dispatch(getPaymentByProgramApplicationId(application.programApplicationId));
    }
  }, [dispatch, application]);
  useEffect(() => {
    if (application.studentProfileId) {
      dispatch(getSchoolProfilesByStudentProfileId(application.studentProfileId));

      dispatch(getAllStudentCertificatesByProfile(application.studentProfileId));
    }
  }, [dispatch, application.studentProfileId]);
  useEffect(() => {
    dispatch(getAllProgramFees());
    dispatch(getAllFeeTypes());
    if (application) {
      dispatch(getProgramFeesByProgramId(application.programId));
    }
  }, [dispatch, application]);

  const updateStages = () => {
    if (!application || !application.applyStage) {
      Swal.fire({
        icon: "error",
        title: "Lỗi...",
        text: "Không có thông tin ứng dụng hoặc giai đoạn nào được chọn!",
      });
      return;
    }

    const currentStages = application.applyStage;
    const activeIndex = currentStages.findIndex((stage) => stage.status === 1);

    if (activeIndex === -1) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không tìm thấy giai đoạn đang hoạt động!",
      });
      return;
    }

    const currentStage = currentStages[activeIndex];
    if (currentStage) {
      dispatch(
        updateApplyStage({
          applyStageId: currentStage.applyStageId,
          programStageId: currentStage.programStageId,
          programApplicationId: currentStage.programApplicationId,
          status: 2,
        })
      )
        .then(() => {
          const nextStage = currentStages[activeIndex + 1];

          if (nextStage) {
            dispatch(
              updateApplyStage({
                applyStageId: nextStage.applyStageId,
                programStageId: nextStage.programStageId,
                programApplicationId: nextStage.programApplicationId,
                status: 1,
              })
            );
            Swal.fire({
              icon: "success",
              title: "Cập nhật thành công!",
              text: `Tiến trình hồ sơ đã được cập nhật từ ${currentStage.programStage.stageName} đến ${nextStage.programStage.stageName}`,
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              setRefresh(true); // Trigger a refresh to re-fetch/re-render
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Hoàn tất!",
              text: "Tiến trình hồ sơ đã hoàn tất.",
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then(() => {
              setRefresh(true); // Trigger a refresh to re-fetch/re-render
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi cập nhật!",
            text: "Không thể cập nhật giai đoạn hiện tại",
            confirmButtonText: "OK",
          });
          console.error("Failed to update the current stage:", error);
        });
    } else {
      console.log("Không có giai đoạn hiện tại hợp lệ để cập nhật.");
    }
  };

  const [filteredFees, setFilteredFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (application) {
      const filtered = fees.filter((fee) => fee.programId === application.programId);
      setFilteredFees(filtered);
    }
  }, [fees, application]);

  const handleFeeSelection = (event) => {
    const feeId = event.target.value;
    const fee = filteredFees.find((f) => f.programFeeId.toString() === feeId);
    setSelectedFee(fee);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handlePaymentSubmit = () => {
    if (selectedFee) {
      const paymentData = {
        programApplicationId: application.programApplicationId,
        method: "",
        amount: selectedFee.amount,
        orderInfo: note,
        paymentDate: new Date().toISOString(),
        transactionNo: 0,
      };
      dispatch(createPayment(paymentData));
      setSelectedFee(null);
      setNote("");
    }
  };

  const getTypeNameById = (feeTypeId) => {
    const feeType = feeTypes.find((type) => type.feeTypeId === feeTypeId);
    return feeType ? feeType.typeName : "";
  };

  if (!application) {
    return <div>Please select an application to make a payment.</div>;
  }

  const renderPaymentStatus = (isPayment) => {
    return isPayment ? "Cần đóng khoản phí" : "Không có khoản phí cần đóng";
  };

  const findActiveStageIndex = () => {
    return application.applyStage.findIndex((stage) => stage.status === 1);
  };

  const StepIcon = ({ status }) => {
    switch (status) {
      case 0:
        return <RadioButtonUncheckedIcon color="error" />;
      case 1:
        return <HourglassEmptyIcon color="action" />;
      case 2:
        return <CheckIcon color="primary" />;
      default:
        return <RadioButtonUncheckedIcon />;
    }
  };

  const getPaymentStatusLabel = (status) => {
    switch (status) {
      case 0:
        return " Chờ xác nhận thanh toán";
      case 1:
        return "Thành công";
      case 2:
        return "Thất bại";
        case 3:
            return "Hủy bỏ"
      default:
        return "Không có";
    }
  };

  const itemsPerPage = 9;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(payments?.length / itemsPerPage);

  const currentPayments = payments?.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const nextPage = () => {
    setPage((prevPage) => (prevPage + 1 < pageCount ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const handleDownloadFile = () => {
    studentProfile.fileUploads.forEach((file) => {
      dispatch(getFile(file.fileAttach))
        .then((fileUrl) => {
          const link = document.createElement("a");
          link.href = fileUrl.payload;
          link.setAttribute("download", file.fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  const getFileExtension = (url) => {
    const ext = url.split('.').pop().split('?')[0]; 
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'tiff':
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return ext;
      default:
        return 'file'; 
    }
  };
  const handleDocumentDownload = (doc) => {
    dispatch(getFile(doc.file))
      .then((fileUrl) => {
        const link = document.createElement("a");
        link.href = fileUrl.payload;
        const fileName = `${doc.documentTypeDto.typeName || "document"}.${getFileExtension(doc.file)}`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };
  
  
  const handleStatusChange = (paymentId, newStatus) => {
    const payment = payments.find((p) => p.paymentId === paymentId);
    if (payment) {
      const updatedPayment = {
        ...payment,
        status: newStatus,
      };
      dispatch(updatePayment({ id: paymentId, data: updatedPayment }))
        .then(() => {
          setRefresh(true);
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công!",
            text: "Trạng thái thanh toán đã được cập nhật.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi cập nhật!",
            text: "Không thể cập nhật trạng thái thanh toán",
            confirmButtonText: "OK",
          });
          console.error("Failed to update the payment status:", error);
        });
    }
  };
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Chưa hoàn thành';
      case 1:
        return 'Đang xử lý';
      case 2:
        return 'Đã hoàn thành';
      default:
        return 'Trạng thái đang bị lỗi';
    }
  };
  const getStatusDoc = (status) => {
    switch (status) {
      case 0:
        return 'Đợi kiểm tra';
      case 1:
        return 'Cần bổ sung';
      case 2:
        return 'Tài liêu không hợp lệ';
        case 3:
          return 'Tài liêu hợp lệ';
      default:
        return 'Lỗi';
    }
  };
  const formatDescription1 = (description) => {
    if (!description) return "";
    const paragraphs = description.split(/\\r\\n/);
    return paragraphs.map((para, index) => `<strong>${index + 1}.</strong> ${para}`).join("<br />");
  };
  const calculateOverallGPA = () => {
    if (!Array.isArray(schoolProfiles)) {
      return "0.00"; // or any default value you prefer
    }

    const year10 = schoolProfiles.find(profile => profile.schoolGrade === 10)?.gpa || 0;
    const year11 = schoolProfiles.find(profile => profile.schoolGrade === 11)?.gpa || 0;
    const year12 = schoolProfiles.find(profile => profile.schoolGrade === 12)?.gpa || 0;

    const overallGPA = (year10 + year11 + year12) / 3;
    return overallGPA.toFixed(2);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleOpenDialog = (imgSrc) => {
    setSelectedImage(imgSrc);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  const getStageFee = (programFeeId) => {
    const stageFee = fees.find((fee) => fee.programFeeId === programFeeId);
    return stageFee ? stageFee.amount.toLocaleString()  : "0";
  };
  const handleDocumentStatusChange = (documentId, newStatus) => {
    const document = documents.find((doc) => doc.documentId === documentId);
    if (document) {
      const updatedDocument = {
        ...document,
        status: newStatus,
      };
      dispatch(updateDocument(updatedDocument))
        .then(() => {
          setRefresh(true);
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công!",
            text: "Trạng thái tài liệu đã được cập nhật.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi cập nhật!",
            text: "Không thể cập nhật trạng thái tài liệu",
            confirmButtonText: "OK",
          });
          console.error("Failed to update the document status:", error);
        });
    }
  };

  return (
    <Container>
      <div className="card-header">
        <div>
          <Box sx={{ mx: "auto", width: "100%", maxWidth: "1460px" }}>
            <Row className="justify-content-center mt-4">
              <Col md={12}>
              <Card
      className="mb-4 shadow"
      style={{
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "10px",
      }}
    >
      <Card.Body>
        <Row>
          <Col md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={studentProfile.img || 'https://via.placeholder.com/150'}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </Col>
          <Col md={6}>
            <h3>{studentProfile.fullName}</h3>
            <p>{studentProfile.jobTitle}</p>
            <p>
              <strong>Mã hồ sơ:</strong> {studentProfile.studentProfileId}
            </p>
            <p>
              <strong>Ngày tạo hồ sơ:</strong> {studentProfile.createDate}
            </p>
            <p>
              <strong>Khai sinh:</strong> {studentProfile.dateOfBirth}
            </p>
            <p>
              <strong>Địa chỉ thường trú:</strong> {studentProfile.address}
            </p>
            <p>
              <strong>Mã số căn cước công dân:</strong> {studentProfile.nationalId}
            </p>
            <p>
              <strong>Học vấn:</strong>
            </p>
            
            <ul>
              {studentProfile?.studyProcess?.split("|").map((item, index) => {
                const [label, ...rest] = item.split(":");
                const value = rest.join(":");
                return (
                  <li key={index}>
                    <span>{label}:</span> {value}
                    {label.startsWith('ThưGiớiThiệu') && (
                      <ul>
                        {value.split(",").map((subItem, subIndex) => (
                          <li key={subIndex}>
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <p>
                <strong>Chứng chỉ:</strong>
              </p>
              <ul>
                {studentCertificates.map((certificate, index) => (
                  <li key={index}>
                    <strong>{certificate.certificateTypeDto.certificateName}:</strong> {certificate.certificateValue}
                  </li>
                ))}
              </ul>
            <p>
                <strong>GPA tổng:</strong> {calculateOverallGPA()}
              </p>
              <Grid container spacing={2} style={{ marginTop: '24px' }}>
                {schoolProfiles.map((profile, index) => (
                  <Grid item xs={8} sm={4} key={index}>
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
                        <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                          <strong>GPA:</strong> {profile.gpa}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            <p>
              {/* <strong>GPA tổng:</strong> {overallGPA} */}
            </p>
            {/* <Grid container spacing={2} style={{ marginTop: '24px' }}>
              {schoolProfiles.map((profile, index) => (
                <Grid item xs={8} sm={4} key={index}>
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
                      <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                        <strong>GPA:</strong> {profile.gpa}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid> */}
          </Col>
          <Col md={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="secondary" onClick={handleDownloadFile}>File Hồ Sơ</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>

              </Col>
            </Row>
          </Box>

          <Box
            sx={{ width: "100%", bgcolor: "background.paper", marginTop: 4 }}
          >
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
              <Tab label="Chương trình" />
              <Tab label="Cập nhật tiến trình hồ sơ" />
              <Tab label="Lich sử thanh toán" />
              <Tab label="Tài liệu đã nộp" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
              <Card
                className="mb-4 shadow"
                style={{ marginTop: "24px", borderRadius: "10px" }}
              >
                <Card.Body>
                  <Row>
                    <Col
                      md={4}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={program.img}
                        alt="Program"
                        style={{ width: "90%", borderRadius: "10px" }}
                      />
                    </Col>
                    <Col md={8}>
                      <h3>Thông tin chương trình</h3>

                      <p>
                        <strong>Tên Chương trình:</strong> {program.nameProgram}
                      </p>
                      <p>
                        <strong>Chuyên ngành:</strong> {program.major.majorName}
                      </p>
                      <p>
                        <strong>Trường đại học:</strong>{" "}
                        {program.university.universityName} (
                        {program.university.universityType.typeName})
                      </p>
                      <p>
                        <strong>Thuộc bang:</strong>{" "}
                        {program.university.state.stateName}
                      </p>
                      <p>
                        <strong>Loại chương trình:</strong>{" "}
                        {program.programType.typeName}
                      </p>
                      <p>
                        <strong>Thời gian:</strong> {program.duration}
                      </p>
                      <p>
                        <strong>Mô tả chương trình:</strong> {program.description}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Row style={{ display: "flex", alignContent: "space-around" }}>
                <Col md={4}>
                  <Card
                    className="mb-4 shadow"
                    style={{
                      borderRadius: "10px",
                      width: "320px",
                      height: "330px",
                    }}
                  >
                    <Card.Header
                      className="text-center"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <h5>Yêu cầu của chương trình</h5>
                    </Card.Header>
                    <Card.Body>
                      <ul>
                        {program?.requirement
                          .split(",")
                          .map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                          ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card
                    className="mb-4 shadow"
                    style={{
                      borderRadius: "10px",
                      width: "320px",
                      height: "330px",
                    }}
                  >
                    <Card.Header
                      className="text-center"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <h5>Chi phí tham khảo</h5>
                    </Card.Header>
                    <Card.Body>
                      <ul>
                        {program?.tuition
                          .split("\\r\\n")
                          .map((tuition, index) => (
                            <li key={index}>{tuition}</li>
                          ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card
                    className="mb-4 shadow"
                    style={{
                      borderRadius: "10px",
                      width: "320px",
                      height: "330px",
                    }}
                  >
                    <Card.Header
                      className="text-center"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <h5>Các ưu đãi</h5>
                    </Card.Header>
                    <Card.Body>
                      <ul>
                        {program?.responsibilities
                          .split("\\r\\n")
                          .map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
  <Row className="gx-2">
    <Col md={12}>
      <Card
        className="mb-4 shadow"
        style={{
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      >
        <Card.Header style={{ textAlign: "center" }}>
          <h2>Cập nhật tiến trình hồ sơ</h2>
        </Card.Header>
        <Card.Body>
          <Stepper activeStep={findActiveStageIndex()} alternativeLabel>
            {application.applyStage.map((stage, index) => (
              <Step key={stage.applyStageId}>
                <StepLabel icon={<StepIcon status={stage.status} />}>
                  {index + 1}. {stage.programStage.stageName}
                  <div style={{ fontSize: "smaller", color: "gray" }}>
                    {getStatusText(stage.status)}
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Form>
            <Row className="mb-3 mt-5 ml-3">
              <Col sm={3}>
                <Form.Label>
                  <strong>Hồ sơ đang ở tiến trình:</strong>
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Label>
                  {" "}
                  <strong style={{ color: "#007bff" }}>
                    {activeStage?.programStage?.stageName ||
                      "Hồ sơ đã hoàn tiến trình"}
                  </strong>
                </Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Label>
                  <strong>Phí giai đoạn:</strong>
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Label>
                  {" "}
                  <strong style={{ color: "#007bff" }}>
                  {renderPaymentStatus(activeStage?.programStage?.isPayment)} 

                  </strong>
                </Form.Label>
              </Col>
              <Col sm={3}>
                <Form.Label>
                  <strong>Phí cần đóng:</strong>
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Label>
                  {" "}
                  <strong style={{ color: "#007bff" }}>
               {getStageFee(activeStage?.programStage?.programFeeId)} VND 

                  </strong>
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 3, offset: 9 }}>
                <Button variant="primary" onClick={updateStages}>
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Form>
          
  

          {/* End of New Table for Program Document */}
          
        </Card.Body>
      </Card>
    </Col>
  </Row>
</TabPanel>

            <TabPanel value={tabIndex} index={2}>
              <Typography variant="h6" gutterBottom>
                Lịch sử thanh toán
              </Typography>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 600 }}
                  style={{ maxWidth: 1400, margin: "auto" }}
                  aria-label="payment history table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Số tiền</TableCell>
                      <TableCell align="right">Phương thức</TableCell>
                      <TableCell align="right">Ghi chú</TableCell>
                      <TableCell align="right">Ngày thanh toán</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                      <TableCell align="right">Cập nhật trạng thái</TableCell>
                      <TableCell align="right">Hình ảnh</TableCell>{" "}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentPayments?.map((payment) => (
                      <TableRow key={payment.paymentId}>
                        <TableCell component="th" scope="row">
                          {payment.paymentId}
                        </TableCell>
                        <TableCell align="right">
                          {payment.amount.toLocaleString()} VND
                        </TableCell>
                        <TableCell align="right">{payment.method}</TableCell>
                        <TableCell align="right">{payment.note}</TableCell>
                        <TableCell align="right">
                          {new Date(payment.paymentDate).toLocaleDateString()} 
                        </TableCell>
                        <TableCell align="right">
                          {getPaymentStatusLabel(payment.status)}
                        </TableCell>
                        <TableCell align="right">
                          <Form.Control
                            as="select"
                            value={payment.status}
                            onChange={(e) =>
                              handleStatusChange(
                                payment.paymentId,
                                Number(e.target.value)
                              )
                            }
                          >
                            <option value={0}>Chờ xác nhận thanh toán</option>
                            <option value={1}>Thành công</option>
                            <option value={2}>Thất bại</option>
                            <option value={3}>Hủy bỏ</option>
                          </Form.Control>
                        </TableCell>
                        <TableCell align="right">
                          {payment.img ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => window.open(payment.img, "_blank")}
                              style={{ textTransform: "none" }}
                            >
                              Xem Ảnh
                            </Button>
                          ) : (
                            "Không có ảnh"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between ",
                  margin: "20px",
                }}
              >
                <Button
                  variant="primary"
                  onClick={prevPage}
                  disabled={page === 0}
                >
                  Trước
                </Button>
                <Button
                  variant="primary"
                  onClick={nextPage}
                  disabled={page + 1 === pageCount}
                >
                  Kế tiếp
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={tabIndex} index={3}> {/* Add new TabPanel */}
                      {/* New Table for Program Document */}
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Tài liệu chương trình
          </Typography>
          <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
  <Table
    sx={{
      minWidth: 600,
      maxWidth: 1400,
      margin: 'auto',
      borderCollapse: 'separate',
      borderSpacing: '0 10px',
      '& thead th': {
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      '& tbody tr': {
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
      },
      '& tbody td': {
        padding: '16px',
        textAlign: 'center',
      },
      '& tbody td:first-of-type': {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
      },
      '& tbody td:last-of-type': {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
      },
    }}
    aria-label="program document table"
  >
    <TableHead>
      <TableRow>
        <TableCell >ID</TableCell>
        <TableCell sx={{ width: '15%' }} align="center">Tên tài liệu</TableCell>
        <TableCell align="center">Mô tả</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {programDocuments?.map((document) => (
        <TableRow key={document.programDocumentId}>
          <TableCell component="th" scope="row" >
            {document.programDocumentId}
          </TableCell>
          <TableCell align="center" sx={{ width: '15%' }}>{document.documentTypeDto?.typeName}</TableCell>
          <TableCell align="left" sx={{ textAlign: 'left', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            <Typography
              style={{ textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: formatDescription1(document.description) }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

              <Typography variant="h6" gutterBottom>
                Tài liệu đã nộp
              </Typography>
              <TableContainer component={Paper} sx={{ maxWidth: 1400, maxHeight: 400, overflowY: 'auto' }}>
                <Table
                  sx={{ minWidth: 600 }}
                  style={{ maxWidth: 1400, margin: "auto" }}
                  aria-label="document table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Loại tài liệu</TableCell>
                      <TableCell align="right">Thời gian tải lên</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                      <TableCell align="right">Cập nhật trạng thái</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents?.map((document) => (
                      <TableRow key={document.documentId}>
                        <TableCell component="th" scope="row">
                          {document.documentId}
                        </TableCell>
                        <TableCell align="right">{document?.documentTypeDto?.typeName}</TableCell>
                        <TableCell align="right">
  {new Date(document.updateDate).toLocaleString('en-GB', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })}
</TableCell>
                        <TableCell align="right">
                          {getStatusDoc(document.status)}
                        </TableCell>
                        <TableCell align="right">
                          <Form.Control
                            as="select"
                            value={document.status}
                            onChange={(e) =>
                              handleDocumentStatusChange(
                                document.documentId,
                                Number(e.target.value)
                              )
                            }
                          >
                            <option value={0}>Đợi kiểm tra</option>
                            <option value={1}>Cần bổ sung</option>
                            <option value={2}>Tài liệu không hợp lệ</option>
                          
                            <option value={3}>Tài liệu hợp lệ</option>

</Form.Control>
                        </TableCell>
                        <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDocumentDownload(document)}
                            style={{ textTransform: "none" }}
                          >
                            Tải xuống
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default PaymentDetailsPage;
