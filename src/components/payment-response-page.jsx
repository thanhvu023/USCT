import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import handleVnPayResponse from '../redux/slice/handleVnPayResponse';

const PaymentResponsePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      handleVnPayResponse(location.search)
        .then(response => {
          // Xử lý kết quả tại đây, ví dụ: thông báo thành công hoặc thất bại
          console.log('Payment processing successful:', response);
        })
        .catch(error => {
          // Xử lý lỗi
          console.error('Payment processing failed:', error);
        });
    }
  }, [location.search]);

  return <div>Processing your payment, please wait...</div>;
};

export default PaymentResponsePage;
