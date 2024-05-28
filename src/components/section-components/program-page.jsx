import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProgram, getProgramByUniId } from "../../redux/slice/programSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { getAllMajor, getMajorById } from "../../redux/slice/majorSlice";
import { getAllUniversity } from "../../redux/slice/universitySlice";
import { getAllCertificates } from "../../redux/slice/programCertificateSlice";

function ProgramsPage() {
  const [currentValue, setCurrentValue] = useState(100000);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSliderChange = (event) => {
    setCurrentValue(event.target.value);
  };

  const formatCurrency = (value) => {
    return `${value / 1000}k$`;
  };
  const progressLeft = ((currentValue - 100000) / (2000000 - 100000)) * 100;

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const [programName, setProgramName] = useState("");
  const handleInputChangeName = (event) => {
    setProgramName(event.target.value);
  };

  const dispatch = useDispatch();
  const [majors, setMajors] = useState({});
  const universities = useSelector(state => state.university.universities);
  const [selectedUniversityId, setSelectedUniversityId] = useState([]);
  const programs = useSelector((state) => state?.program?.programs);
  const programCertificates = useSelector((state) => state.certificate.certificates);

  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const toggleDescription = (programId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [programId]: !prev[programId]
    }));
  };

  const majorId = useSelector((state) => state?.program?.programById?.majorId);

  const [showMoreUniversities, setShowMoreUniversities] = useState(false);
  const visibleUniversities = universities.slice(0, 10);
  const additionalUniversities = universities.slice(10);
  const toggleUniversitiesDisplay = () => {
    setShowMoreUniversities(prev => !prev);
  };

  const [selectedCertificates, setSelectedCertificates] = useState([]);

  useEffect(() => {
    if (majorId) {
      dispatch(getMajorById(majorId));
    }
  }, [dispatch, majorId]);

  useEffect(() => {
    dispatch(getAllUniversity());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUniversityId.length > 0) {
      dispatch(getProgramByUniId(selectedUniversityId));
    } else {
      dispatch(getAllProgram());
    }
  }, [dispatch, selectedUniversityId]);

  useEffect(() => {
    if (programName) {
      dispatch(getAllProgram()).then(() => {
        // Filtering the programs based on the name
        const filteredPrograms = programs.filter(program =>
          program.nameProgram.toLowerCase().includes(programName.toLowerCase())
        );
        // Update the programs state with the filtered programs
        // This assumes you have a setPrograms function to update the programs state
        // setPrograms(filteredPrograms);
      });
    } else {
      dispatch(getAllProgram());
    }
  }, [dispatch, programName]);

  useEffect(() => {
    dispatch(getAllMajor()).then((response) => {
      const majorMap = {};
      response.payload.forEach(major => {
        majorMap[major.majorId] = major.majorName;
      });
      setMajors(majorMap);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCertificates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProgram());
  }, [dispatch, programName]);

  const loading = useSelector((state) => state?.program?.loading);

  const [programsPerPage] = useState(8);
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(indexOfFirstProgram, indexOfLastProgram);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredPrograms = currentPrograms
    .filter(program => program.status === "Active")
    .filter(program => selectedUniversityId.length === 0 || selectedUniversityId.includes(program.universityId))
    .filter(program => selectedCertificates.length === 0 || selectedCertificates.every(cert =>
      programCertificates.some(c => c.programId === program.programId && c.certificateType.certificateName === cert && c.minLevel > 0)
    ))
    .filter(program => program.nameProgram.toLowerCase().includes(programName.toLowerCase()));


  const handleCheckboxChange = (event, universityId) => {
    setSelectedUniversityId(prevIds => {
      if (prevIds.includes(universityId)) {
        return prevIds.filter(id => id !== universityId);
      } else {
        return [...prevIds, universityId];
      }
    });
  };

  const handleCertificateChange = (event, certificateName) => {
    setSelectedCertificates(prev => {
      if (prev.includes(certificateName)) {
        return prev.filter(cert => cert !== certificateName);
      } else {
        return [...prev, certificateName];
      }
    });
  };

  // Extract unique certificate types
  const uniqueCertificates = Array.from(new Set(programCertificates.map(cert => cert.certificateType.certificateName)));

  return (
    <div className="blog-area pd-top-60 pd-bottom-60">
      <div className="container">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="row">
          <div className="col-lg-8 order-lg-12 m-0">
            <div className="row go-top">
              {filteredPrograms.map((program, index) => {
                const universityName = universities.find(uni => uni.universityId === program.universityId)?.universityName || 'University not found';
                const programSpecificCertificates = programCertificates.filter(
                  (certificate) =>
                    certificate.programId === program.programId &&
                    certificate.minLevel !== 0
                );
                return (
                  <div key={index} className="col-md-6">
                    <div className="single-course-inner">
                      <div className="program-card">
                        <div className="thumb">
                          <img src={program.img} alt="Program Image" style={{ width: "100%", height: "150px", objectFit: 'cover' }} />
                        </div>
                      </div>
                      <div className="details">
                        <div className="details-inner">
                          <div style={{ height: '100px' }}>
                            <h5 className="program-name">
                              <Link to={`/program-details/${program.programId}`}>
                                {program.nameProgram}
                              </Link>
                            </h5>
                            <h6 className="university-name">{universityName || 'University not found'}</h6>
                          </div>
                          <strong>Yêu cầu</strong>
                          <div className="certificate-tags">
              {programSpecificCertificates.length > 0 ? (
                programSpecificCertificates.map((certificate, certIndex) => (
                  <span key={certIndex} className="tag">
                    {certificate.certificateType.certificateName}
                  </span>
                ))
              ) : (
                <span>Không có chứng chỉ liên quan</span>
              )}
            </div>
                          <div className="program-description">
                            <strong>Mô tả chương trình: </strong>
                            <span onClick={() => toggleDescription(program.programId)}>
                              {expandedDescriptions[program.programId] ? program.description : `${program.description.substring(0, 100)}...`}
                            </span>
                          </div>
                        </div>
                        <div className="additional-details">
                          <p><i className="fa fa-laptop" /> <strong>Chuyên ngành chính:</strong> {majors[program.majorId]}</p>
                          <p><i className="fa fa-clipboard" /> <strong>Lộ trình học:</strong> {program.duration}</p>
                          <p><i className="fa fa-language" /> <strong>Trình độ đào tạo:</strong> {program.level}</p>
                          <p><i className="fa fa-calendar" /> <strong>Học kỳ:</strong> 7/15/2024 đến 9/9/2026</p>
                          <p><i className="fa fa-graduation-cap" /> <strong>Loại chương trình:</strong> Du học tự túc</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <nav className="td-page-navigation mb-4" style={{textAlign:'center'}}>
              <ul className="pagination">
                {Array(Math.ceil(programs.length / programsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li key={index} className="page-item">
                      <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
          <div className="col-lg-4 order-lg-1 col-12">
            <div className="td-sidebar mt-5 mt-lg-0">
              <div className="widget widget_search_course">
                <h4 className="widget-title">Tìm kiếm chương trình</h4>
                <div className="search-form single-input-inner">
  <input
    type="text"
    value={programName}
    onChange={handleInputChangeName}
    placeholder="Nhập chương trình cần tìm"
  />
  <button className="btn btn-base w-100 mt-3" type="submit">
    <i className="fa fa-search" /> Tìm kiếm
  </button>
</div>

              </div>
              <div className="widget widget_catagory">
                <h4 className="widget-title">Thông tin du học</h4>
                <ul className="catagory-items go-top">
                <div className="widget widget_checkbox_list">
                    <h4 className="widget-title">Chứng chỉ</h4>
                    {uniqueCertificates.map((certificateName, index) => (
                      <label key={index} className="single-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedCertificates.includes(certificateName)}
                          onChange={(e) => handleCertificateChange(e, certificateName)}
                        />
                        <span className="checkmark" />
                        {certificateName}
                      </label>
                    ))}
                  </div>
                  <div className="widget widget_checkbox_list">
                    <h4 className="widget-title">Trường học</h4>
                    {visibleUniversities.map((university, index) => (
                      <label key={index} className="single-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedUniversityId.includes(university.universityId)}
                          onChange={(e) => handleCheckboxChange(e, university.universityId)}
                        />
                        <span className="checkmark" />
                        {university.universityName}
                      </label>
                    ))}
                    <button className="show-more-btn" onClick={toggleUniversitiesDisplay}>
                      {showMoreUniversities ? "Show Less" : "Show More"}
                    </button>
                    {showMoreUniversities && additionalUniversities.map((university, index) => (
                      <label key={index} className="single-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedUniversityId.includes(university.universityId)}
                          onChange={(e) => handleCheckboxChange(e, university.universityId)}
                        />
                        <span className="checkmark" />
                        {university.universityName}
                      </label>
                    ))}
                  </div>
        
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;
