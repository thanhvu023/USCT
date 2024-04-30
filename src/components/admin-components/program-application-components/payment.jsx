import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Card,FormControl } from 'react-bootstrap';
import { Stepper, Step, StepLabel } from '@mui/material';
import Swal from 'sweetalert2';

import { Check as CheckIcon, Clear as ClearIcon, HourglassEmpty as HourglassEmptyIcon } from '@mui/icons-material';
import { getStudentProfileById, getAllProgram, getProgramById, getProgramStageById } from "../../../redux/slice/programSlice";
import PaymentContext from './context/payment-context';
import { getProgramFeesByProgramId, getAllProgramFees } from '../../../redux/slice/programFeeSlice';
import { getAllFeeTypes } from '../../../redux/slice/feeTypeSlice';
import { createPayment } from '../../../redux/slice/paymentSlice';
import { getAllStage, updateApplyStage } from '../../../redux/slice/applyStageSlice';
const Payment = () => {
    const dispatch = useDispatch();
    const { selectedApp: selectedApplication } = useContext(PaymentContext);
    const applyStages = useSelector((state) => state.applyStage.applyStages || []);
    const activeStage = selectedApplication?.applyStage?.find(stage => stage.status === 1);
    
    console.log("hiện tại:",activeStage)
    useEffect(() => {
        dispatch(getAllStage());
    }, [dispatch]);
    const updateStages = () => {
        if (!selectedApplication || !selectedApplication.applyStage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Không có thông tin ứng dụng hoặc giai đoạn nào được chọn!',
            });
            return;
        }
    
        const currentStages = selectedApplication.applyStage;
   
        const activeIndex = currentStages.findIndex(stage => stage.status === 1);
    
        if (activeIndex === -1) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Không tìm thấy giai đoạn đang hoạt động!',
            });
            return;
        }
    
        const currentStage = currentStages[activeIndex];
       
        if (currentStage) {
            dispatch(updateApplyStage({
                applyStageId: currentStage.applyStageId,
                programStageId: currentStage.programStageId,
                programApplicationId: currentStage.programApplicationId,
                status: 2 
            })).then(() => {
                
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Cập nhật thành công!',
                //     text: 'Tiến trình hồ sơ đã được cập nhật .',
                //     showConfirmButton: false,
                //     timer: 1500
                // });
    
                dispatch(getAllStage()); 
    
                const nextStage = currentStages[activeIndex + 1];
                if (nextStage) {
                    dispatch(updateApplyStage({
                        applyStageId: nextStage.applyStageId,
                        programStageId: nextStage.programStageId,
                        programApplicationId: nextStage.programApplicationId,
                        status: 1 
                    }));
                    const message = `Tiến trình hồ sơ đã được cập nhật từ ${currentStage?.programStage.stageName} đến ${nextStage.programStage.stageName}`;
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật thành công!',
                        text: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    console.log("Đây là giai đoạn cuối cùng hoặc không có thông tin giai đoạn tiếp theo.");
                }
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi cập nhật!',
                    text: 'Không thể cập nhật giai đoạn này.',
                });
                console.error("Failed to update the current stage:", error);
            });
        } else {
            console.log("Không có giai đoạn hiện tại hợp lệ để cập nhật.");
        }
    };
    
    
    
    const customers = useSelector((state) => state.auth.user);
    const programs = useSelector(state => state.program.programs);
    const fees = useSelector(state => state.programFee.fees);
    const feeTypes = useSelector(state => state.feeType.feeTypes);
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
 
    const displayApplicationStages = () => {
        return (
            <Stepper activeStep={findActiveStageIndex()} alternativeLabel>
                {selectedApplication.applyStage.map((stage, index) => (
                    <Step key={stage.applyStageId}>
                        <StepLabel icon={<StepIcon status={stage.status}/>}>
                            {stage.programStage.stageName}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        );
    };

    const findActiveStageIndex = () => {
        return selectedApplication.applyStage.findIndex(stage => stage.status === 1); // Assuming '1' indicates the current active stage
    };

    const StepIcon = ({ status }) => {
        switch (status) {
            case 0: return <ClearIcon color="error" />;
            case 1: return <HourglassEmptyIcon color="action" />;
            case 2: return <CheckIcon color="primary"  />;
            default: return <ClearIcon />;
        }
    };

    const { studentProfile, program } = selectedApplication;

    return (
        <Container className="mt-5">


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
            <Card.Header style={{ textAlign: 'center' }}><h2>Cập nhật tiến trình hồ sơ</h2></Card.Header>
            <Card.Body>
         <Col sm='12'>
        {displayApplicationStages()} 
         </Col>
                <div style={{ marginBottom: '24px' }}>
                    {applyStages?.map(stage => (
                        <div key={stage.id}>
                            {stage.name} - Status: {stage.status}
                        </div>
                    ))}
                </div>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Giai đoạn hồ sơ:</Form.Label>
                        <Form.Label column sm="6">{activeStage?.programStage?.stageName || 'No active stage'}</Form.Label>

                    </Form.Group>
                    <Button variant="primary" onClick={updateStages}>Cập nhật</Button>
                </Form>
            </Card.Body>
        </Card>
                </Col>
                
            </Row>
       
        
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
                    <Card>
                        <Card.Header style={{ textAlign: 'center' }}><h2>Tạo đơn thanh toán</h2></Card.Header>
                        <Card.Body>
                            <Form>
                            <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">Giai đoạn hồ sơ:</Form.Label>
                                    <Col sm="6">
                                    {activeStage?.programStage.stageName}                                    
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3"> Phí thủ tục:</Form.Label>
                                    <Col sm="9">
                                        {/* <Form.Select value={selectedFee ? selectedFee.programFeeId : ''} onChange={handleFeeSelection}>
                                            <option value="">Lựa chọn phí theo giai đoạn hồ sơ</option>
                                            {filteredFees.map(fee => (
                                                <option key={fee.programFeeId} value={fee.programFeeId}>
                                                    {getTypeNameById(fee.feeTypeId)}
                                                </option>
                                            ))}
                                        </Form.Select> */}
                                        Phí nộp hồ sơ - 20000 VND
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
                                    <Form.Label column sm="3">Ghi chú:</Form.Label>
                                    <Col sm="9">
                                        <FormControl type="text" value={note} onChange={handleNoteChange} />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" onClick={handlePaymentSubmit}>Gửi thanh toán</Button>
                            </Form>
                        </Card.Body>
                    </Card>
        </Container>
    );
};

export default Payment;









        
   
      
