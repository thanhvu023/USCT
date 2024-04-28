// import React, { useContext, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Form, Button, Card, InputGroup, FormControl, Select, Label } from 'react-bootstrap';

// import PaymentContext from './context/payment-context';
// import { getProgramFeesByProgramId, getAllProgramFees } from '../../../redux/slice/programFeeSlice';
// import { getAllFeeTypes } from '../../../redux/slice/feeTypeSlice';
// import { createPayment } from '../../../redux/slice/paymentSlice';

// const Payment = () => {
   
//     const responseBody = useSelector(state => state.payment.responseBody);
//     console.log("22222222",responseBody)
//     const dispatch = useDispatch();
//     const { selectedApp: selectedApplication } = useContext(PaymentContext);
//     const fees = useSelector(state => state.programFee.fees);
//     const feeTypes = useSelector(state => state.feeType.feeTypes); 

//     const [filteredFees, setFilteredFees] = useState([]);
//     const [selectedFee, setSelectedFee] = useState(null);
//     const [note, setNote] = useState('');

//     useEffect(() => {
//         dispatch(getAllProgramFees());
//         dispatch(getAllFeeTypes());
//         if (selectedApplication) {
//             dispatch(getProgramFeesByProgramId(selectedApplication.programId));
//         }
//     }, [dispatch, selectedApplication]);

//     useEffect(() => {
//         if (selectedApplication) {
//             const filtered = fees.filter(fee => fee.programId === selectedApplication.programId);
//             setFilteredFees(filtered);
//         }
//     }, [fees, selectedApplication]);

//     const handleFeeSelection = (event) => {
//         const feeId = event.target.value;
//         const fee = filteredFees.find(f => f.programFeeId.toString() === feeId);
//         setSelectedFee(fee);
//     };

//     const handleNoteChange = (event) => {
//         setNote(event.target.value);
//     };

//     const handlePaymentSubmit = () => {
//         if (selectedFee) {
//             const paymentData = {
//                 programApplicationId: selectedApplication.programApplicationId,
//                 method: "", 
//                 amount: selectedFee.amount,
//                 orderInfo: note,
//                 paymentDate: new Date().toISOString(),
//                 transactionNo: 0, 
//             };
//             dispatch(createPayment(paymentData));
//             setSelectedFee(null);
//             setNote('');
//         }
//     };

//     if (!selectedApplication) {
//         return <div>Please select an application to make a payment.</div>;
//     }

//     return (
//         <Container className="mt-5">
//             <Card>
//                 <Card.Header><strong>Thông Tin Thanh Toán</strong></Card.Header>
//                 <Card.Body>
//                     <Form>
//                         <Row>
//                             <Col md={6}>
//                                 <Form.Group controlId="programInfo">
//                                     <Form.Label>Tên chương trình</Form.Label>
//                                     <Form.Control readOnly value={selectedApplication?.applyStage?.programStage?.program?.major?.majorName || ''} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6}>
//                                 <Form.Group controlId="studentName">
//                                     <Form.Label>Hồ sơ học sinh</Form.Label>
//                                     <Form.Control readOnly value={selectedApplication?.studentProfile?.fullName || ''} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6}>
//                                 <Form.Group controlId="feeSelect">
//                                     <Form.Label>Chọn khoản phí</Form.Label>
//                                     <Form.Select value={selectedFee?.programFeeId || ''} onChange={handleFeeSelection}>
//                                         <option value="">Chọn...</option>
//                                         {filteredFees.map(fee => (
//                                             <option key={fee.programFeeId} value={fee.programFeeId}>
//                                                 {feeTypes.find(type => type.feeTypeId === fee.feeTypeId)?.typeName || 'Unknown Fee'}
//                                             </option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6}>
//                                 <Form.Group controlId="feeAmount">
//                                     <Form.Label>Số tiền</Form.Label>
//                                     <InputGroup>
//                                         <InputGroup.Text>VND</InputGroup.Text>
//                                         <FormControl readOnly value={selectedFee?.amount || '0'} />
//                                     </InputGroup>
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={12}>
//                                 <Form.Group controlId="note">
//                                     <Form.Label>Thông tin thêm</Form.Label>
//                                     <FormControl as="textarea" rows={3} value={note} onChange={handleNoteChange} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Button variant="primary" onClick={handlePaymentSubmit}>Gửi thanh toán qua VNPAY</Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default Payment;
