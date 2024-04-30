import React, { useContext,useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgramApplicationById } from "../../redux/slice/programApplicationSlice";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tab, Tabs,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField
} from "@mui/material";
import { Stepper, Step, StepLabel } from '@mui/material';
import { Check as CheckIcon, Clear as ClearIcon, HourglassEmpty as HourglassEmptyIcon, RadioButtonUnchecked as RadioButtonUncheckedIcon } from '@mui/icons-material';

import {  getAllProgramFees } from '../../redux/slice/programFeeSlice';

import { useNavigate } from "react-router-dom";
import { Modal, ListGroup,Button, Row, Col,  Form, InputGroup, FormControl } from 'react-bootstrap';
import { getAllFeeTypes } from '../../redux/slice/feeTypeSlice';
import { getAllUniversity } from "../../redux/slice/universitySlice";
import { getAllUniversityType } from "../../redux/slice/universitySlice";
import { createPayment } from '../../redux/slice/paymentSlice';
import { getProgramStageById, getProgramStagesByProgramId } from "../../redux/slice/programStageSlice";
import { getAllStage } from "../../redux/slice/applyStageSlice";
import { getAllProgramStages } from "../../redux/slice/programStageSlice";
import Swal from "sweetalert2";
import { getProgramById } from "../../redux/slice/programSlice";

