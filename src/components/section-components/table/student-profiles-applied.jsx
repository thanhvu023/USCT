import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useFilters, usePagination } from "react-table";
import jwtDecode from "jwt-decode";
import {
  getProgramFeesByProgramId,
  getAllProgramFees,
} from "../../../redux/slice/programFeeSlice";
import { getAllFeeTypes } from "../../../redux/slice/feeTypeSlice";
import { getProgramApplicationsByCustomerId } from "../../../redux/slice/programApplicationSlice";
import { getProgramApplicationsByStudentProfileId } from "../../../redux/slice/programApplicationSlice";
import { COLUMNS } from "./student-profile-applied-columns";
import {
  Modal,
  Button,
  ListGroup,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { getAllStage } from "../../../redux/slice/applyStageSlice";
import { createPayment } from "../../../redux/slice/paymentSlice";

import "./student-profile.css";

const StudentProfileAppliedList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = useMemo(() => COLUMNS, []);
  const token = useSelector((state) => state.auth.token);
  const [customerId, setCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgramApplication, setSelectedProgramApplication] =
    useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [note, setNote] = useState("");
  const [redirectToVnpay, setRedirectToVnpay] = useState(false);
  const paymentResponse = useSelector((state) => state.payment.responseBody);
  // console.log("redirectToVnpay",redirectToVnpay)

  // const stages = useSelector(state=>state.applyStage.stages)
  const fees = useSelector((state) => state.programFee.fees);
  const feeTypes = useSelector((state) => state.feeType.feeTypes);
  const programApplications = useSelector(
    (state) => state.programApplication.programApplicationsByCustomerId || []
  );
  // const programApplicationByStu = useSelector(state =>state.programApplication.programApplicationsByStudentProfileId || []);
  // console.log("stages",stages)

  const handleRowClick = (programApplicationId) => {
    navigate(
      `/student-profile/program-application-detail/${programApplicationId}`
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      setCustomerId(decoded.UserId);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, [token]);

  useEffect(() => {
    if (customerId) {
      dispatch(getProgramApplicationsByCustomerId(customerId));
      dispatch(getAllFeeTypes());
      dispatch(getAllProgramFees());
      dispatch(getAllStage());
    }
  }, [customerId, dispatch]);
  // useEffect(() => {
  //   if (programApplicationByStu) {
  //       dispatch(getProgramApplicationsByStudentProfileId(programApplicationByStu));

  //   }
  // }, [programApplicationByStu, dispatch]);

  useEffect(() => {
    if (selectedProgramApplication) {
      const filteredFees = fees.filter(
        (fee) => fee.programId === selectedProgramApplication.programId
      );
      setSelectedFee(filteredFees?.length > 0 ? filteredFees[0] : null);
    }
  }, [fees, selectedProgramApplication]);

  useEffect(() => {
    dispatch(getAllFeeTypes());
    dispatch(getAllProgramFees());
  }, [dispatch]);

  // const handleRowClick = (programApplication) => {
  //   if (programApplication) {
  //     setSelectedProgramApplication(programApplication);
  //     setIsModalOpen(true);
  //   }
  // };
  const handlePaymentSubmit = () => {
    if (selectedFee && selectedProgramApplication) {
      const paymentData = {
        programApplicationId: selectedProgramApplication.programApplicationId,
        method: "",
        amount: selectedFee.amount,
        orderInfo: note,
        paymentDate: new Date().toISOString(),
        transactionNo: 0,
      };
      dispatch(createPayment(paymentData))
        .then((response) => {
          // Check the response and handle accordingly
          if (response.payload && response.payload) {
            Swal.fire({
              title: "Tạo đơn thanh toán thành công!",
              text: "Qúy khách sẽ được chuyển đến trang thanh toán VNPAY sau vài giây.",
              icon: "success",
              timer: 5000,
              timerProgressBar: true,
              willClose: () => {
                window.location.href = response.payload;
              },
            });
          } else {
            Swal.fire({
              title: "Tạo đơn thanh toán thất bại!",
              text: "Please try again later.",
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "Close",
          });
        });
      setIsModalOpen(false);
    }
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const [filteredFees, setFilteredFees] = useState([]);
  //   useEffect(() => {
  //     dispatch(getAllProgramFees());
  //     dispatch(getAllFeeTypes());
  //     if (selectedApplication) {
  //         dispatch(getProgramFeesByProgramId(selectedApplication.programId));
  //     }
  // }, [dispatch, selectedApplication]);
  const getFeeTypeNameById = (feeTypeId) => {
    const feeType = feeTypes.find((type) => type.feeTypeId === feeTypeId);
    return feeType ? feeType.typeName : "Unknown";
  };

  useEffect(() => {
    if (selectedProgramApplication) {
      const filteredFees = fees.filter(
        (fee) => fee.programId === selectedProgramApplication.programId
      );
      setSelectedFee(filteredFees?.length > 0 ? filteredFees[0] : null);
    }
  }, [fees, selectedProgramApplication]);

  // const startDate = selectedProgramApplication.applyStage?.programStage.program.semester.startDate;
  // const endDate = selectedProgramApplication.applyStage?.programStage.program.semester.endDate;
  // const formattedStartDate = new Date(startDate).toLocaleDateString();
  // const formattedEndDate = new Date(endDate).toLocaleDateString();
  const data = useMemo(() => programApplications || [], [programApplications]);

  const tableInstance = useTable({ columns, data }, useFilters, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
    state: { pageIndex },
  } = tableInstance;

  return (
    <div className="card">
      <div className="card-body">
        <div className="table-responsive">
          <table
            {...getTableProps()}
            className="table dataTable display custom-table"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    {...row.getRowProps({
                      onClick: () =>
                        handleRowClick(row.original.programApplicationId),
                    })}
                  >
                    {row.cells.map((cell) => (
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={isModalOpen} onHide={handleCloseModal} centered>
            <Modal.Body>
              {selectedProgramApplication && (
                <Card>
                  <Card.Header as="h5">
                    Thông tin chương trình đã đăng ký
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Trường Đại học:</strong>
                        </Col>
                        <Col sm={8}>
                          {
                            selectedProgramApplication?.applyStage?.programStage
                              .program.university.universityName
                          }{" "}
                          (
                          {
                            selectedProgramApplication.applyStage?.programStage
                              .program.university.universityType.typeName
                          }
                          )
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Tiểu bang:</strong>
                        </Col>
                        <Col sm={8}>
                          {
                            selectedProgramApplication?.applyStage?.programStage
                              .program.university.state.stateName
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Chuyên ngành chính:</strong>
                        </Col>
                        <Col sm={8}>
                          {
                            selectedProgramApplication?.applyStage?.programStage
                              .program.major.majorName
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Lộ trình học:</strong>
                        </Col>
                        <Col sm={8}>
                          {
                            selectedProgramApplication?.applyStage?.programStage
                              .program.duration
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Trình độ đào tạo:</strong>
                        </Col>
                        <Col sm={8}>
                          {
                            selectedProgramApplication?.applyStage?.programStage
                              .program.level
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Học kỳ:</strong>
                        </Col>
                        {/* <Col sm={8}>bắt đầu từ {formattedStartDate} đến {formattedEndDate}</Col> */}
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col sm={4}>
                          <strong>Loại chương trình:</strong>
                        </Col>
                        <Col sm={8}>
                          {
                            selectedProgramApplication?.applyStage?.programStage
                              .program.programType.typeName
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {selectedProgramApplication && selectedFee && (
                      <ListGroup.Item>
                        <Row>
                          <Col sm={4}>
                            <strong>Chi phí cần đóng:</strong>
                          </Col>
                          <Col sm={8}>
                            {selectedProgramApplication?.applyStage
                              ?.programStage.isPayment
                              ? `Lựa chọn khoản phí cần đóng theo gia đoạn hồ so: ${selectedProgramApplication.applyStage?.programStage.stageName}`
                              : "Không cần đóng"}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    {selectedProgramApplication?.applyStage?.programStage
                      .isPayment ? (
                      <>
                        <ListGroup.Item>
                          <Row>
                            <Col sm={4}>
                              <strong>Chọn khoản phí:</strong>
                            </Col>
                            <Col sm={8}>
                              <Form.Control
                                as="select"
                                value={selectedFee?.programFeeId || ""}
                                onChange={(e) => {
                                  const feeId = e.target.value;
                                  setSelectedFee(
                                    fees.find(
                                      (f) => f.programFeeId.toString() === feeId
                                    )
                                  );
                                }}
                              >
                                {fees
                                  .filter(
                                    (fee) =>
                                      fee.programId ===
                                      selectedProgramApplication.programId
                                  )
                                  .map((fee) => (
                                    <option
                                      key={fee.programFeeId}
                                      value={fee.programFeeId}
                                    >
                                      {fee.amount} VND (
                                      {getFeeTypeNameById(fee.feeTypeId)})
                                    </option>
                                  ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <InputGroup>
                            <InputGroup.Text>Note:</InputGroup.Text>
                            <FormControl
                              as="textarea"
                              rows={3}
                              value={note}
                              onChange={handleNoteChange}
                            />
                          </InputGroup>
                        </ListGroup.Item>
                      </>
                    ) : (
                      ""
                    )}
                  </ListGroup>
                </Card>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              {selectedProgramApplication?.applyStage?.programStage
                .isPayment ? (
                <Button variant="primary" onClick={handlePaymentSubmit}>
                  Xác nhận
                </Button>
              ) : (
                ""
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileAppliedList;
