import React from "react";
import { Tab, Nav } from "react-bootstrap";
import StudenProfileList from "./table/student-profiles";





const StudentProfilePage = () => {
  // const [name, setName] = useState('');
  // const [customerId, setCustomerId] = useState('');
  // const [dob, setDob] = useState(null);
  // const [countryId, setCountryId] = useState('');


  return (
    <div className="col-xl-8 mx-auto mt-5">
      <div className="card">
        <div className="inner-content">
          <div className="card-body">
            <div className="profile-tab">
              <div className="custom-tab-1">
                <Tab.Container defaultActiveKey="List">
                  <Nav as="ul" className="nav nav-tabs">
                  <Nav.Item as="li" className="nav-item">
                      <Nav.Link to="#about-me" eventKey="List">
                        <span className="d-flex align-items-center">
                          <i
                            className="la la-clipboard me-2"
                            style={{ fontWeight: "bold" }}
                          ></i>
                          <strong style={{ fontSize: "2.4rem" }}>
                          Danh sách hồ sơ du học
                          </strong>
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                    
                 
                  </Nav>
                  <Tab.Content>
                 
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

export default StudentProfilePage;
