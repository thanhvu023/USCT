import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentProfileByCustomerId } from "../../../redux/slice/studentSice";
import { Dropdown } from "react-bootstrap";
import { getProgramById } from '../../../redux/slice/programSlice';
import { getProgramApplicationsByStudentProfileId } from "../../../redux/slice/programApplicationSlice";
import { Link } from "react-router-dom";
import { IMAGES } from "./contants/theme-student";
import { Row, Button, Modal, Alert } from "react-bootstrap";
import Swal from "sweetalert2"
import { getConsultants } from "../../../redux/slice/authSlice";
const theadData = [
  { heading: "StudentProfileId", sortingVale: "id" },
  { heading: "Họ và tên", sortingVale: "name" },
  // { heading: "Tư vấn viên phụ trách", sortingVale: "advisor" },
  { heading: "Ngày tạo", sortingVale: "date" },
  { heading: "Chương trình ứng tuyển", sortingVale: "program" },
  { heading: "Trạng thái hồ sơ", sortingVale: "status" },
  { heading: "Thao tác", sortingVale: "action" },
];

const Test1 = () => {

  
    const dispatch = useDispatch();
    const consultants = useSelector((state) => state.auth.consultants);
    console.log("consultants:",consultants)
    const loading = useSelector((state) => state.auth.loading);
  
    useEffect(() => {
      dispatch(getConsultants());
    }, [dispatch]);
  
    return (
      <div className="container">
        <h2 className="mt-4 mb-4">Danh Sách Consultants</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {consultants.map((consultant) => (
              <div key={consultant.consultantId} className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{consultant.email}</h5>
                    <p className="card-text">
                      <strong>Introduction:</strong> {consultant.introduction}
                    </p>
                    <p className="card-text">
                      <strong>Education:</strong> {consultant.education}
                    </p>
                    <p className="card-text">
                      <strong>Specialize:</strong> {consultant.specialize}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  

  

export default Test1;
