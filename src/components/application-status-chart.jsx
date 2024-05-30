import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getAllProgramApplication } from '../redux/slice/programApplicationSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicationStatusChart = () => {
  const dispatch = useDispatch();
  const programApplications = useSelector(state => state.programApplication.programApplications);
  const [applicationStats, setApplicationStats] = useState({ processing: 0, supplementary: 0, success: 0, cancelled: 0 });

  useEffect(() => {
    dispatch(getAllProgramApplication());
  }, [dispatch]);

  useEffect(() => {
    const stats = programApplications.reduce((acc, app) => {
      switch (app.status) {
        case 0:
          acc.processing++;
          break;
        case 1:
          acc.supplementary++;
          break;
        case 2:
          acc.success++;
          break;
        case 3:
          acc.cancelled++;
          break;
        default:
          break;
      }
      return acc;
    }, { processing: 0, supplementary: 0, success: 0, cancelled: 0 });

    setApplicationStats(stats);
  }, [programApplications]);

  const data = {
    labels: ['Đang xử lí', 'Bổ sung tài liệu', 'Đăng ký thành công', 'Hủy bỏ đăng ký'],
    datasets: [{
      label: 'Số lượng hồ sơ ứng tuyển',
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
      data: [applicationStats.processing, applicationStats.supplementary, applicationStats.success, applicationStats.cancelled],
    }],
  };

  const options = {
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Báo cáo trạng thái hồ sơ ứng tuyển',
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ApplicationStatusChart;
