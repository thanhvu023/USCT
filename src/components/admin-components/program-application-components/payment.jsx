import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Card, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { getStudentProfileById, getAllProgram, getProgramById, getProgramStageById } from "../../../redux/slice/programSlice";
import PaymentContext from './context/payment-context';
import { getProgramFeesByProgramId, getAllProgramFees } from '../../../redux/slice/programFeeSlice';
import { getAllFeeTypes } from '../../../redux/slice/feeTypeSlice';
import { createPayment } from '../../../redux/slice/paymentSlice';

const Payment = () => {
    const dispatch = useDispatch();
    const { selectedApp: selectedApplication } = useContext(PaymentContext);
    const customers = useSelector((state) => state.auth.user);
    const programs = useSelector(state => state.program.programs);
    const fees = useSelector(state => state.programFee.fees);
    const feeTypes = useSelector(state => state.feeType.feeTypes);
console.log("này là",selectedApplication)
    useEffect(() => {
        dispatch(getAllProgramFees());
        dispatch(getAllFeeTypes());
        if (selectedApplication) {
            dispatch(getProgramFeesByProgramId(selectedApplication.programId));
        }
    }, [dispatch, selectedApplication]);

    const [filteredFees, setFilteredFees] = useState([]);
    const [selectedFee, setSelectedFee] = useState(null);
    const [note, setNote] = useState('');

    useEffect(() => {
        if (selectedApplication) {
            const filtered = fees.filter(fee => fee.programId === selectedApplication.programId);
            setFilteredFees(filtered);
        }
    }, [fees, selectedApplication]);

    const handleFeeSelection = (event) => {
        const feeId = event.target.value;
        const fee = filteredFees.find(f => f.programFeeId.toString() === feeId);
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
            setNote('');
        }
    };

    const getTypeNameById = (feeTypeId) => {
        const feeType = feeTypes.find(type => type.feeTypeId === feeTypeId);
        return feeType ? feeType.typeName : '';
    };

    if (!selectedApplication) {
        return <div>Please select an application to make a payment.</div>;
    }
    const programName = useMemo(() => {
      const program = programs.find(p => p.programId === selectedApplication.programId);
      return program ? program.nameProgram : 'Chưa xác định';
    }, [programs, selectedApplication]);
    const programDuration = useMemo(() => {
      const duration = programs.find(p => p.programId === selectedApplication.programId);
      return duration ? duration.duration : 'Chưa xác định';
    }, [programs, selectedApplication]);

    const { studentProfile, program } = selectedApplication;
    const activeStage = selectedApplication.applyStage.find(stage => stage.status === 1); // assuming '1' means active

    return (
        <Container className="mt-5">
    <Card >
    <Card.Header style={{ textAlign: 'center' }}>
  <h2>Chương trình</h2>
</Card.Header>
                        <Card.Body>
                            <Row>
                            <Col md={6}>
        <img
          src={program.img}
          alt="Program"
          style={{ width: '100%', marginBottom: '20px'}}
        />
        <p><strong>Trách nhiệm:</strong>   {program?.responsibilities
                          .split("\\r\\n")
                          .map((responsibilities, index) => (
                            <li key={index}>{responsibilities}</li>
                          ))}</p>
      </Col>
                                <Col md={6}>
                                <p><strong>Tên Chương trình:</strong> {program.nameProgram}</p>
                                <p><strong>Chuyên ngành:</strong> {program.major.majorName}</p>
                                <p><strong>Loại chương trình:</strong> {program.programType.typeName}</p>

                                <p><strong>Thời gian:</strong> {program.duration}</p>
                            <p><strong>Mô tả chương trình:</strong> {program.description}</p>
                            <p><strong>Trường đại học:</strong> {program.university.universityName} ({program.university.universityType.typeName})</p>
                            <p><strong>Thuộc bang:</strong> {program.university.state.stateName}</p>
                            
                           <p><strong>Yêu cầu của chương trình:</strong>   {program?.requirement
                          .split("\\r\\n")
                          .map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                          ))}</p>
                          <p style={{marginTop:'24px'}}><strong>Chi phí tham khảo:</strong>   {program?.tuition
                          .split("\\r\\n")
                          .map((tuition, index) => (
                            <li key={index}>{tuition}</li>
                          ))}</p>
                                </Col>
                             
                            </Row>
                        
                        </Card.Body>
                    </Card>

            <Row style={{marginTop:'24px'}}>
                <Col>
                    <Card>
                        <Card.Header style={{ textAlign: 'center' }}><h2>Thông tin hồ sơ</h2></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                <p><strong>Mã hồ sơ:</strong> {studentProfile.studentProfileId}</p>
                                <p><strong>Ngày tạo hồ sơ:</strong> {studentProfile.createDate}</p>

                            <p><strong>Khai sinh:</strong> {studentProfile.dateOfBirth}</p>
                            <p><strong>Địa chỉ thường trú:</strong> {studentProfile.address}</p>
                            <p><strong>Mã số căn cước công dân:</strong> {studentProfile.nationalId}</p>
                                </Col>
                                <Col md={6}>
                                    
                                <p><strong>Họ và tên:</strong> {studentProfile.fullName}</p>
                                <p><strong>Giới tính:</strong> {studentProfile.gender}</p>
                                <p><strong>Số điện thoại:</strong> {studentProfile.phone}</p>
                                <p><strong>Email:</strong> {studentProfile.email}</p>

                            <p><strong>Học vấn :</strong> {studentProfile.grade}</p>
                                </Col>
                            </Row>
                           
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>
                <Card>
                        <Card.Header style={{ textAlign: 'center' }}><h2>Thanh toán</h2></Card.Header>
                        <Card.Body>
                            <Form>
                            <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">Tiến trình hồ sơ:</Form.Label>
                                    <Col sm="6">
                                    {studentProfile.applyStage}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">Chọn phí thủ tục:</Form.Label>
                                    <Col sm="9">
                                        <Form.Select value={selectedFee ? selectedFee.programFeeId : ''} onChange={handleFeeSelection}>
                                            <option value="">Lựa chọn phí theo trạng thái hồ sơ</option>
                                            {filteredFees.map(fee => (
                                                <option key={fee.programFeeId} value={fee.programFeeId}>
                                                    {getTypeNameById(fee.feeTypeId)}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                {selectedFee && (
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">Số tiền phí:</Form.Label>
                                        <Col sm="9">
                                            <FormControl plaintext readOnly defaultValue={selectedFee.amount + ' VND'} />
                                        </Col>
                                    </Form.Group>
                                )}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">Thông tin thêm:</Form.Label>
                                    <Col sm="9">
                                        <FormControl type="text" value={note} onChange={handleNoteChange} />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" onClick={handlePaymentSubmit}>Gửi thanh toán</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    
                </Col>
                
            </Row>
       
                
        </Container>
    );
};

export default Payment;
