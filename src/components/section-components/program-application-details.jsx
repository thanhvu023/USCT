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
  Dialog,
  Button,
  DialogActions, DialogContent, DialogTitle,
  ButtonBase,

} from "@mui/material";
import SendIcon from '@mui/icons-material/Send'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { styled } from "@mui/system";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { Stepper, Step, StepLabel } from '@mui/material';
import { Check as CheckIcon, Clear as ClearIcon, HourglassEmpty as HourglassEmptyIcon, RadioButtonUnchecked as RadioButtonUncheckedIcon } from '@mui/icons-material';
import { Backdrop, CircularProgress } from "@mui/material";
import {  getAllProgramFees } from '../../redux/slice/programFeeSlice';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../FirebaseImage/Config";
import { useNavigate } from "react-router-dom";
import { Modal, ListGroup, Row, Col,  Form, InputGroup, FormControl,
  Badge,ListGroupItem, 
  CardTitle} from 'react-bootstrap';
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
import { createDocument, getDocumentsByProgramApplicationId, updateDocument } from "../../redux/slice/student-document";
import { getAllDocumentTypes } from "../../redux/slice/documentTypesSlice";
import { createNotification, getFile } from "../../redux/slice/authSlice";
import { getSchoolProfilesByStudentProfileId } from "../../redux/slice/schoolProfileSlice";
import jwtDecode from "jwt-decode";
const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider || '#e0e0e0'}`,
  boxShadow: theme.shadows ? theme.shadows[3] : '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  maxWidth: '90%',
  margin: '0 auto',
 
 
}));

const   ProgramApplicationDetails = () => {
  const { programApplicationId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickOpen = (file) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };
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
  const token = useSelector((state) => state.auth.token);

  const customerId = jwtDecode(token).UserId;
  console.log("customerId",customerId)
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
  const documents = useSelector(state => state.studentDocument.documentsByProgramApplicationId); 
  const schoolProfiles = useSelector((state) => state.schoolProfile.schoolProfilesByStudentProfileId);

const getStageNameByProgramStageId = () =>{

  const stageName = programStages?.find(
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
        dispatch(getSchoolProfilesByStudentProfileId(details?.studentProfileId));
      }
    }, [dispatch, details?.studentProfileId]);
  const handleNoteChange = (event) => {
    setNote(event.target.value);
};

useEffect(() => {
  if (programApplicationId) {
    dispatch(getDocumentsByProgramApplicationId(programApplicationId)); // Fetch documents by programApplicationId
  }
}, [dispatch, programApplicationId]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };  
  const handleRowClick = (programApplicationId) => {
    if (programApplicationId) {
      setSelectedProgramApplication(programApplicationId); // Set the selected program application
      setIsModalOpen(true); 
    }
  };
  const getFeeTypeNameById = (feeTypeId) => {
    const feeType = feeTypes?.find(type => type.feeTypeId === feeTypeId);
    return feeType ? feeType.typeName : 'Unknown';
  };


 


  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const [paymentId, setPaymentId] = useState(null); 

console.log("ảnh aaaa",img)
console.log(" paymentId",paymentId)
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
            setShowModal(true); // Hiển thị modal thông tin tài khoản ngân hàng
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
      await dispatch(createNotification({
        programApplicationId: currentPaymentDetails.programApplicationId,
        customerId: customerId,
        paymentId: currentPaymentDetails.paymentId,
       
      }));
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
  const currentDocuments = documents?.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

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
      const currentStage = programStages?.find(ps => ps.programStageId === stage.programStageId);
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
    const paragraphs = description.split(/\\r\\n/);
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
    
    const activeStage = programStages?.find(stage => stage.programStageId === details.applyStage.find(applyStage => applyStage.status === 1)?.programStageId);
    const selectedDocumentType = documentTypes?.find(type => type.documentTypeId.toString() === documentData.documentTypeId.toString());
  
    if (activeStage && selectedDocumentType && activeStage.stageName !== selectedDocumentType.typeName) {
      Swal.fire('Cảnh báo', 'Không thể tải tài liệu này vào giai đoạn hiện tại', 'warning');
      return;
    }
  
    if (documentData.file) {
      const imgRef = ref(imageDb, `Image/StudentDocument/${documentData.file.name}`);
      try {
        await uploadBytes(imgRef, documentData.file);
        const imgUrl = await getDownloadURL(imgRef);
        const updatedDocumentData = {
          ...documentData,
          file: imgUrl,
        };
        const response = await dispatch(createDocument(updatedDocumentData)).unwrap();
        const documentTypeId = response.documentTypeDto?.documentTypeId;
        console.log('Response documentTypeId:', documentTypeId);
        dispatch(createNotification({ programApplicationId, customerId, documentTypeId }));
        dispatch(getDocumentsByProgramApplicationId(programApplicationId));
        Swal.fire('Thành công', 'Tài liệu đã được tải lên thành công', 'success');
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire('Lỗi', 'Không thể tải lên tài liệu', 'error');
      }
    } else {
      Swal.fire('Cảnh báo', 'Vui lòng chọn tệp để tải lên', 'warning');
    }
  };
  
  
  const filteredDocumentTypes = useMemo(() => {
    const activeStage = programStages?.find(stage => stage.programStageId === details.applyStage?.find(applyStage => applyStage.status === 1)?.programStageId);
    if (!activeStage) return [];
    return documentTypes.filter(type => activeStage.stageName === type.typeName);
  }, [programStages, details.applyStage, documentTypes]);
  
  const handleDownloadFile = () => {
    details?.studentProfile.fileUploads.forEach((file) => {
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

  const calculateOverallGPA = () => {
    if (!Array.isArray(schoolProfiles)) {
      return "0.00"; // or any default value you prefer
    }
  
    const year10 = schoolProfiles?.find(profile => profile.schoolGrade === 10)?.gpa || 0;
    const year11 = schoolProfiles?.find(profile => profile.schoolGrade === 11)?.gpa || 0;
    const year12 = schoolProfiles.find(profile => profile.schoolGrade === 12)?.gpa || 0;
    
    const overallGPA = (year10 + year11 + year12) / 3;
    return overallGPA.toFixed(2); 
  };
  
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFile(file);
    }
  };
  
  const openEditModal = (document) => {
    setSelectedDocument(document);
    setIsEditModalOpen(true);
  };
  
  
  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedDocument(null);
    setEditFile(null);
  };
  const handleEditSubmit = async () => {
    if (editFile && selectedDocument) {
      const imgRef = ref(imageDb, `Image/StudentDocument/${editFile.name}`);
      try {
        await uploadBytes(imgRef, editFile);
        const imgUrl = await getDownloadURL(imgRef);
  
        const updatedDocumentData = {
          documentId: selectedDocument.documentId,
          file: imgUrl,
          programApplicationId: selectedDocument.programApplicationId,
          documentTypeId: selectedDocument.documentTypeId,
          status: 0,
        };
  
        await dispatch(updateDocument(updatedDocumentData));
        dispatch(getDocumentsByProgramApplicationId(programApplicationId)); // Add this line to update the document list
  
        Swal.fire('Thành công', 'Tài liệu đã được cập nhật thành công', 'success');
        setIsEditModalOpen(false);
        setEditFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire('Lỗi', 'Không thể tải lên tài liệu', 'error');
      }
    } else {
      Swal.fire('Cảnh báo', 'Vui lòng chọn tệp để cập nhật', 'warning');
    }
  };
  const getStatusDoc = (status) => {
    switch (status) {
      case 0:
        return <Chip label="Đợi kiểm tra" color="default" />;
      case 1:
        return <Chip label="Cần bổ sung" color="warning" />;
      case 2:
        return <Chip label="Tài liệu không hợp lệ" color="error" />;
      case 3:
        return <Chip label="Tài liệu hợp lệ" color="success" />;
      default:
        return <Chip label="Lỗi" color="error" />;
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
  <Tab label="Xem khoản phí" />
  <Tab label="Tài liệu đã nộp" />
  <Tab label="Lịch sử thanh toán" />
</Tabs>

            <TabPanel value={tabIndex} index={0}>
  <Typography variant="h3" component="h2" style={{ fontWeight: "700", textAlign: "center", marginBottom:'24px' }}>
  THÔNG TIN ỨNG TUYỂN
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={8} md={6}>
    <Card raised>
    <h4 className="widget-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '67px', textAlign: 'center', borderBottom: '2px solid #F0F4F9' }}>
  <span>Hồ sơ ứng tuyển</span>
</h4>
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
          <Typography variant="body1">
            <strong>File hồ sơ:</strong> 
            <button
                              onClick={handleDownloadFile}
                              className="btn btn-secondary ml-3"
                            >
                              Tải file
                            </button>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  <Card raised sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Quá trình học tập và Chứng chỉ
                    </Typography>
                    <Typography variant="body1">
                      <Typography variant="h6" style={{ color: '#6A73FA' }}>Quá trình học tập</Typography>
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
                    <Typography variant="h6" style={{ color: '#6A73FA' }}>
                      <strong>Chứng chỉ</strong>
                      <ul style={{ marginTop: '0 auto' }}>
                        {studentCertificates.map((certificate, index) => (
                          <li key={index} style={{margin:"12px"}}>
                            <Chip
                              label={`${certificate?.certificateTypeDto?.certificateName} - ${certificate.certificateValue}`}
                              color="primary"
                            
                            />
                            <Button style={{marginLeft:'10px'}} variant="outlined"  onClick={() => handleClickOpen(certificate.file)}>Xem chứng chỉ</Button>
                          </li>
                        ))}
                      </ul>
                    </Typography>

                    <Typography variant="h6" style={{ color: '#6A73FA' }}>Điểm học bạ</Typography>
                    <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                      <strong>GPA tổng:</strong> {calculateOverallGPA()}
                    </Typography>
                    <Grid container spacing={2}>
  {Array.isArray(schoolProfiles) && schoolProfiles.length > 0 ? (
    schoolProfiles.map((profile, index) => (
      <Grid item xs={12} sm={4} key={index} mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              Lớp {profile.schoolGrade}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => handleClickOpen(profile.img)}
              fullWidth
            >
              Xem ảnh
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="md"
              fullWidth
            >
              <DialogContent>
                <img
                  src={selectedFile}
                  alt={`Lớp ${profile.schoolGrade}`}
                  style={{ width: '100%' }}
                />
              </DialogContent>
            </Dialog>
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Môn học</TableCell>
                    <TableCell>Điểm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profile.profileScoreDtos.map((score) => (
                    <TableRow key={score.profileScoreId}>
                      <TableCell>{score.subjectDto.subjectName}</TableCell>
                      <TableCell>{score.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
              <strong>GPA:</strong> {profile.gpa}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  ) : (
    <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
      Không có hồ sơ nào.
    </Typography>
  )}
</Grid>

                    
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
            <li>
              <i className="fa fa-address-card" />
              <span>Mô tả chương trình</span> {details.program?.description}
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
                  const fee = fees?.find(f => f.programFeeId === stage.programFeeId);
                  const feeType = feeTypes?.find(ft => ft.feeTypeId === fee?.feeTypeId);
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
        const fee = fees?.find(f => f.programFeeId.toString() === feeId);
        setSelectedFee(fee);
        if (fee) {
          const feeType = feeTypes?.find(ft => ft.feeTypeId === fee.feeTypeId);
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
<Button variant="contained" onClick={() => setShowModal(true)}>Xác nhận</Button>

{paymentSuccess && (
  <div style={{marginLeft:'16px', marginTop:'10px'}}>
    <input type="file" onChange={handleFileChange} />
    <Button  variant="contained" onClick={handleImageUpload}>Tải ảnh lịch sử giao dịch</Button>
  </div>
)}
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin tài khoản ngân hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div style={{ textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',  }}>
    <img src="https://website366.com/wp-content/uploads/2024/02/banner_vietqr_code-1.png" alt="QR Code" style={{ marginBottom: '20px', width: '500px', height: '500px' }} />
  <div>
  <Typography variant="h5" gutterBottom>Mở Ứng Dụng Ngân Hàng Quét QRCode</Typography>
    <Typography variant="h4" gutterBottom>VietQR</Typography>
    <div style={{ marginBottom: '20px' }}>
    <Typography variant="body1" fontSize={18}>Số tiền: <strong>{selectedFee ? selectedFee.amount.toLocaleString() : 'N/A'} VND {selectedFee ? `(${getFeeTypeNameById(selectedFee.feeTypeId)})` : ''}</strong></Typography>
      <Typography variant="body1"fontSize={18}>Nội dung CK<strong>: SPVQR TT SON10800</strong></Typography>
      <Typography variant="body1"fontSize={18}>Tên chủ TK: <strong>AUTOMATION GHT</strong></Typography>
      <Typography variant="body1"fontSize={18}>Số TK:<strong> 6310702040627</strong></Typography>
    </div>
    <Typography variant="body2" color="textSecondary">Giải pháp được cung cấp trên nền tảng Sapo</Typography>
  </div>
  </div>
</Modal.Body>

        <Modal.Footer>
          <Button variant="contained" color="error" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handlePaymentSubmit}>Xác nhận</Button>

        </Modal.Footer>
      </Modal>


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
                                <Button  variant="contained" color="success"  endIcon={<FastForwardIcon />} onClick={handleCreateVnPayLink} style={{ marginLeft: '10px', marginTop:'38px' }}>
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







       
<TabPanel value={tabIndex} index={3}>
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
    <Button variant="contained" onClick={prevPage} disabled={page === 0}>Trước</Button>
    <Button variant="contained" onClick={nextPage} disabled={page + 1 === pageCount}>Kế tiếp</Button>
  </Box>
</TabPanel>

<TabPanel value={tabIndex} index={2}> {/* Add new TabPanel */}
<div className="price-wrap text-center">
<Grid container spacing={2}>
      <Grid item xs={12} md={6}>

      <Card raised>
  <CardContent>
    <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
      Danh sách tài liệu đã nộp
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer component={Paper} sx={{ maxWidth: 1400, maxHeight: 400, overflowY: 'auto' }}>
        <Table
          sx={{ minWidth: 600 }}
          aria-label="document table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Loại tài liệu</TableCell>
              <TableCell align="right">Thời gian tải lên</TableCell>
              <TableCell>Trạng thái</TableCell>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDocumentDownload(document)}
                    style={{ textTransform: "none", marginRight: '8px' }}
                  >
                    Tải xuống
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => openEditModal(document)}
                    style={{ textTransform: "none" }}
                  >
                    Chỉnh sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </CardContent>
</Card>


          
</Grid>
<Grid item xs={12} md={6}>

    <div className="price-wrap text-center" >
    <Card raised>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Tài liệu chương trình yêu cầu
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
            <Typography style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{document?.documentTypeDto?.typeName}</Typography>
            <IconButton
              color="primary"
              // onClick={() => handleFileUpload(document.programDocumentId)}
              disabled={activeStage?.stageName !== document.documentTypeDto?.typeName} // Disable upload button if stage does not match document type
            >
              <CloudUploadIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2">Mô tả:</Typography>
            <Typography
              style={{textAlign:'left'}}
              dangerouslySetInnerHTML={{ __html: formatDescription1(document.description) }}
            />
          </AccordionDetails>
        </Accordion>
       
      </div>
    ))}
  </CardContent>
</Card>
              </div>
                        </Grid>
                        </Grid>
          </div>
          <Grid item xs={12} md={6} mt={4}>

          <Card raised>
      <CardContent>
        <Typography variant="h6" gutterBottom>Tải tệp</Typography>
        <form onSubmit={handleDSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Loại tài liệu:</Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                name="documentTypeId"
                value={documentData.documentTypeId}
                onChange={handleDChange}
              >
                <option value="">Chọn loại tài liệu</option>
                {filteredDocumentTypes.map((type) => (
                  <option key={type.documentTypeId} value={type.documentTypeId}>
                    {type.typeName}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Tệp tin:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="file"
                name="file"
                onChange={handleDFileChange}
              />
            </Col>
          </Form.Group>
          <Button variant="contained" type="submit"   endIcon={<CloudUploadIcon />}>Tải lên</Button>
        </form>
      </CardContent>
    </Card>
</Grid>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
    <Button variant="contained" onClick={prevPage} disabled={page === 0}>Trước</Button>
    <Button variant="contained" onClick={nextPage} disabled={page + 1 === pageCount}>Kế tiếp</Button>

  </Box>
  <Dialog open={isEditModalOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
  <DialogTitle>Cập nhật Tài liệu</DialogTitle>
  <DialogContent>
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="4">Tệp tin:</Form.Label>
      <Col sm="8">
        <Form.Control
          type="file"
          name="file"
          onChange={handleEditFileChange}
        />
      </Col>
    </Form.Group>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleEditClose} variant="contained" >
      Hủy
    </Button>
    <Button onClick={handleEditSubmit} variant="contained">
      Cập nhật
    </Button>
  </DialogActions>
</Dialog>
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



