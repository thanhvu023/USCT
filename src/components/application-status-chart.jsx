import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getAllProgramApplication } from '../redux/slice/programApplicationSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicationStatusChart = () => {
  const dispatch = useDispatch();
  const programApplications = useSelector(state => state.programApplication.programApplications);
  const [applicationStats, setApplicationStats] = useState({ total: 0, completed: 0, processing: 0 });

  useEffect(() => {
    dispatch(getAllProgramApplication());
  }, [dispatch]);

  useEffect(() => {
    const stats = programApplications.reduce((acc, app) => {
      acc.total++;
      // Check if all applyStage entries have status 2 to be considered completed
      const isCompleted = app.applyStage.every(stage => stage.status === 2);
      if (isCompleted) {
        acc.completed++;
      } else {
        acc.processing++;
      }
      return acc;
    }, { total: 0, completed: 0, processing: 0 });

    setApplicationStats(stats);
  }, [programApplications]);

  const data = {
    labels: ['Tổng số hồ sơ ứng tuyển', 'Hồ sơ hoàn thành', 'Hồ sơ đang còn trong tiến trình'],
    datasets: [{
      label: 'Số lượng hồ sơ ứng tuyển',
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      data: [applicationStats.total, applicationStats.completed, applicationStats.processing],
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
