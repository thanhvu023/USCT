import React from "react";
import Select from "react-select";
import { Tab, Nav } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StudenProfileList from "./table/student-profiles";
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
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
    <p className="education-year" style={{ fontSize: '16px', fontWeight: 'bold' }}>{year}</p>
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
  let publicUrl = process.env.PUBLIC_URL + "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="col-xl-8 mx-auto mt-5">
      <div className="card">
        <div className="inner-content">
          <div className="card-body">
            <div className="profile-tab">
              <div className="custom-tab-1">
                <Tab.Container defaultActiveKey="About">
                  <Nav as="ul" className="nav nav-tabs">
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link to="#about-me" eventKey="About">
                        <span className="d-flex align-items-center">
                          <i
                            className="la la-user me-2"
                            style={{ fontWeight: "bold" }}
                          ></i>
                          <strong style={{ fontSize: "1.2rem" }}>
                          Hồ sơ du học
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
                            Chỉnh sửa hồ sơ
                          </strong>
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link to="#about-me" eventKey="List">
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
                  </Nav>
                  <Tab.Content>
                  <Tab.Pane id="about-me" eventKey="About">
  <div className="profile-personal-info mt-3">
    <h4 className="text-primary mb-4">Thông Tin Học Sinh</h4>
    <div className="col-lg-12">
    <div className="card overflow-hidden" id="student-avatar-card">
        <div className="row">
            <div className="col-lg-3">
                <div className="text-center p-3 overlay-box">
                    <div className="profile-photo">
                        <img src={publicUrl + "assets/img/author/pic2.jpg"} alt="img" className="bg-info rounded-circle mb-4" style={{ width: "200px", height: '200px' }} />
                    </div>
                    <h3 className="mt-3 mb-1 text-black">Deangelo Sena</h3>
                    <p className="text-black mb-0">Clerk</p>
                </div>
            </div>
            <div className="col-lg-9 align-self-center">
                <div className="row mb-2 align-items-center">
                    <div className="col-3">
                        <h5 className="f-w-500">
                            Nơi Sinh<span className="pull-right">:</span>
                        </h5>
                    </div>
                    <div className="col-9">
                        <span>Rosemont Avenue Melbourne, Florida</span>
                    </div>
                </div>
                <div className="row mb-2 align-items-center">
                    <div className="col-3">
                        <h5 className="f-w-500">
                            Quốc Gia<span className="pull-right">:</span>
                        </h5>
                    </div>
                    <div className="col-9">
                        <span>Australia</span>
                    </div>
                </div>
                <div className="row mb-2 align-items-center">
                    <div className="col-3">
                        <h5 className="f-w-500">
                            ID Quốc Gia<span className="pull-right">:</span>
                        </h5>
                    </div>
                    <div className="col-9">
                        <span>048321842</span>
                    </div>
                </div>
                <div className="row mb-2 align-items-center">
                    <div className="col-3">
                        <h5 className="f-w-500">
                            Khai sinh<span className="pull-right">:</span>
                        </h5>
                    </div>
                    <div className="col-9">
                        <span>27/05/2001</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  </div>
  <div className="profile-about-me">
    <div className="pt-4 border-bottom-1 pb-3">
      <h4 className="text-primary">Qúa trình học tập</h4>
      <EducationItem
  year="2020 - 2023"
  details="Trường THPT Chuyên Khoa học Tự nhiên (Hà Nội)
    Chuyên Toán
    Tốt nghiệp loại Xuất sắc"
  achievements={[
    "Giải Nhất học sinh giỏi cấp quốc gia môn Toán",
    "Huy chương Bạc Olympic Toán học Quốc tế",
    "Giải Nhất cuộc thi nghiên cứu khoa học cấp tỉnh"
  ]}
/>
<EducationItem
  year="2017 - 2020"
  details="Trường THCS Nguyễn Tất Thành (Hà Nội)
    Học sinh giỏi toàn diện"
  achievements={[
    "Giải Nhất học sinh giỏi cấp thành phố môn Toán",
    "Giải Nhì học sinh giỏi cấp thành phố môn Tiếng Anh"
  ]}
/>

<div className="profile-skills mb-5">
    <h4 className="text-primary mb-2">Trình độ tiếng Anh</h4>
    {options.map((option, index) => (
      <Link
        key={index}
        to="/app-profile"
        className="btn light btn-xs mb-1 me-1 mr-3"
        style={{
          backgroundColor: '#F0F1FE',
          color: '#6A73FA',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#6A73FA';
          e.target.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#F0F1FE';
          e.target.style.color = '#6A73FA';
        }}
      >
        {option.label}
      </Link>
    ))}
  </div>
    </div>
  </div>
</Tab.Pane>

                    <Tab.Pane id="profile-settings" eventKey="Setting">
                      <div className="pt-3">
                        <div className="settings-form">
                          <h4 className="text-primary">Chỉnh sửa thông tin </h4>
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                <label className="form-label">Họ và tên</label>
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
                                <label className="form-label">Ngày sinh</label>
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
                                  <form></form>
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
                      </div>
                    </Tab.Pane>
                    <Tab.Pane id="about-me" eventKey="List">
                 <StudenProfileList/>
             
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
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
