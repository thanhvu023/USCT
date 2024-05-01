import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import handleVnPayResponse from '../redux/slice/handleVnPayResponse';
import { CircularProgress, Typography, Button, Box, Card, CardContent } from '@mui/material';
import Lottie from 'react-lottie';
import successAnimation from '../components/admin-components/customer-components/contants/animations/paymentsuccess.json';  // Đảm bảo rằng bạn đã import file json animation

const PaymentResponsePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({}); // Trạng thái mới để lưu thông tin thanh toán

  useEffect(() => {
    if (location.search) {
      handleVnPayResponse(location.search)
        .then(response => {
          console.log('Payment processing successful:', response);
          setPaymentInfo(response);
          setLoading(false);
          setSuccess(true);
        })
        .catch(error => {
          console.error('Payment processing failed:', error);
          setLoading(false);
          setError(error.message);
        });
    }
  }, [location.search]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" marginTop={2}>
        Đang xử lý khoản thanh toán của bạn, vui lòng đợi...        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, m: "auto", mt: 5 }}>
      <CardContent>
        {success && (
          <>
            <Lottie options={defaultOptions} height={200} width={200} />
            <Typography variant="h5" gutterBottom component="div" color="primary" textAlign="center">
              Thanh toán được xử lý thành công!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Số tiền: {paymentInfo.amount} VND
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phương thức: {paymentInfo.method}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ghi chú: {paymentInfo.note || 'Không có ghi chú'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ngày thanh toán: {paymentInfo.paymentDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Mã giao dịch: {paymentInfo.transactionNo}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Trạng thái: {paymentInfo.status === 1 ? 'Thành công' : 'Không thành công'}
            </Typography>
          </>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate(`/`)}>
          Trở về trang chi tiết chương trình đã ứng tuyển !
        </Button>
      </CardContent>
    </Card>
  );
  
};

export default PaymentResponsePage;
