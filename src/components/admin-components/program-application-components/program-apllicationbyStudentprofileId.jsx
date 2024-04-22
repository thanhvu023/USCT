import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProgramApplication } from '../../../redux/slice/programApplicationSlice';
import { getStudentProfileById } from '../../../redux/slice/studentSice';
import { getProgramById } from '../../../redux/slice/programSlice';
import { Modal, Button, Row, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Swal from "sweetalert2"

const theadData = [
  { heading: "PAId", sortingVale: "id" },
  { heading: "Hồ sơ sinh viên", sortingVale: "name" },
  // { heading: "Tư vấn viên phụ trách", sortingVale: "advisor" },
  { heading: "Ngày tạo", sortingVale: "date" },
  { heading: "Chương trình ứng tuyển", sortingVale: "program" },
  { heading: "Trạng thái hồ sơ", sortingVale: "status" },
  { heading: "Thao tác", sortingVale: "action" },
];
const style = {
  button: {
    border: 'none',
    cursor: 'pointer',
  },
  modalDialog: {
    maxWidth: '500px',
  },
  modalHeader: {
    borderBottom: 'none',
  },
  modalFooter: {
    borderTop: 'none',
  },
  modalFooterButton: {
    marginRight: '10px',
  }
};
const ProgramApplicationPage = () => {
  const dispatch = useDispatch();
  const [sort, setSortata] = useState(10);
  const { programApplications, loading, error } = useSelector((state) => state.programApplication);
  const [selectedProfileId, setSelectedProfileId] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [programs, setPrograms] = useState({});
  const [studentProfiles, setStudentProfiles] = useState({});
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCheckSuccess, setShowCheckSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [selectedStudentProfileId, setSelectedStudentProfileId] = useState(null);
  const customers = useSelector((state)=>state.auth.userById);

  const getCustomerName  = (customerId) => {
    if (!customers || !Array.isArray(customers)) {
      return "Không tìm thấy";
    }
  
    const customer = customers.find((customer) => customer.customerId === customerId);
    
    return customer ? customer.fullName : "Không tìm thấy ảnh";
  };
  // sort and search data 
  const [sortedApplications, setSortedApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const sortData = (sortBy) => {
    const sortedData = [...programApplications];
    sortedData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    setSortedApplications(sortedData);
  };

  const searchData = (searchTerm) => {
    const filteredData = programApplications.filter((application) =>
      Object.values(application).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSortedApplications(filteredData);
  };
  

  const handleSort = (sortingVale) => {
    sortData(sortingVale);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllProgramApplication());
    dispatch(getProgramById());
  }, [dispatch]);

  useEffect(() => {
    setSortedApplications(programApplications);
  }, [programApplications]);

  useEffect(() => {
    searchData(searchTerm);
  }, [searchTerm]);



  

  
//  console.log("đơn đã duyệt là:",programApplications)
  const handleStudentProfile = (student) => {
    setSelectedStudentProfileId(student);
    setShowCheckModal(true);
    console.log("hồ sơ đã duyệt là:",student)
  };


  const handleCloseCheckModal = () => setShowCheckModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowCheckModal = () => {
    Swal.fire({
      icon: "success",
      title: "Duyệt thành công!",
      showConfirmButton: false,
      timer: 3000,
    });
    setShowCheckSuccess(true);
  };

  const handleShowDeleteModal = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd6b55",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleOpenModal = async (studentProfileId) => {
    setSelectedProfileId(studentProfileId);
    setShowCheckModal(true);

    try {
      const response = await dispatch(getStudentProfileById(studentProfileId));
      if (response.payload) {
        setStudentProfile(response.payload);
      }
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  };



  const handleCloseModal = () => {
    setSelectedProfileId(null);
  };
  const renderApprovedApplications = () => {
    // Filter the applications based on approval status
    const approvedApplications = sortedApplications.filter(application => application.approved);

    return (
      <table id="approvedApplicationsTable" className="display dataTable no-footer w-100">
        <thead>
          <tr>
            <th>Approved ProgramApplicationId</th>
            <th>Approved Hồ sơ sinh viên</th>
            <th>Approved Ngày tạo</th>
            <th>Approved Chương trình ứng tuyển</th>
            <th>Approved Trạng thái hồ sơ</th>
          </tr>
        </thead>
        <tbody>
          {approvedApplications.map((application) => (
            <tr key={application.programApplicationId}>
              <td>{application.programApplicationId}</td>
              <td>{studentProfiles[application.studentProfileId]?.fullName}</td>
              <td>{studentProfiles[application.studentProfileId]?.createDate}</td>
              <td>{programs[application.programId]?.nameProgram}</td>
              <td>{application.applyStage?.programStage?.stageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    dispatch(getAllProgramApplication());
    dispatch(getProgramById());
  }, [dispatch]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programIds = programApplications.map(application => application.programId);
      for (const programId of programIds) {
        try {
          const response = await dispatch(getProgramById(programId));
          if (response.payload) {
            const { nameProgram, createDate } = response.payload;
            setPrograms(prevState => ({
              ...prevState,
              [programId]: { nameProgram, createDate }
            }));
          }
        } catch (error) {
          console.error(`Error fetching program with ID ${programId}:`, error);
        }
      }
    };

    if (programApplications.length > 0) {
      fetchPrograms();
    }
  }, [dispatch, programApplications]);

  useEffect(() => {
    const fetchStudentProfiles = async () => {
      for (const application of programApplications) {
        const studentProfileId = application.studentProfileId;
        try {
          const response = await dispatch(getStudentProfileById(studentProfileId));
          if (response.payload) {
            const studentProfile = response.payload;
            setStudentProfiles(prevState => ({
              ...prevState,
              [studentProfileId]: studentProfile
            }));
          }
        } catch (error) {
          console.error(`Error fetching student profile with ID ${studentProfileId}:`, error);
        }
      }
    };

    fetchStudentProfiles();
  }, [dispatch, programApplications]);


  const handleDownloadFile = (fileAttach) => {
    const link = document.createElement('a');
    link.href = fileAttach;
    link.download = 'fileAttach'; 
    link.click();
  };
  
  return (
    <div>
  
      {loading || !programApplications ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
       <Row>
  <div className="col-lg-12">
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title">Danh sách hồ sơ</h4>
        <Link to="/add-staff" className="btn btn-primary">
          + Thêm mới
        </Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div id="holidayList" className="dataTables_wrapper no-footer">
            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="dataTables_length">
                <label className="d-flex align-items-center">
                  hiển thị
                  <Dropdown className="search-drop">
                    <Dropdown.Toggle as="div" className="search-drop-btn">
                      {sort}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSortata("10")}>
                        10
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSortata("20")}>
                        20
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSortata("30")}>
                        30
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  hàng
                </label>
              </div>
              <div className="dataTables_filter">
                <label>
                  Tìm kiếm :{" "}
                  <input
                    type="search"
                    className=""
                    placeholder=""
                    // onChange={DataSearch}
                  />
                </label>
              </div>
            </div>
            <table id="example4" className="display dataTable no-footer w-100">
              <thead>
                {theadData.map((item, index) => (
                  <th key={index}>{item.heading}</th>
                ))}
              </thead>
              <tbody>
                {sortedApplications.map((application) => (
                  <tr key={application.studentProfileId}>
                    <td>{application.programApplicationId}</td>
                    <Link
                      onClick={() => handleOpenModal(application.studentProfileId)}
                    >
                      <td>{studentProfiles[application.studentProfileId]?.fullName}</td>
                    </Link>
                    <td>{studentProfiles[application.studentProfileId]?.createDate}</td>
                    <td>{programs[application.programId]?.nameProgram}</td>
                    <td>{application.applyStage?.programStage?.stageName}</td>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <button
                        onClick={handleShowCheckModal}
                        className="btn btn-xs sharp btn-primary me-1"
                        style={{
                          ...style.button,
                          width: "30px",
                          height: "30px",
                          padding: "0 20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "5px",
                        }}
                      >
                        <i className="fa fa-check" />
                      </button>
                      <button
                        onClick={handleShowDeleteModal}
                        className="btn btn-xs sharp btn-danger"
                        style={{
                          ...style.button,
                          width: "30px",
                          height: "30px",
                          padding: "0 20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <i className="fa fa-trash" />
                      </button>
                      <Modal show={selectedProfileId} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize:'32px'}}>Hồ sơ học sinh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
  {studentProfile && (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <div>
        <p style={{ fontWeight: "bold", fontSize:'24px' }}>Thông tin học sinh:</p>
        <p><span style={{ fontWeight: "bold" }}>Họ và tên học sinh:</span> {studentProfile.fullName}</p>
        <p><span style={{ fontWeight: "bold" }}>Email:</span> {studentProfile.email}</p>
        <p><span style={{ fontWeight: "bold" }}>Ngày sinh:</span> {studentProfile.dateOfBirth}</p>
        <p><span style={{ fontWeight: "bold" }}>Giới tính:</span> {studentProfile.gender}</p>
        <p className='d-flex'>
  <span style={{ fontWeight: "bold" }}>Bộ hồ sơ</span>
  {studentProfile && studentProfile.fileUploads && studentProfile.fileUploads.length > 0 ? (
    studentProfile.fileUploads.map((file, index) => (
      <div key={index} className='m-2'>
        
        <Button className="me-2" variant="secondary btn-rounded"
         onClick={() => handleDownloadFile(file.fileAttach)}
        >
                  <span className="btn-icon-start text-warning mr-2">
                    <i className="fa fa-download" />
                  </span>
                  PDF {index + 1}
                </Button>
      </div>
    ))
  ) : (
    <span className="ml-2">Chưa bổ sung file PDF</span>
  )}
</p>

      </div>
      <div>
        <p style={{ fontWeight: "bold" , fontSize:'24px'}}>Thông tin liên hệ:</p>
        <p><span style={{ fontWeight: "bold" }}>Họ và tên khách hàng:</span>{getCustomerName(studentProfile.customerId)}</p>
        <p><span style={{ fontWeight: "bold" }}>Điện thoại:</span> {studentProfile.phone}</p>
        <p><span style={{ fontWeight: "bold" }}>Địa chỉ:</span> {studentProfile.address}</p>
        <p><span style={{ fontWeight: "bold" }}>Ngày tạo:</span> {studentProfile.createDate}</p>
        <p><span style={{ fontWeight: "bold" }}>Nơi sinh:</span> {studentProfile.placeOfBirth}</p>
        <p><span style={{ fontWeight: "bold" }}>Số CMND:</span> {studentProfile.nationalId}</p>
      </div>
    </div>
  )}
</Modal.Body>

            <Modal.Footer>
       
            </Modal.Footer>
          </Modal>
        

   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</Row>
<Row>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Danh sách hồ sơ đã duyệt</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {renderApprovedApplications()}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProgramApplicationPage;
