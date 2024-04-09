import React, { useEffect } from "react";
import Select from "react-select";
import { Tab, Nav } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StudenProfileList from "./table/student-profiles";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getStudentProfileByCustomerId } from "../../redux/slice/studentSice";
import RegistrationList from "./table/registration-list";
import StudentProfileAppliedList from "./table/student-profiles-applied";
const options = [
  { value: "basic_english", label: "Tiếng Anh cơ bản" },
  { value: "ielts", label: "IELTS" },
  { value: "toefl", label: "TOEFL" },
  { value: "toeic", label: "TOEIC" },
  { value: "esol", label: "ESOL" },
];

// Options for country select

const EducationItem = ({ year, details, achievements }) => (
  <div className="education-item">
    <p
      className="education-year"
      style={{ fontSize: "16px", fontWeight: "bold" }}
    >
      {year}
    </p>
    <div className="education-details">
      <p>{details}</p>
      {achievements && <AchievementList achievements={achievements} />}
    </div>
  </div>
);
const SkillsList = ({ skills }) => (
  <div className="skills-list">
    <h5 className="text-primary">Kỹ năng:</h5>
    <ul>
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);
const AchievementList = ({ achievements }) => (
  <ul>
    {achievements.map((achievement, index) => (
      <li key={index}>{achievement}</li>
    ))}
  </ul>
);

const StudentProfilePage = () => {
  // const [name, setName] = useState('');
  // const [customerId, setCustomerId] = useState('');
  // const [dob, setDob] = useState(null);
  // const [countryId, setCountryId] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="row mb-5 mt-5">
      <Sidebar className="ml-4">
        <Menu className="mt-5">
          <MenuItem component={<Link to={`/customer`}></Link>}>
            Hồ sơ của tôi
          </MenuItem>
          <MenuItem component={<Link to={`/create-student-profile`}></Link>}>
            Khởi tạo hồ sơ học sinh
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className="col-xl-8">
        <div className="card">
          <div className="inner-content">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <Tab.Container defaultActiveKey="StudentList">
                    <Nav as="ul" className="nav nav-tabs">
                    <Nav.Item as="li" className="nav-item">
                        <Nav.Link to="#about-mefdasf" eventKey="StudentList">
                          <span className="d-flex align-items-center">
                            <i
                              className="la la-clipboard me-2"
                              style={{ fontWeight: "bold" }}
                            ></i>
                            <strong style={{ fontSize: "1.2rem" }}>
                              Danh sách hồ sơ du học
                            </strong>
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link to="#about-me" eventKey="RegistrationList">
                          <span className="d-flex align-items-center">
                            <i
                              className="la la-user me-2"
                              style={{ fontWeight: "bold" }}
                            ></i>
                            <strong style={{ fontSize: "1.2rem" }}>
                         Danh sách đơn tư vấn
                            </strong>
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link to="#profile-settings" eventKey="Setting">
                          <span className="d-flex align-items-center">
                            <i
                              className="la la-edit me-2 mr-2"
                              style={{ fontWeight: "bold" }}
                            ></i>
                            <strong style={{ fontSize: "1.2rem" }}>
                            Hồ sơ đã duyệt
                            </strong>
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                     
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane id="profile-settings" eventKey="Setting">
                        {/* <div className="pt-3">
                          <div className="settings-form">
                            <h4 className="text-primary">
                              Chỉnh sửa thông tin
                            </h4>
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">
                                    Họ và tên
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="form-control"
                                    value={"NAME"}
                                    disabled
                                  />
                                </div>

                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">
                                    ID Quốc gia
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="ID Quốc gia "
                                    className="form-control"
                                    value={"34214214242424224"}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">
                                    Ngày sinh
                                  </label>
                                  <input type="date" className="form-control" />
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">Nơi sinh</label>
                                  <input
                                    type="text"
                                    placeholder="Nơi sinh"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">
                                  Qúa trình học tập
                                </label>
                                <div className="card h-auto">
                                  <div className="card-body">
                                    <label className="form-label">
                                      Mô tả ở đây
                                    </label>
                                    <div className="custom-ekeditor cms-radius add-content-ckeditor ">
                                      <CKEditor
                                        editor={ClassicEditor}
                                        // onReady={ editor => {

                                        // } }
                                        // onChange={ ( event, editor ) => {
                                        //     // const data = editor.getData();
                                        // } }
                                        // onBlur={ ( event, editor ) => {

                                        // } }
                                        // onFocus={ ( event, editor ) => {

                                        // } }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group mb-3 ">
                                <label className="form-label">
                                  Chứng chỉ tiếng Anh
                                </label>
                                <Select
                                  options={options}
                                  className="basic-multi-select"
                                  isMulti
                                  classNamePrefix="select"
                                />
                              </div>
                              <button className="btn btn-primary" type="submit">
                                Cập nhật
                              </button>
                            </form>
                          </div>
                        </div> */}
                        <StudentProfileAppliedList/>
                      </Tab.Pane>
                      <Tab.Pane id="about-mefdsaf" eventKey="StudentList">
                        <StudenProfileList />
                      </Tab.Pane>
                      <Tab.Pane id="about-me" eventKey="RegistrationList">
  <RegistrationList />
</Tab.Pane>
                      
                    </Tab.Content>
                    
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
EducationItem.propTypes = {
  year: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  achievements: PropTypes.arrayOf(PropTypes.string),
};
SkillsList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};
AchievementList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default StudentProfilePage;
