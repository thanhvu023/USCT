import React, { useEffect, useState } from 'react';
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
  const { allPayments } = useSelector(state => state.payment);
  const [startDate, setStartDate] = useState('2024-05-01');
  const [endDate, setEndDate] = useState('2024-05-01');

  useEffect(() => {
    dispatch(getAllPayments());
    dispatch(getPaymentReport({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  // Calculate payment counts by status
  const paymentCounts = allPayments.reduce((acc, payment) => {
    switch (payment.status) {
      case 0:
        acc.pending++;
        break;
      case 1:
        acc.success++;
        break;
      case 2:
        acc.failed++;
        break;
      case 3:
        acc.cancelled++;
        break;
      default:
        break;
    }
    acc.total++;
    return acc;
  }, { total: 0, pending: 0, success: 0, failed: 0, cancelled: 0 });

  // Prepare chart data
  const data = {
    labels: ['Tổng đơn thanh toán', 'Chờ xác nhận thanh toán', 'Thành công', 'Thất bại', 'Hủy bỏ'],
    datasets: [{
      label: 'Số lượng đơn thanh toán',
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1,
      data: [paymentCounts.total, paymentCounts.pending, paymentCounts.success, paymentCounts.failed, paymentCounts.cancelled],
    }],
  };

  const options = {
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Đơn Thanh Toán Theo Trạng Thái',
      },
    },
    scales: {
      x: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Trạng thái thanh toán'
        }
      },
      y: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng'
        }
      }
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default IncomeExpense;
