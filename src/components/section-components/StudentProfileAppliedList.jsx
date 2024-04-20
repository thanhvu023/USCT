import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
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
      {skills && skills.map((skill, index) => <li key={index}>{skill}</li>)}
    </ul>
  </div>
);

const AchievementList = ({ achievements }) => (
  <ul>
    {achievements &&
      achievements.map((achievement, index) => (
        <li key={index}>{achievement}</li>
      ))}
  </ul>
);

const StudentProfileApplied = () => {
  // const [name, setName] = useState('');
  // const [customerId, setCustomerId] = useState('');
  // const [dob, setDob] = useState(null);
  // const [countryId, setCountryId] = useState('');
  // const customerId = useSelector((state) => state.auth.userById.customerId);
  // const data = useSelector(
  //   (state) => state?.student?.studentProfileByCustomerId
  // );
  // console.log(data);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (customerId) {
  //     dispatch(getStudentProfileByCustomerId(customerId));
  //   }
  // }, [customerId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="row mb-5 mt-5">
      <Sidebar className="ml-4">
        <Menu className="mt-5">
          <MenuItem component={<Link to={`/students-profile`}></Link>}>
            Hồ sơ học sinh
          </MenuItem>
          <MenuItem component={<Link to={`/students-profile/registrationList`}></Link>}>
            Danh sách đơn tư vấn
          </MenuItem>
          <MenuItem component={<Link to={`/students-profile/appliedList`}></Link>}>
            Danh sách hồ sơ đã duyêt
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
                  <Tab.Container defaultActiveKey="RegistrationList">
                    <Nav as="ul" className="nav nav-tabs">
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link to="#about-me" eventKey="RegistrationList">
                          <span className="d-flex align-items-center">
                            <i
                              className="la la-user me-2"
                              style={{ fontWeight: "bold" }}
                            ></i>
                            <strong style={{ fontSize: "1.2rem" }}>
                              Danh sách hồ sơ đã duyệt
                            </strong>
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane id="about-me" eventKey="RegistrationList">
                        <StudentProfileAppliedList />
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
export default StudentProfileApplied;
