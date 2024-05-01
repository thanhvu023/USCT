import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import handleVnPayResponse from '../redux/slice/handleVnPayResponse';
import { CircularProgress, Typography, Button, Box } from '@mui/material';


const PaymentResponsePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (location.search) {
      handleVnPayResponse(location.search)
        .then(response => {
          console.log('Payment processing successful:', response);
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

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
        <Typography variant="h6" marginTop={2}>
          Processing your payment, please wait...
        </Typography>
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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h6" color="primary">
        Payment processed successfully!
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.location.href = '/'}>
        Return Home
      </Button>
    </Box>
  );
};

export default PaymentResponsePage;
