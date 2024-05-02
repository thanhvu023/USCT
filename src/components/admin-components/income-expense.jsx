import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getAllPayments, getPaymentReport } from '../../redux/slice/paymentSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpense = () => {
  const dispatch = useDispatch();
  const { allPayments, paymentReport } = useSelector(state => state.payment);
  const [startDate, setStartDate] = useState('2024-05-01');
  const [endDate, setEndDate] = useState('2024-05-01');

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getPaymentReport({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  // Calculate payment counts by status
  const totalPayments = paymentReport?.numberOfPayment || 0;
  const successPayments = paymentReport?.successPayment || 0;
  const pendingPayments = paymentReport?.notVerifyPayment || 0;
  const failedPayments = allPayments?.reduce((acc, payment) => payment.status === 2 ? acc + 1 : acc, 0);

  // Prepare chart data
  const data = {
    labels: ['Tổng đơn thanh toán đã tạo', 'Đơn thanh toán thành công', 'Đơn thanh toán chờ xác nhận', 'Đơn thanh toán thất bại'],
    datasets: [{
      label: 'Số lượng',
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      data: [totalPayments, successPayments, pendingPayments, failedPayments],
    }],
  };

  const options = {
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Báo cáo thanh toán tổng quát',
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, ticks: { beginAtZero: true } }
    },
  };

  return (
    <div style={{ height: '476px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default IncomeExpense;
