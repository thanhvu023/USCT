import React, { useContext,useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgramApplicationById } from "../../redux/slice/programApplicationSlice";
import { getAllPayments, getPaymentById, getPaymentByProgramApplicationId, updatePayment } from "../../redux/slice/paymentSlice";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tab, Tabs,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, Paper, 
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
  IconButton,
  

} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from "@mui/system";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { Stepper, Step, StepLabel } from '@mui/material';
import { Check as CheckIcon, Clear as ClearIcon, HourglassEmpty as HourglassEmptyIcon, RadioButtonUnchecked as RadioButtonUncheckedIcon } from '@mui/icons-material';
import { Backdrop, CircularProgress } from "@mui/material";
import {  getAllProgramFees } from '../../redux/slice/programFeeSlice';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../FirebaseImage/Config";
import { useNavigate } from "react-router-dom";
import { Modal, ListGroup,Button, Row, Col,  Form, InputGroup, FormControl,
  Badge,ListGroupItem } from 'react-bootstrap';
import { getAllFeeTypes } from '../../redux/slice/feeTypeSlice';
import { getAllUniversity } from "../../redux/slice/universitySlice";
import { getAllUniversityType } from "../../redux/slice/universitySlice";
import { createPayment, createVnPayLink } from '../../redux/slice/paymentSlice';
import { getProgramStageById, getProgramStagesByProgramId } from "../../redux/slice/programStageSlice";
import { getAllStage } from "../../redux/slice/applyStageSlice";
import { getAllProgramStages } from "../../redux/slice/programStageSlice";
import Swal from "sweetalert2";
import { getProgramById } from "../../redux/slice/programSlice";
import { getProgramCertificateByProgramId } from "../../redux/slice/program-document";
import { getAllStudentCertificatesByProfile } from "../../redux/slice/studentCertificateSlice";
import { createDocument } from "../../redux/slice/student-document";
import { getAllDocumentTypes } from "../../redux/slice/documentTypesSlice";
const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider || '#e0e0e0'}`,
  boxShadow: theme.shadows ? theme.shadows[3] : '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  maxWidth: '90%',
  margin: '0 auto',
 
 
}));

const   ProgramApplicationDetails = () => {
  const { programApplicationId } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
const handleTabChange = (event, newValue) => {
  setTabIndex(newValue);
};

  const dispatch = useDispatch();
  const  documentTypes = useSelector((state) => state.document.allDocumentTypes);
 const newDocument = useSelector((state) => state.studentDocument);
 console.log('Document Types:', documentTypes);

 const [documentData, setDocumentData] = useState({
  file: null  ,
  programApplicationId: programApplicationId,
  documentTypeId: '',
});

  const details = useSelector(
    (state) => state.programApplication.programApplicationById
  );
  console.log("details",details)
  const payments = useSelector((state) => state.payment .paymentsByApplicationId);

  const programDocuments = useSelector((state) => state.programDocument.programCertificateByProgramId);
  console.log("programDocuments",programDocuments)

  const handleNavigateToProfile = () => {
    const studentProfileId = details?.studentProfileId;
    if (studentProfileId) {
      navigate(`/student-profile/${studentProfileId}`);
    }
  };
  const [showDetailedFees, setShowDetailedFees] = useState(false);
  const toggleFeesDetail = () => {
    setShowDetailedFees(!showDetailedFees);
};

  useEffect(() => {
    if (programApplicationId) {
      dispatch(getProgramApplicationById(programApplicationId));
      dispatch(getPaymentByProgramApplicationId(programApplicationId));
      dispatch(getProgramCertificateByProgramId(details?.program?.programId)); // Thêm dòng này

      dispatch(getAllStage());
      dispatch(getAllProgramStages());
      dispatch(getAllProgramFees());
      dispatch(getAllFeeTypes());
   
    }
  }, [dispatch, programApplicationId]);
  
  useEffect(()=>{
    dispatch(getAllDocumentTypes());
  },[dispatch]);

  React.useEffect(() => {
    dispatch(getProgramApplicationById(programApplicationId));
  }, [dispatch, programApplicationId, details?.program?.programId]);

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
  const [method, setMethod] = useState('order');
  const [loading, setLoading] = useState(false);

  const [selectedProgramApplication, setSelectedProgramApplication] = useState(null);
  const programs = useSelector(state => state.program.programs);
  const universities = useSelector(state =>state.university.universities)
//   console.log("details?.programApplicationId,",details?.programApplicationId)
// console.log("selectedFee",selectedFee?.amount)
// console.log("note",note)


  const fees = useSelector(state => state?.programFee?.fees);
  const feeTypes = useSelector(state => state.feeType.feeTypes);
  const stages = useSelector(state=>state.applyStage.stages)
  const programStages = useSelector(state=>state.programStages.stages)
  const studentCertificates = useSelector((state) => state.studentCertificate.studentCertificates);
  console.log("studentCertificates",studentCertificates)

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
    useEffect(() => {
      if (details?.studentProfileId) {
        dispatch(getAllStudentCertificatesByProfile(details?.studentProfileId));
      }
    }, [dispatch, details?.studentProfileId]);
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


 


  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const [paymentId, setPaymentId] = useState(null); 

console.log("ảnh aaaa",img)
console.log(" paymentId",paymentId)


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      setFile(file);
      const localImageUrl = URL.createObjectURL(file);
      setImg(localImageUrl); 
      console.log("Preview image URL set:", localImageUrl);
  }
};

const [paymentSuccess, setPaymentSuccess] = useState(false);


const handlePaymentSubmit = () => {
  if (selectedFee && details?.programApplicationId && selectedFee.amount && note) {
    const paymentData = {
      programApplicationId: details.programApplicationId,
      method: "Thanh toán qua phương thức khác",
      amount: selectedFee.amount,
      note: note,
      paymentDate: new Date().toISOString(),
      transactionNo: 0,
    };

    dispatch(createPayment(paymentData))
      .then(response => {
        setPaymentSuccess(true);
        setPaymentId(response.payload.paymentId);
        Swal.fire({
          title: 'Thanh toán xác nhận!',
          text: 'Thanh toán đã được xác nhận thành công.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            setIsUploadingEnabled(true); // Cho phép hiển thị nút tải ảnh lên
          }
        });
      })
      .catch(error => {
        console.error("Payment submission error:", error);
        setPaymentSuccess(false);
        Swal.fire('Lỗi!', 'Thanh toán không thành công.', 'error');
      });
  } else {
    console.error("Payment submission aborted: Missing fee selection or program application.");
    setPaymentSuccess(false);
  }
};


const handleImageUpload = async () => {
  if (!paymentId) {
    Swal.fire('Error!', 'No payment ID available for updating.', 'error');
    return;
  }

  if (file) {
    const imgRef = ref(imageDb, `Image/Payment/${file.name}`);
    try {
      await uploadBytes(imgRef, file);
      const imgURL = await getDownloadURL(imgRef);
      
      const currentPaymentDetails = await dispatch(getPaymentById(paymentId)).unwrap();

      const updatedPaymentData = {
        ...currentPaymentDetails,
        img: imgURL ,
      };

      await dispatch(updatePayment({ id: paymentId, data: updatedPaymentData }));

      Swal.fire({
        title: 'Tải lên thành công',
        text: 'Ảnh xác thực thanh toán đã được tải lên thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();  
      });
    } catch (error) {
      console.error("Lỗi! Tải hình ảnh lên:", error);
      Swal.fire('Lỗi!', 'Không thể tải hình ảnh lên.', 'error');
    }
  } else {
    Swal.fire('Cảnh báo!', 'Không có tệp nào được chọn để tải lên.', 'info');
  }
};
const [isUploadingEnabled, setIsUploadingEnabled] = useState(false);




const handleCreateVnPayLink = async () => {
  const totalAmount = fees.filter(fee => fee?.programId === details.program?.programId)
                          .reduce((sum, current) => sum + current.amount, 0);

  const paymentData = {
    amount: totalAmount,
    orderInfo: `Total payment for program application ID ${details.programApplicationId}`,
    programApplicationId: details.programApplicationId
  };

  dispatch(createVnPayLink(paymentData))
      .then(response => {
          Swal.fire({
              title: 'Hoàn tất khởi tạo đơn thanh toán',
              text: 'Nhấn vào nút bên dưới để đến trang thanh toán VNPAY!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Thanh toán ngay',
              cancelButtonText: 'Hủy',
          }).then(result => {
              if (result.isConfirmed) {
                  window.open(response.payload, '_blank');
              }
          });
      })
      .catch(error => {
          console.error('Lỗi thông tin thanh toán:', error);
          Swal.fire('Lỗi tạo đơn thanh toán', 'Thanh toán thất bại', 'Lỗi tạo đơn thanh toán');
      });
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
            {index !== description.split(".")?.length - 1 && <br />}
          </React.Fragment>
        )}
      </React.Fragment>
    ));
  };
  const handleChange1 = (documentId) => (event, isExpanded) => {
    setExpanded(isExpanded ? documentId : false);
  };
  const programImageUrl = details?.program?.img;
  const universityImageUrl =
    details?.program?.university?.img;
  const studentProfileImage = details?.studentProfile?.img;

  const activeStage = details?.applyStage?.find(stage => stage.status === 1);

  const itemsPerPage = 6;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(payments?.length / itemsPerPage);

  const currentPayments = payments?.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  
  const nextPage = () => {
      setPage((prevPage) => (prevPage + 1 < pageCount ? prevPage + 1 : prevPage));
  };
  
  const prevPage = () => {
      setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
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
      <Stepper activeStep={steps?.length - 1} alternativeLabel sx={{ root: { backgroundColor: 'transparent' } }}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={StepIconComponent}
              optional={<Typography variant="caption"></Typography>}>
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
  const getPaymentStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Đang đợi xác nhận";
      case 1:
        return "Thành công";
      case 2:
        return "Thất bại";
      default:
        return "Chưa thanh toán";
    }
  };
  const formatDescription1 = (description) => {
    if (!description) return "";
    const paragraphs = description.split(/\\r\\n|\r\n/);
    return paragraphs.map((para, index) => `<strong>${index + 1}.</strong> ${para}`).join("<br />");
  };
  const handleDChange = (e) => {
    setDocumentData({
      ...documentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentData({
      ...documentData,
      file: file,
    });
  };
  const handleDSubmit = async (e) => {
    e.preventDefault();
    if (documentData.file) {
      const imgRef = ref(imageDb, `Image/StudentDocument/${documentData.file.name}`);
      try {
        await uploadBytes(imgRef, documentData.file);
        const imgUrl = await getDownloadURL(imgRef);
        const updatedDocumentData = {
          ...documentData,
          file: imgUrl,
        };
        dispatch(createDocument(updatedDocumentData));
        Swal.fire('Thành công', 'Tài liệu đã được tải lên thành công', 'success');
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire('Lỗi', 'Không thể tải lên tài liệu', 'error');
      }
    } else {
      Swal.fire('Cảnh báo', 'Vui lòng chọn tệp để tải lên', 'warning');
    }
  };
  

  return (
<div style={{ maxHeight: "100vh",backgroundColor:'#F0F4F9'  }}> 
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={2} style={{ marginTop:'20px', backgroundColor:'#F0F4F9' }}>
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
  THÔNG TIN ỨNG TUYỂN
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={8} md={6}>
    <Card raised>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
        <Avatar
            alt={details?.studentProfile?.fullName}
            src={details?.studentProfile?.img}
            sx={{ width: 100, height: 100, borderRadius: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="h5" style={{color: '#4CAF50'}}gutterBottom>
            {details?.studentProfile?.fullName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {details?.studentProfile?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Ngày sinh:</strong> {details?.studentProfile?.dateOfBirth}
          </Typography>
          <Typography variant="body1">
            <strong>Giới tính:</strong> {details?.studentProfile?.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Điện thoại:</strong> {details?.studentProfile?.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Địa chỉ:</strong> {details?.studentProfile?.address}
          </Typography>
          <Typography variant="body1">
            <strong>CCCD:</strong> {details?.studentProfile?.nationalId}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>

  <Card raised sx={{ mt: 2 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom >
        Quá trình học tập và Chứng chỉ
      </Typography>
      <Typography variant="body1">
        <Typography variant="h6"style={{color:'#6A73FA'}}>Quá trình học tập</Typography> 
        <ul>
          {details?.studentProfile?.studyProcess?.split("|").map((item, index) => {
            const [label, value] = item.split(":");
            return (
              <p key={index}>
                <strong>{label}:</strong> {value}
              </p>
            );
          })}
        </ul>
      </Typography>
      <Typography variant="h6"style={{color:'#6A73FA'}}>
      <strong>Chứng chỉ Tiếng Anh</strong> 
      <ul>
        {studentCertificates.map((certificate, index) => (
  <Chip
  key={index}
  label={certificate?.certificateTypeDto?.certificateName}
  color="primary"
/>        ))}
      </ul>     
       </Typography>
    </CardContent>
  </Card>
{/*     
        <div className="row mt-4">
        <Grid container direction="column" flexWrap="nowrap" spacing={2}>
          <Grid item xs={8}>
            <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Mô tả chương trình
                  </Typography>
                  <Typography variant="body2">{details.program?.description}</Typography>
                </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Lợi ích khi tham gia
                  </Typography>
                  <ul>
                    {details.program?.responsibilities?.split("\\r\\n").map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Yêu cầu 
                  </Typography>
                  <ListGroup variant="flush">
                          {details?.program?.requirement?.split(',').map((item, index) => (
                            <ListGroupItem key={index} className="d-flex align-items-center" style={{ border: 'none', padding: '10px 15px', fontSize: '16px', backgroundColor: 'transparent' }}>
                              <ul className="single-list-wrap">
                                <li className="single-list-inner style-check-box">
                                  {index + 1}. {item}
                                </li>
                              </ul>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                                          </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                   Chi phí (tham khảo)
                  </Typography>
                  <ul>
                    {details.program?.tuition?.split("\\r\\n").map((fee, index) => (
                      <li key={index}>{fee}</li>
                    ))}
                  </ul>
                </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </div> */}
    </Grid>

    <Grid item xs={12} md={6}>
   
      <div className="td-sidebar" >
        <div className="widget widget_feature" style={{backgroundColor:'white'}}>
          <h4 className="widget-title" style={{textAlign:'center'}}> {details.program?.nameProgram}</h4>
          <Grid container spacing={2}>
         
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={details.program?.img}
              sx={{
                width: "100%",
                maxHeight: { xs: "auto", md: "500px" },
                objectFit: "contain",
                borderRadius: "4px",
              }}
              alt="Program Image"
            />
          </Grid>
          </Grid>
         
          <div className="price-wrap text-center">
          <Card raised>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tài liệu yêu cầu
        </Typography>
        {programDocuments?.map((document) => (
          <div key={document.programDocumentId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Accordion
              expanded={expanded === document.programDocumentId}
              onChange={handleChange(document.programDocumentId)}
              style={{ flex: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${document.programDocumentId}-content`}
                id={`${document.programDocumentId}-header`}
              >
                <Typography>{document?.documentTypeDto?.typeName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2">Mô tả:</Typography>
                <Typography
                  dangerouslySetInnerHTML={{ __html: formatDescription1(document.description) }}
                />
              </AccordionDetails>
            </Accordion>
            <IconButton
              color="primary"
              // onClick={() => handleFileUpload(document.programDocumentId)}
            >
              <CloudUploadIcon />
            </IconButton>
          </div>
        ))}
      </CardContent>
    </Card>
    <div>
                          <Typography variant="h6" gutterBottom>Upload Document</Typography>
                          <form onSubmit={handleDSubmit}>
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm="4">Document Type:</Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  as="select"
                                  name="documentTypeId"
                                  value={documentData.documentTypeId}
                                  onChange={handleDChange}
                                >
                                  <option value="">Select Document Type</option>
                                  {documentTypes.map((type) => (
                                    <option key={type.documentTypeId} value={type.documentTypeId}>
                                      {type.typeName}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm="4">Upload File:</Form.Label>
                              <Col sm="8">
                                <Form.Control
                                  type="file"
                                  name="file"
                                  onChange={handleDFileChange}
                                />
                              </Col>
                            </Form.Group>
                            <Button variant="primary" type="submit">Upload</Button>
                          </form>
                        </div>
          </div>
        </div>
      </div>
     
   
    {/* <Card raised>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
        <Avatar
            alt={details?.studentProfile?.fullName}
            src={details?.studentProfile?.img}
            sx={{ width: 100, height: 100, borderRadius: 0 }}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="h5" style={{color: '#4CAF50'}}gutterBottom>
            {details?.studentProfile?.fullName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {details?.studentProfile?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Ngày sinh:</strong> {details?.studentProfile?.dateOfBirth}
          </Typography>
          <Typography variant="body1">
            <strong>Giới tính:</strong> {details?.studentProfile?.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Điện thoại:</strong> {details?.studentProfile?.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Địa chỉ:</strong> {details?.studentProfile?.address}
          </Typography>
          <Typography variant="body1">
            <strong>CCCD:</strong> {details?.studentProfile?.nationalId}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>

  <Card raised sx={{ mt: 2 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom >
        Quá trình học tập và Chứng chỉ
      </Typography>
      <Typography variant="body1">
        <Typography variant="h6"style={{color:'#6A73FA'}}>Quá trình học tập</Typography> 
        <ul>
          {details?.studentProfile?.studyProcess?.split("|").map((item, index) => {
            const [label, value] = item.split(":");
            return (
              <p key={index}>
                <strong>{label}:</strong> {value}
              </p>
            );
          })}
        </ul>
      </Typography>
      <Typography variant="h6"style={{color:'#6A73FA'}}>
      <strong>Chứng chỉ Tiếng Anh</strong> 
      <ul>
        {studentCertificates.map((certificate, index) => (
  <Chip
  key={index}
  label={certificate?.certificateTypeDto?.certificateName}
  color="primary"
/>        ))}
      </ul>     
       </Typography>
    </CardContent>
  </Card> */}
    
    </Grid>
  </Grid>

</TabPanel>
<TabPanel value={tabIndex} index={1}>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} md={6}>
      <Card raised>
        <CardContent>
          <Typography variant="h6" gutterBottom>Chi phí cần đóng</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Giai đoạn</TableCell>
                  <TableCell align="right">Loại phí</TableCell>
                  <TableCell align="right">Đơn vị (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {programStages.filter(stage => stage?.programId === details.program?.programId).map((stage) => {
                  const fee = fees.find(f => f.programFeeId === stage.programFeeId);
                  const feeType = feeTypes.find(ft => ft.feeTypeId === fee?.feeTypeId);
                  const isActive = stage.programStageId === activeStage?.programStageId;
                  return (
                    <TableRow key={stage.programStageId} sx={{ bgcolor: isActive ? '#e0f7fa' : 'inherit' }}>
                      <TableCell component="th" scope="row">{stage.stageName}</TableCell>
                      <TableCell align="right">{feeType ? feeType.typeName : 'Không có'}</TableCell>
                      <TableCell align="right">{fee ? fee.amount.toLocaleString() : 'Không thu phí'}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={2} align="right"><strong>Tổng cộng</strong></TableCell>
                  <TableCell align="right">
                    {fees.filter(f => f?.programId === details.program?.programId)
                        .reduce((sum, current) => sum + current.amount, 0)
                        .toLocaleString()} VND
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card raised>
        <CardContent>
          <Typography variant="h6" gutterBottom> Khoản phí cần đóng cho giai đoạn: <strong style={{ color: '#007bff' }}>{activeStage ? activeStage.programStage.stageName : 'N/A'}</strong>
</Typography>
          {activeStage && activeStage?.programStage?.isPayment ? (
            
              <>
              
   
<Form.Group as={Row} className="mb-3" controlId="formPlaintextFee">
  <Form.Label column sm="4">Lựa chọn khoản phí: </Form.Label>
  <Col sm="6">
    <Form.Control
      as="select"
      value={selectedFee?.programFeeId || ''}
      onChange={e => {
        const feeId = e.target.value;
        const fee = fees.find(f => f.programFeeId.toString() === feeId);
        setSelectedFee(fee);
        if (fee) {
          const feeType = feeTypes.find(ft => ft.feeTypeId === fee.feeTypeId);
          setNote(` (${feeType ? feeType.typeName : 'Unknown'})`);
        } else {
          setNote('');
        }
      }}
    >
      {fees.filter(fee => fee?.programId === details?.program?.programId).map(fee => (
        <option key={fee.programFeeId} value={fee.programFeeId}>
          {fee.amount.toLocaleString()} VND ({getFeeTypeNameById(fee.feeTypeId)})
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

{paymentSuccess && (
  <>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleImageUpload}>Tải ảnh lịch sử giao dịch</button>
  </>
)}



<>

<Typography variant="h6" gutterBottom style={{cursor: 'pointer'}} onClick={toggleFeesDetail}>
Hoặc có thể đóng toàn bộ phí cho tiến trình (cập nhật tự động)</Typography>

                        <>
                            <Typography variant="subtitle1">
                                Phí tổng cộng để hoàn thành hồ sơ:
                            </Typography>
                            <Form.Group as={Row} className="mb-3">
                                <Col sm={12}>
                                    {fees.filter(fee => fee?.programId === details.program?.programId).map((fee, index, arr) => (
                                        <React.Fragment key={fee.programFeeId}>
                                            <span>
                                                {fee.amount.toLocaleString()} VND ({getFeeTypeNameById(fee.feeTypeId)})
                                            </span>
                                            {index < arr.length - 1 ? ' + ' : ''}
                                        </React.Fragment>
                                    ))}
                                </Col>
                                <Col sm={12} className="mt-2">
                                    <strong>-----------------------------------</strong>
                                </Col>
                                <Col sm={12}>
                                    <Typography variant="h6">
                                        {fees.filter(fee => fee?.programId === details.program?.programId)
                                            .reduce((sum, current) => sum + current.amount, 0)
                                            .toLocaleString()} VND (Tổng các loại phí)
                                    </Typography>
                                </Col>
                                <Button  variant="warning" onClick={handleCreateVnPayLink} style={{ marginLeft: '10px', marginTop:'38px' }}>
                                    Thanh toán bằng VNPAY
                                </Button>
                            </Form.Group>
                        </>
                 
</>
            </>
          ) : (
          <>
                      <Typography variant="subtitle1">Không có khoản phí cần đóng </Typography>

       
            
              
          </>
            
          )}
          


   
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</TabPanel>







       
<TabPanel value={tabIndex} index={2}>
  <Typography variant="h6" gutterBottom>
    Lịch sử thanh toán
  </Typography>
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 600 }} style={{ margin: 'auto' }} aria-label="payment history table">
      <TableHead>
        <TableRow>
          <TableCell>Payment ID</TableCell>
          <TableCell align="right">Số tiền</TableCell>
          <TableCell align="right">Phương thức</TableCell>
          <TableCell align="right">Ghi chú</TableCell>
          <TableCell align="right">Ngày thanh toán</TableCell>
          <TableCell align="right">Trạng thái</TableCell>
          <TableCell align="right">Hình ảnh</TableCell> {/* Thêm cột mới này */}
        </TableRow>
      </TableHead>
      <TableBody>
        {currentPayments?.map((payment) => (
          <TableRow  key={payment.paymentId}>
            <TableCell component="th" scope="row">
              {payment.paymentId}
            </TableCell>
            <TableCell align="right">{payment.amount.toLocaleString()}</TableCell>
            <TableCell align="right">{payment.method}</TableCell>
            <TableCell align="right">{payment.note}</TableCell>
            <TableCell align="right">{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
            <TableCell align="right">{getPaymentStatusLabel(payment.status)}</TableCell>
            <TableCell align="right">
  {payment.img ? (
    <Button
      variant="contained"
      color="primary"
      onClick={() => window.open(payment.img, '_blank')}
      style={{ textTransform: 'none' }}
    >
      Xem Ảnh
    </Button>
  ) : 'Không có ảnh'}
</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Box sx={{ display: 'flex', justifyContent: 'space-between ', margin: '20px' }}>
    <Button variant="primary" onClick={prevPage} disabled={page === 0}>Trước</Button>
    <Button variant="primary" onClick={nextPage} disabled={page + 1 === pageCount}>Kế tiếp</Button>
  </Box>
</TabPanel>

      

        </Box>
    

    </Grid>
    </div>
    
    
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



