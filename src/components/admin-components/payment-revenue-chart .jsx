import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAllPayments, getPaymentReport } from '../../redux/slice/paymentSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentRevenueChart = () => {
  const dispatch = useDispatch();
  const { allPayments, paymentReport } = useSelector(state => state.payment);
  const [startDate, setStartDate] = useState('2024-05-01');
  const [endDate, setEndDate] = useState('2024-05-01');

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getPaymentReport({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  // Calculate total revenue and revenue by status
  const totalRevenue = allPayments?.reduce((acc, payment) => acc + payment.amount, 0);
  const successRevenue = allPayments?.reduce((acc, payment) => payment.status === 1 ? acc + payment.amount : acc, 0);
  const failedRevenue = allPayments?.reduce((acc, payment) => payment.status === 2 ? acc + payment.amount : acc, 0);

  // Prepare chart data
  const data = {
    labels: ['Tổng doanh thu ước tính', 'Doanh thu thanh toán thành công', 'Doanh thu thanh toán thất bại'],
    datasets: [{
      label: 'Doanh thu',
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      data: [totalRevenue, successRevenue, failedRevenue],
    }],
  };

  const options = {
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Tổng quan doanh thu',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const formattedValue = value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            return `${context.label}: ${formattedValue}`;
          }
        }
      }
    },
    layout: {
      padding: {
        left: 50, // Adjust this value to control how much padding to the left
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <div style={{ height: '500px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PaymentRevenueChart;