const   ProgramApplicationDetails = () => {
  const { programApplicationId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);

const handleTabChange = (event, newValue) => {
  setTabIndex(newValue);
};

  const dispatch = useDispatch();
  const details = useSelector(
    (state) => state.programApplication.programApplicationById
  );
  console.log("detals",details)

  const handleNavigateToProfile = () => {
    const studentProfileId = details?.studentProfileId;
    if (studentProfileId) {
      navigate(`/student-profile/${studentProfileId}`);
    }
  };

  useEffect(() => {
    if (programApplicationId) {
      dispatch(getProgramApplicationById(programApplicationId));
      dispatch(getAllStage());
      dispatch(getAllProgramStages());
      dispatch(getAllProgramFees());
      dispatch(getAllFeeTypes());
    }
  }, [dispatch, programApplicationId]);
  
  React.useEffect(() => {
    dispatch(getProgramApplicationById(programApplicationId));
  }, [dispatch, programApplicationId]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const imageStyle = {
    float: "right",
    marginLeft: "20px",
    width: "400px",
    height: "auto",
    borderRadius: "4px",
  };

  const navigate = useNavigate();

  const [note, setNote] = useState('');
  const [selectedFee, setSelectedFee] = useState(null);

  const [selectedProgramApplication, setSelectedProgramApplication] = useState(null);
  const programs = useSelector(state => state.program.programs);
  const universities = useSelector(state =>state.university.universities)
// console.log("programApplicationId",programApplicationId)
  const fees = useSelector(state => state?.programFee?.fees);
  const feeTypes = useSelector(state => state.feeType.feeTypes);
  const stages = useSelector(state=>state.applyStage.stages)
  const programStages = useSelector(state=>state.programStages.stages)


const getStageNameByProgramStageId = () =>{

  const stageName = programStages.find(
    (stageName) => stageName?.programStageId === programStages.programStageId
  );
  return stageName ? stageName.stageName : "Không biết stageName";


  // const stageName =  status.programStageId;
  // if ( stageName === id.programStageId){
  //   return stageName ? stageName.stageName
  // }
  
}
  // console.log("first,",stages)
    // Dispatch an action to fetch all users
    useEffect(() => {
      dispatch(getAllStage());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getProgramStagesByProgramId());
    }, [dispatch]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };  
  const handleRowClick = (programApplicationId) => {
    if (programApplicationId) {
      setSelectedProgramApplication(programApplicationId); // Set the selected program application
      setIsModalOpen(true); // Open the modal
    }
  };
  const getFeeTypeNameById = (feeTypeId) => {
    const feeType = feeTypes.find(type => type.feeTypeId === feeTypeId);
    return feeType ? feeType.typeName : 'Unknown';
  };
  const handlePaymentSubmit = () => {
    if (selectedFee && selectedProgramApplication) {
        const paymentData = {
            programApplicationId: details?.programApplicationId,
            method: "",
            amount: selectedFee.amount,
            orderInfo: note,
            paymentDate: new Date().toISOString(),
            transactionNo: 0,
        };
        dispatch(createPayment(paymentData)).then(response => {
            if (response.payload && response.payload) { 
                Swal.fire({
                    title: 'Tạo đơn thanh toán thành công!',
                    text: 'Qúy khách sẽ được chuyển đến trang thanh toán VNPAY sau vài giây.',
                    icon: 'success',
                    timer: 5000,
                    timerProgressBar: true,
                    willClose: () => {
                        window.location.href = response.payload;
                    }
                });
            } else {
                Swal.fire({
                    title: 'Tạo đơn thanh toán thất bại!',
                    text: 'Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Close'
            });
        });
        setIsModalOpen(false); 
    }
};
  const renderHTML = (rawHTML) => {
    // Replace \\r\\n with <br/>• and ensure rawHTML is not null or undefined
    const formattedHTML = rawHTML ? rawHTML.replace(/\\r\\n/g, "<br/>• ") : "";

    // Return a div with the formatted HTML content
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: formattedHTML },
    });
  };

  const formatTuition = (tuitionText) => {
    if (!tuitionText) return "";

    return tuitionText.replace(/\\r\\n/g, "<br/>• ");
  };

  const formatDescription = (description) => {
    return description.split(".").map((item, index) => (
      <React.Fragment key={index}>
        {item && (
          <React.Fragment>
            • {item.trim()}.
            {index !== description.split(".").length - 1 && <br />}
          </React.Fragment>
        )}
      </React.Fragment>
    ));
  };

  const programImageUrl = details?.program?.img;
  const universityImageUrl =
    details?.program?.university?.img;
  const studentProfileImage = details?.studentProfile?.img;

  const activeStage = details?.applyStage?.find(stage => stage.status === 1);

    
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
  const getStepIcon = (status) => {
    switch (status) {
      case 0:
        return <RadioButtonUncheckedIcon  color="error" />; 
      case 1:
        return <HourglassEmptyIcon color="action" />; 
      case 2:
        return <CheckIcon color="primary" />; 
      default:
        return <RadioButtonUncheckedIcon  />; 
    }
  };
  const StepIconComponent = (props) => {
    const { active, completed, icon } = props;
    
    if (typeof icon !== 'number') return icon; 
    
    const stepStatus = details.applyStage[icon - 1]?.status; 
    return getStepIcon(stepStatus);
  };
  const getPaymentStatusText = (isPayment) => {
    return isPayment ? 'Cần đóng phí' : 'Không cần đóng phí';
  };
  const displayApplicationStages = () => {
    const steps = Array.isArray(details.applyStage) ? details.applyStage.map((stage) => {
      const currentStage = programStages.find(ps => ps.programStageId === stage.programStageId);
      return {
        label: currentStage?.stageName || 'Unknown Stage',
        description: getStatusText(stage.status),
        payment : getPaymentStatusText(stage.programStage.isPayment),
        date: stage.updateDate
      };
    }) : [];  
  
    return (
      <Stepper activeStep={steps.length - 1} alternativeLabel sx={{ root: { backgroundColor: 'transparent' } }}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={StepIconComponent}
              optional={<Typography variant="caption">{step.payment}</Typography>}>
              {step.label}
              <br/>
              <Typography variant="caption" color="textSecondary">
                {step.description} 
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };
  

  
  return (
    <Grid container spacing={2} style={{ margin: "20px" }}>
      <Grid item xs={12} >
 
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Grid item xs={12} md={10}  style={{ marginBottom: "20px" }}>
  <Card elevation={6} sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom style={{textAlign:'center'}} >
     Tiến trình ứng tuyển hồ sơ
    </Typography>
    {displayApplicationStages()}
  </Card>
</Grid>

        </div>
        </Grid>
        
        <Box sx={{ width: '100%' }}>
        <Tabs 
  value={tabIndex} 
  onChange={handleTabChange} 
  aria-label="program application tabs"
  centered  
>
  <Tab label="Thông tin Hồ sơ" />
  <Tab label="Chọn khoản phí" />
  <Tab label="Lịch sử thanh toán" />
</Tabs>

            <TabPanel value={tabIndex} index={0}>
  <Typography variant="h3" component="h2" style={{ fontWeight: "700", textAlign: "center", marginBottom:'24px' }}>
    {details.program?.nameProgram}
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      {details.program?.img && (
        <Box
          component="img"
          src={details.program?.img}
          sx={{
            width: '100%',
            maxHeight: { xs: 'auto', md: '500px' },
            objectFit: 'contain',
            borderRadius: '4px',
          }}
          alt="Program Image"
        />
      )}
        <div className="row mt-4">
<div className="col-lg-12">
          <h4 className="title ">Mô tả</h4>
          <p>{details.program?.description}</p>
        </div>
        <div className="col-lg-12">
          <h4 className="title ">Trách nhiệm</h4>
          <ul>
            {details.program?.responsibilities
                .split("\\r\\n")
                .map((responsibilities, index) => (
                  <li key={index}>{responsibilities}</li>
                ))}
          </ul>
        </div>
        <div className="col-lg-12">
          <h4 className="title ">Yêu cầu của chương trình</h4>
          <p>{details.program?.requirement}</p>
        </div>
        <div className="col-lg-12">
          <h4 className="title">Chi phí khám khảo</h4>
          <ul>
            {details.program?.tuition
                .split("\\r\\n")
                .map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    </Grid>

    <Grid item xs={12} md={6}>
      <div className="td-sidebar">
        <div className="widget widget_feature">
          <h4 className="widget-title">Chi tiết Chương trình</h4>
          <ul>
            <li>
              <i className="fa fa-university" />
              <span>Trường Đại học:</span>
              <span style={{ fontSize: "1rem" }}>
                {details.program?.university?.universityName} - ({details.program?.university?.universityType.typeName})
              </span>
            </li>
            <li>
              <i className="fa fa-map-marker" />
              <span>Tiểu Bang:</span> {details.program?.university?.state?.stateName}
            </li>
            <li>
              <i className="fa fa-laptop" />
              <span>Chuyên ngành chính:</span> {details.program?.major?.majorName}
            </li>
            <li>
              <i className="fa fa-clipboard" />
              <span>Lộ trình học:</span> {details.program?.duration}
            </li>
            <li>
              <i className="fa fa-language" />
              <span>Trình độ đào tạo:</span> {details.program?.level}
            </li>
            <li>
              <i className="fa fa-calendar" />
              <span>Học kỳ:</span> {details.program?.semester?.startDate ? new Date(details.program?.semester?.startDate).toLocaleDateString() : 'Loading...'} đến {details.program?.semester?.endDate ? new Date(details.program?.semester?.endDate).toLocaleDateString() : 'Loading...'}
            </li>
            <li>
              <i className="fa fa-graduation-cap" />
              <span>Loại chương trình:</span> {details.program?.programType?.typeName}
            </li>
            <li>
              <i className="fa fa-forward" />
              <span>Giai đoạn hồ sơ:</span> {activeStage ? activeStage.programStage.stageName : "Không có giai đoạn đang xử lý"}
            </li>
            {/* <li>
              <Button variant="contained" color="primary" onClick={handleNavigateToProfile}>
                XEM HỒ SƠ HỌC SINH ỨNG TUYỂN VÀO CHƯƠNG TRÌNH NÀY
              </Button>
            </li> */}
          </ul>
          <div className="price-wrap text-center">
          <Button  color="primary" onClick={handleNavigateToProfile}>
                XEM HỒ SƠ HỌC SINH ỨNG TUYỂN VÀO CHƯƠNG TRÌNH NÀY
              </Button>
          </div>
        </div>
      </div>
    </Grid>
  </Grid>

</TabPanel>
<TabPanel value={tabIndex} index={1}>
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>
      Chi phí cần đóng
    </Typography>
    <Typography variant="subtitle1">
      {details?.applyStage?.programStage?.isPayment ?
        `Lựa chọn khoản phí cần đóng theo giai đoạn hồ sơ: ${details.applyStage?.programStage.stageName}` :
        "Không cần đóng"}
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextFee">
        <Form.Label column sm="4">
          Chọn khoản phí:
        </Form.Label>
        <Col sm="8">
          <Form.Control as="select" value={selectedFee?.programFeeId || ''} onChange={e => {
              const feeId = e.target.value;
              setSelectedFee(fees.find(f => f.programFeeId.toString() === feeId));
            }}>
            {fees.filter(fee => fee.programId === details?.applyStage?.programStage?.program?.programId).map(fee => (
              <option key={fee.programFeeId} value={fee.programFeeId}>
                {fee.amount} VND ({getFeeTypeNameById(fee.feeTypeId)})
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <InputGroup className="mb-3">
        <InputGroup.Text>Note:</InputGroup.Text>
        <FormControl as="textarea" rows={3} value={note} onChange={handleNoteChange} />
      </InputGroup>
      <Button variant="primary" onClick={handlePaymentSubmit}>Xác nhận</Button>
    </Box>
  </Box>
</TabPanel>

            <TabPanel value={tabIndex} index={2}>
                {/* Content for Lịch sử thanh toán */}
                {/* Add your structured JSX layout here for tab 3 */}
            </TabPanel>
        </Box>
    

    </Grid>
    
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Box sx={{ p: 3 }}>
                  {children}
              </Box>
          )}
      </div>
  );
}
export default ProgramApplicationDetails;
