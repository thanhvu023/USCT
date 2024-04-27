import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConsultants } from '../../redux/slice/consultantSlice';
import { Col, Dropdown, Row, Nav, Tab } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"; // Import Link và useNavigate từ react-router-dom

import { ProgressCard } from './card-design';
import IncomeExpense from './IncomeExpense';
const tabelData = [
    {no:'01', name : "Jack Ronan",  proff:"Airi Satou", date:"02 jan 2024", status:'Inactive', color:'danger', subject:'Commerce', fees:'120'},
    {no:'02', name : "Jimmy Morris",  proff:"Angelica Ramos", date:"02 jan 2024", status:'Active', color:'primary', subject:'Mechanical', fees:'205'},
    {no:'03', name : "Nashid Martines",  proff:"Ashton Cox", date:"04 jan 2024", status:'Inactive', color:'danger', subject:'Science', fees:'180'},
    {no:'04', name : "Roman Aurora",  proff:"Cara Stevens", date:"05 jan 2024", status:'Active', color:'primary', subject:'Arts', fees:'200'},
    {no:'05', name : "Samantha",  proff:"Bruno Nash", date:"06 jan 2024", status:'Active', color:'primary', subject:'Maths', fees:'210'},
    
];
const CarddBlog = [
    {title:"Khách hàng tư vấn", number:'3180', percent:'80%', color:"primary"},
    {title:" Khách hàng mới", number:'360',  percent:'50%', color:"danger"},
    {title:"Tổng số chương trình", number:'28',  percent:'76%', color:"red"},
    {title:"Lợi Nhuận", number:'21290$',  percent:'35%', color:"success"},
];


const studentTable = [
    {id:1, isChecked:false,name:'Angelica Ramos', coach:'Ashton Cox', date:'12 Jan 2024', time:'10:15'},
    {id:2, isChecked:false,name:'Bradley Greer', coach:'Brenden Wagner', date:'11 Jan 2024', time:'10:30'},
    {id:3, isChecked:false,name:'Cedric Kelly', coach:'Brielle Williamson', date:'10 Jan 2024', time:'09:45'},
    {id:4, isChecked:false,name:'Caesar Vance', coach:'Herrod Chandler', date:'08 Jan 2024', time:'10:20'},
    {id:5, isChecked:false,name:'Rhona Davidson', coach:'Sonya Frost', date:'09 Jan 2024', time:'09:30'},
    {id:6, isChecked:false,name:'Bradley Greer', coach:'Brenden Wagner', date:'15 Jan 2024', time:'09:50'},
];

const salaryTable = [
    { image: "https://i.redd.it/lyhoip7h9qg11.jpg", name:"Angelica Ramos", color:'success', status:'Paid', date:'12 Jan 2024', amount:'100', transId:'42317'},
    { image: "https://i.redd.it/lyhoip7h9qg11.jpg", name:"Cedric Kelly", color:'danger',status:'Unpaid', date:'07 Jan 2024', amount:'200', transId:'13369'},
    { image: "https://i.redd.it/lyhoip7h9qg11.jpg", name:"Bradley Greer",color:'warning', status:'Pending', date:'08 Jan 2024', amount:'150', transId:'25413'},
    { image: "https://i.redd.it/lyhoip7h9qg11.jpg", name:"Rhona Davidson",color:'danger', status:'Unpaid', date:'02 Jan 2024', amount:'250', transId:'74125'},
    { image: "https://i.redd.it/lyhoip7h9qg11.jpg", name:"Caesar Vance", color:'success', status:'Paid', date:'10 Jan 2024', amount:'300', transId:'23654'},
];

const AdminHome = ({handleAllConsultantClick }) => {
    const dispatch = useDispatch();
    const consultants = useSelector(state => state.consultant.consultants.slice(0, 5));
        console.log("consultants",consultants)
    const loading = useSelector(state => state.consultant.loading);

    useEffect(() => {
        dispatch(getAllConsultants());
    }, [dispatch]);
    return (
        <>
            <div className='container-fluid' style={{ backgroundColor: 'whitesmoke',paddingBottom:'50px' }}>
                <Row>
                    {CarddBlog.map((item, index) => (
                        <Col key={index} xl={3} lg={4} md={6} sm={6}>
                            <div className="widget-stat card mt-4">
                                <ProgressCard title={item.title} number={item.number} percent={item.percent} color={item.color} />
                            </div>
                        </Col>
                    ))}
                </Row>

                <Row>
                    <Col xl={8} lg={8} md={12}>
                        <div className="card mt-4">
                            <div className="card-header" style={{ backgroundColor: 'white' }}>
                                <h3 className="card-title">Báo cáo hồ sơ tiếp nhận</h3>
                            </div>
                            <div className="card-body">
                                <IncomeExpense />
                            </div>
                        </div>
                    </Col>
                    <Col xl={4} lg={4} md={12}>
                        <div className="card mt-4">
                            <div className="card-header" style={{ backgroundColor: 'white' }}>
                                <h4 className="card-title">Tư vấn viên</h4>
                            </div>
                            <div className="card-body dz-scroll" style={{ height: "450px" }}>
                                {consultants.map((consultant, index) => (
                                    <div className="media mb-3 align-items-center border-bottom pb-3" key={index}>
                                        <img className="me-3 rounded-circle" alt="" width="50" height="50" src={consultant.img || "default-image-url.jpg"} />
                                        <div className="media-body ml-3">
                                            <h5 className="mb-0 text-pale-sky">{consultant.userName}</h5>
                                            <small className={`mb-0 text-${consultant.email === "Available" ? "danger" : "primary"}`}>{consultant.email}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="card-footer border-0 pt-2 bg-white">
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={handleAllConsultantClick}>Xem tất cả</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12} style={{marginTop:"48px"}}>
                    <div className="card">
    <div className="card-header" style={{ backgroundColor: 'white' }}>
        <h4 className="card-title">Danh sách hồ sơ du học</h4>
    </div>
    <div className="card-body pt-2">
        <div className="table-responsive recentOrderTable">
            <table className="table verticle-middle text-nowrap table-responsive-md">
                <thead>
                    <tr>
                        <th scope="col">ID học sinh</th>
                        <th scope="col">Họ và tên học sinh</th>
                        <th scope="col">Tư vấn viên phụ trách</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Chương trình</th>
                        <th scope="col">Trạng thái</th>
                     
                      
                    </tr>
                </thead>
                <tbody>
                    {tabelData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.no}</td>
                            <td>{item.name}</td>
                            <td>{item.proff}</td>
                            <td>{item.date}</td>
                            <td>{item.subject}</td>
                            <td><span className={`badge badge-rounded badge-${item.color}`}>{item.status}</span></td>
                           
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>

                    </Col>
                </Row>
            </div>
        </>
    );
};

export default AdminHome;


