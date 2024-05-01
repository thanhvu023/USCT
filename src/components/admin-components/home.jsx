import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStage } from "../../redux/slice/applyStageSlice";
import { getAllUsers } from "../../redux/slice/authSlice";
import { getAllConsultants } from "../../redux/slice/consultantSlice";
import { getAllProgramApplication } from "../../redux/slice/programApplicationSlice";
import { getProgramById } from "../../redux/slice/programSlice";
import { getAllProgramStages } from "../../redux/slice/programStageSlice";
import {
  getAllStudentProfile,
  getStudentProfileById,
} from "../../redux/slice/studentSlice";
import { getAllPayments } from "../../redux/slice/paymentSlice";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link và useNavigate từ react-router-dom

import { ProgressCard } from "./card-design";
import IncomeExpense from "./IncomeExpense";
import { getRegistration } from "../../redux/slice/registrationSlice";

const AdminHome = ({ handleAllConsultantClick }) => {
  const numberOfStudentProfile = useSelector(
    (state) => state?.student?.studentProfile.length
  );
  // const payments = useSelector((state) => state.payment.allPayments);

  const numberOfRegistration = useSelector(
    (state) => state?.registration?.registrationForms.length
  );
  const numberOfProgram = useSelector(
    (state) => state?.programApplication?.programApplications.length
  );
  // const totalAmount = payments?.reduce(
  //   (total, payment) => total + payment.amount,
  //   0
  // );
  const payments = useSelector(state => state.payment.allPayments);
  const totalAmount = payments?.reduce((sum, payment) => sum + payment.amount, 0);
  const tabelData = [
    {
      no: "01",
      name: "Jack Ronan",
      proff: "Airi Satou",
      date: "02 jan 2024",
      status: "Inactive",
      color: "danger",
      subject: "Commerce",
      fees: "120",
    },
    {
      no: "02",
      name: "Jimmy Morris",
      proff: "Angelica Ramos",
      date: "02 jan 2024",
      status: "Active",
      color: "primary",
      subject: "Mechanical",
      fees: "205",
    },
    {
      no: "03",
      name: "Nashid Martines",
      proff: "Ashton Cox",
      date: "04 jan 2024",
      status: "Inactive",
      color: "danger",
      subject: "Science",
      fees: "180",
    },
    {
      no: "04",
      name: "Roman Aurora",
      proff: "Cara Stevens",
      date: "05 jan 2024",
      status: "Active",
      color: "primary",
      subject: "Arts",
      fees: "200",
    },
    {
      no: "05",
      name: "Samantha",
      proff: "Bruno Nash",
      date: "06 jan 2024",
      status: "Active",
      color: "primary",
      subject: "Maths",
      fees: "210",
    },
  ];
  const CarddBlog = [
    {
      title: " Tổng hồ sơ học sinh",
      number: numberOfStudentProfile,
      color: "primary",
    },
    {
      title: " Số lượng đơn tư vấn",
      number: numberOfRegistration,
      color: "primary",
    },
    {
      title: "Tổng số hồ sơ du học",
      number: numberOfProgram,
      color: "primary",
    },
    { title: "Lợi Nhuận", number: totalAmount, color: "primary" },
  ];

  const studentTable = [
    {
      id: 1,
      isChecked: false,
      name: "Angelica Ramos",
      coach: "Ashton Cox",
      date: "12 Jan 2024",
      time: "10:15",
    },
    {
      id: 2,
      isChecked: false,
      name: "Bradley Greer",
      coach: "Brenden Wagner",
      date: "11 Jan 2024",
      time: "10:30",
    },
    {
      id: 3,
      isChecked: false,
      name: "Cedric Kelly",
      coach: "Brielle Williamson",
      date: "10 Jan 2024",
      time: "09:45",
    },
    {
      id: 4,
      isChecked: false,
      name: "Caesar Vance",
      coach: "Herrod Chandler",
      date: "08 Jan 2024",
      time: "10:20",
    },
    {
      id: 5,
      isChecked: false,
      name: "Rhona Davidson",
      coach: "Sonya Frost",
      date: "09 Jan 2024",
      time: "09:30",
    },
    {
      id: 6,
      isChecked: false,
      name: "Bradley Greer",
      coach: "Brenden Wagner",
      date: "15 Jan 2024",
      time: "09:50",
    },
  ];
  const dispatch = useDispatch();
  const consultants = useSelector((state) =>
    state.consultant.consultants.slice(0, 5)
  );
  const [studentProfiles, setStudentProfiles] = useState({});
  const [programs, setPrograms] = useState({});

  const customers = useSelector((state) => state.auth.user);
  const { programApplications, loading, error } = useSelector(
    (state) => state.programApplication
  );

  const programStages = useSelector((state) => state.programStages.stages);
  // console.log("programApplications",programApplications)
  useEffect(() => {
    dispatch(getAllConsultants());
    dispatch(getAllStudentProfile());
    dispatch(getAllProgramApplication());
    dispatch(getProgramById());
    dispatch(getAllProgramStages());
    dispatch(getAllStage());
    dispatch(getRegistration());
    dispatch(getAllPayments());
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programIds = programApplications.map(
        (application) => application.programId
      );
      const newPrograms = {};
      for (const programId of programIds) {
        try {
          const response = await dispatch(getProgramById(programId));
          if (response.payload) {
            const { nameProgram, createDate } = response.payload;
            newPrograms[programId] = { nameProgram, createDate };
          }
        } catch (error) {
          console.error(`Error fetching program with ID ${programId}:`, error);
        }
      }
      setPrograms(newPrograms);
    };

    if (programApplications?.length > 0) {
      fetchPrograms();
    }
  }, [programApplications]);

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      for (const application of programApplications) {
        const studentProfileId = application.studentProfileId;
        try {
          const response = await dispatch(
            getStudentProfileById(studentProfileId)
          );
          if (response.payload) {
            const studentProfile = response.payload;
            setStudentProfiles((prevState) => ({
              ...prevState,
              [studentProfileId]: studentProfile,
            }));
          }
        } catch (error) {
          console.error(
            `Error fetching student profile with ID ${studentProfileId}:`,
            error
          );
        }
      }
    };

    fetchStudentProfiles();
  }, [programApplications]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "whitesmoke", paddingBottom: "50px" }}
      >
        <Row>
          {CarddBlog.map((item, index) => (
            <Col key={index} xl={3} lg={4} md={6} sm={6}>
              <div className="widget-stat card mt-4">
                <ProgressCard
                  title={item.title}
                  number={item.number}
                  color={item.color}
                />
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Col xl={8} lg={8} md={12}>
            <div className="card mt-4">
              <div className="card-header" style={{ backgroundColor: "white" }}>
                <h3 className="card-title">Báo cáo hồ sơ tiếp nhận</h3>
              </div>
              <div className="card-body">
                <IncomeExpense />
              </div>
            </div>
          </Col>
          <Col xl={4} lg={4} md={12}>
            <div className="card mt-4">
              <div className="card-header" style={{ backgroundColor: "white" }}>
                <h4 className="card-title">Tư vấn viên</h4>
              </div>
              <div className="card-body dz-scroll" style={{ height: "450px" }}>
                {consultants.map((consultant, index) => (
                  <div
                    className="media mb-3 align-items-center border-bottom pb-3"
                    key={index}
                  >
                    <img
                      className="me-3 rounded-circle"
                      alt=""
                      width="50"
                      height="50"
                      src={consultant.img || "default-image-url.jpg"}
                    />
                    <div className="media-body ml-3">
                      <h5 className="mb-0 text-pale-sky">
                        {consultant.userName}
                      </h5>
                      <small
                        className={`mb-0 text-${
                          consultant.email === "Available"
                            ? "danger"
                            : "primary"
                        }`}
                      >
                        {consultant.email}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer border-0 pt-2 bg-white">
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleAllConsultantClick}
                  >
                    Xem tất cả
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} style={{ marginTop: "48px" }}>
            <div className="card">
              <div className="card-header" style={{ backgroundColor: "white" }}>
                <h4 className="card-title">Danh sách hồ sơ du học</h4>
              </div>
              <div className="card-body pt-2">
                <div className="table-responsive recentOrderTable">
                  <table className="table verticle-middle text-nowrap table-responsive-md">
                    <thead>
                      <tr>
                        <th scope="col">Mã hồ sơ</th>
                        <th scope="col">Họ và tên học sinh</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Chương trình</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {programApplications.slice(0, 5).map((application) => (
                        <tr
                          key={application.studentProfileId}
                          className="table-row-border"
                        >
                          <td>{application.programApplicationId}</td>
                          <Link>
                            <td>
                              {
                                studentProfiles[application.studentProfileId]
                                  ?.fullName
                              }
                            </td>
                          </Link>
                          <td>
                            {
                              studentProfiles[application.studentProfileId]
                                ?.createDate
                            }
                          </td>

                          <td>
                            {programs[application.programId]?.nameProgram}
                          </td>
                         
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