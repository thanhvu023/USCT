import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistration } from '../redux/slice/registrationSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RegistrationStatusChart = () => {
    const dispatch = useDispatch();
    const registrations = useSelector(state => state.registration.registrationForms);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        dispatch(getRegistration());
    }, [dispatch]);

    useEffect(() => {
        if (registrations && registrations.length > 0) {
            const statusCounts = registrations?.reduce((acc, curr) => {
                const statusKey = `status${curr.status}`;
                acc[statusKey] = (acc[statusKey] || 0) + 1;
                return acc;
            }, {});
    
            const data = {
                labels: ['Chưa được tư vấn', 'Đang được tư vấn', 'Đã tư vấn'],
                datasets: [{
                    label: 'Số lượng đơn tư vấn',
                    data: [statusCounts.status0 || 0, statusCounts.status1 || 0, statusCounts.status2 || 0],
                    backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                }]
            };
    
            setChartData(data);
        }
    }, [registrations]);
    

    return (
        <div>
            <h2>Trạng Thái Đơn Tư Vấn</h2>
            <Bar data={chartData} options={{
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom"
                    },
                    title: {
                        display: true,
                        text: 'Phân loại trạng thái đơn tư vấn',
                    }
                }
            }} />
        </div>
    );
}

export default RegistrationStatusChart;
