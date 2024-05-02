import React, { useContext, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FormControl,
} from "react-bootstrap";
import {
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import { getPaymentByProgramApplicationId } from "../../../redux/slice/paymentSlice";

import {
  Check as CheckIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import {
  getStudentProfileById,
  getAllProgram,
  getProgramById,
  getProgramStageById,
} from "../../../redux/slice/programSlice";
import PaymentContext from "./context/payment-context";
import {
  getProgramFeesByProgramId,
  getAllProgramFees,
} from "../../../redux/slice/programFeeSlice";
import { getAllFeeTypes } from "../../../redux/slice/feeTypeSlice";
import { createPayment } from "../../../redux/slice/paymentSlice";
import {
  getAllStage,
  updateApplyStage,
} from "../../../redux/slice/applyStageSlice";
import { getFile } from "../../../redux/slice/authSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const { selectedApp: selectedApplication } = useContext(PaymentContext);
  const { studentProfile, program } = selectedApplication;
  const [refresh, setRefresh] = useState(false);

  const applyStages = useSelector(
    (state) => state.applyStage.applyStages || []
  );
  const activeStage = selectedApplication?.applyStage?.find(
    (stage) => stage?.status === 1
  );
  const [tabIndex, setTabIndex] = useState(0);

  const payments = useSelector(
    (state) => state.payment.paymentsByApplicationId
  );
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
  useEffect(() => {
    dispatch(getAllStage());
  }, [dispatch]);
  useEffect(() => {
    if (selectedApplication && selectedApplication.programApplicationId) {
      dispatch(
        getPaymentByProgramApplicationId(
          selectedApplication.programApplicationId
        )
      );
    }
  }, [dispatch, selectedApplication, refresh]);

  const updateStages = () => {
    if (!selectedApplication || !selectedApplication.applyStage) {
      Swal.fire({
        icon: "error",
        title: "Lỗi...",
        text: "Không có thông tin ứng dụng hoặc giai đoạn nào được chọn!",
      });
      return;
    }
  
    const currentStages = selectedApplication.applyStage;
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
          dispatch(getAllStage()); // Refresh stages after update
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
              setRefresh(prev => !prev); // Toggle the refresh state to re-fetch/re-render
            });
          } else {
            // No next stage, indicating completion of the process
            Swal.fire({
              icon: "success",
              title: "Hoàn tất!",
              text: "Tiến trình hồ sơ đã hoàn tất.",
              showConfirmButton: true,
              confirmButtonText: "OK",
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
  

  const customers = useSelector((state) => state.auth.user);
  const programs = useSelector((state) => state.program.programs);
  const fees = useSelector((state) => state.programFee.fees);
  const feeTypes = useSelector((state) => state.feeType.feeTypes);
  // console.log("này là",selectedApplication)
  useEffect(() => {
    dispatch(getAllProgramFees());
    dispatch(getAllFeeTypes());
    if (selectedApplication) {
      dispatch(getProgramFeesByProgramId(selectedApplication.programId));
    }
  }, [dispatch, selectedApplication]);

  const [filteredFees, setFilteredFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (selectedApplication) {
      const filtered = fees.filter(
        (fee) => fee.programId === selectedApplication.programId
      );
      setFilteredFees(filtered);
    }
  }, [fees, selectedApplication]);

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
        programApplicationId: selectedApplication.programApplicationId,
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
  //   const handleDownloadFile = (fileAttach) => {
  //     const link = document.createElement("a");
  //     link.href = fileAttach;
  //     link.download = "fileAttach";
  //     link.click();
  //   };
  const getTypeNameById = (feeTypeId) => {
    const feeType = feeTypes.find((type) => type.feeTypeId === feeTypeId);
    return feeType ? feeType.typeName : "";
  };

  if (!selectedApplication) {
    return <div>Please select an application to make a payment.</div>;
  }
  const renderPaymentStatus = (isPayment) => {
    return isPayment ? "Cần đóng khoản phí" : "Không có khoản phí cần đóng";
  };
  const displayApplicationStages = () => {
    return (
      <Stepper activeStep={findActiveStageIndex()} alternativeLabel>
        {selectedApplication.applyStage.map((stage, index) => (
          <Step key={stage.applyStageId}>
            <StepLabel icon={<StepIcon status={stage.status} />}>
              {stage.programStage.stageName}
              <div style={{ fontSize: "smaller", color: "gray" }}>
         
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };
  const getPaymentStatus = (status) => {
    switch (status) {
      case 0:
        return {
          text: "Chưa thanh toán",
          icon: <RadioButtonUncheckedIcon color="error" />,
        };
      case 1:
        return {
          text: "Thanh toán thành công",
          icon: <CheckCircleOutline color="primary" />,
        };
      case 2:
        return { text: "Hủy bỏ", icon: <HighlightOff color="secondary" /> };
      default:
        return {
          text: "Trạng thái không xác định",
          icon: <RadioButtonUncheckedIcon />,
        };
    }
  };

  const findActiveStageIndex = () => {
    return selectedApplication.applyStage.findIndex(
      (stage) => stage.status === 1
    ); // Assuming '1' indicates the current active stage
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
      default:
        return "Không xác định";
    }
  };
  const itemsPerPage = 9;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(payments?.length / itemsPerPage);

  const currentPayments = payments?.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const nextPage = () => {
    setPage((prevPage) => (prevPage + 1 < pageCount ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };
  const handleDownloadFile = () => {
    // Assuming studentDetail.fileUploads is an array of file objects
    studentProfile.fileUploads.forEach((file) => {
      dispatch(getFile(file.fileAttach))
        .then((fileUrl) => {
          // Create a temporary link element
          const link = document.createElement("a");
          link.href = fileUrl.payload;
          link.setAttribute("download", file.fileName); // Set the file name
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
    });
  };
  return (
    <Container>
      <div className="card-header">
        {/* <h2 className="card-title text-center">CHI TIẾT HỒ SƠ ĐĂNG KÝ CHƯƠNG TRÌNH</h2> */}
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
                  <Card.Header style={{ textAlign: "center" }}>
                    <h2>Thông tin hồ sơ</h2>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <p>
                          <strong>Mã hồ sơ:</strong>{" "}
                          {studentProfile.studentProfileId}
                        </p>
                        <p>
                          <strong>Ngày tạo hồ sơ:</strong>{" "}
                          {studentProfile.createDate}
                        </p>
                        <p>
                          <strong>Khai sinh:</strong>{" "}
                          {studentProfile.dateOfBirth}
                        </p>
                        <p>
                          <strong>Địa chỉ thường trú:</strong>{" "}
                          {studentProfile.address}
                        </p>
                        <p>
                          <strong>Mã số căn cước công dân:</strong>{" "}
                          {studentProfile.nationalId}
                        </p>
                        <p className="d-flex">
                          <span style={{ fontWeight: "bold" }}>Bộ hồ sơ</span>
                          {/* {studentProfile &&
                          studentProfile.fileUploads &&
                          studentProfile.fileUploads?.length > 0 ? (
                            studentProfile.fileUploads.map((file, index) => (
                              <div key={index} className="m-2">
                                <Button
                                  className="me-2"
                                  variant="secondary btn-rounded"
                                  onClick={() =>
                                    handleDownloadFile(file)
                                  }
                                >
                                  <span className="btn-icon-start text-warning mr-2">
                                    <i className="fa fa-download" />
                                  </span>
                                  PDF {index + 1}
                                </Button>
                              </div>
                            ))
                          ) : (
                            <span className="ml-2">Chưa bổ sung file PDF</span>
                          )} */}
                          <div>
                            <button
                              onClick={handleDownloadFile}
                              className="btn btn-secondary ml-3"
                            >
                              Tải file
                            </button>
                          </div>
                        </p>
                      </Col>
                      <Col md={6}>
                        <p>
                          <strong>Họ và tên:</strong> {studentProfile.fullName}
                        </p>
                        <p>
                          <strong>Giới tính:</strong> {studentProfile.gender}
                        </p>
                        <p>
                          <strong>Số điện thoại:</strong> {studentProfile.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {studentProfile.email}
                        </p>
                        <p>
                          <strong>Học vấn :</strong> {studentProfile.grade}
                        </p>
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

              <Tab label="Cập nhật tiếng trình hồ sơ" />
              <Tab label="Lich sử thanh toán" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
              <Card
                className="mb-4 shadow"
                style={{
                  marginTop: "24px",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                }}
              >
                <Card.Header className=" " style={{ textAlign: "center" }}>
                  <h2>Chương trình</h2>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <img
                        src={program.img}
                        alt="Program"
                        style={{ width: "100%", marginBottom: "20px" }}
                      />
                      <p>
                        <strong>Trách nhiệm:</strong>{" "}
                        {program?.responsibilities
                          .split("\\r\\n")
                          .map((responsibilities, index) => (
                            <li key={index}>{responsibilities}</li>
                          ))}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p>
                        <strong>Tên Chương trình:</strong> {program.nameProgram}
                      </p>
                      <p>
                        <strong>Chuyên ngành:</strong> {program.major.majorName}
                      </p>
                      <p>
                        <strong>Loại chương trình:</strong>{" "}
                        {program.programType.typeName}
                      </p>

                      <p>
                        <strong>Thời gian:</strong> {program.duration}
                      </p>
                      <p>
                        <strong>Mô tả chương trình:</strong>{" "}
                        {program.description}
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
                        <strong>Yêu cầu của chương trình:</strong>{" "}
                        {program?.requirement
                          .split("\\r\\n")
                          .map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                          ))}
                      </p>
                      <p style={{ marginTop: "64px" }}>
                        <strong>Chi phí tham khảo:</strong>{" "}
                        {program?.tuition
                          .split("\\r\\n")
                          .map((tuition, index) => (
                            <li key={index}>{tuition}</li>
                          ))}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
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
                      <div className="mb-6">
                        {displayApplicationStages()}
                        <div style={{ marginBottom: "24px" }}>
                          {applyStages?.map((stage) => (
                            <div key={stage.id}>
                              {stage.name} - Status: {stage?.status}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Form>
                        <Row className="mb-3">
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
                                {renderPaymentStatus(
                                  activeStage?.programStage?.isPayment
                                )}
                              </strong>
                            </Form.Label>
                          </Col>
                          {/* <Col sm={3}>
                            <Form.Label>
                              <strong>Trạng thái thanh toán:</strong>
                            </Form.Label>
                          </Col>
                          <Col sm={9}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              {
                                getPaymentStatus(
                                  selectedApplication.payment?.status
                                ).icon
                              }
                              <span>
                                {
                                  getPaymentStatus(
                                    selectedApplication.payment?.status
                                  ).text
                                }
                              </span>
                            </div>
                          </Col> */}
                        </Row>
                        <Row>
                          <Col sm={{ span: 3, offset: 9 }}>
                            <Button variant="primary" onClick={updateStages}>
                              Cập nhật
                            </Button>
                          </Col>
                        </Row>
                      </Form>
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
                      <TableCell>Payment ID</TableCell>
                      <TableCell align="right">Số tiền</TableCell>
                      <TableCell align="right">Phương thức</TableCell>
                      <TableCell align="right">Ghi chú</TableCell>
                      <TableCell align="right">Ngày thanh toán</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                      <TableCell align="right">Hình ảnh</TableCell>{" "}
                      {/* Thêm cột mới này */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentPayments?.map((payment) => (
                      <TableRow key={payment.paymentId}>
                        <TableCell component="th" scope="row">
                          {payment.paymentId}
                        </TableCell>
                        <TableCell align="right">
                          {payment.amount.toLocaleString()}
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
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default Payment;
