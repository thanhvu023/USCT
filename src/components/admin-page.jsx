import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import AdminHome from "./admin-components/home";
import SideBarAd from "./admin-components/side-bar/side-bar-admin";
import NavHader from "./admin-components/NavHader";
import AllConsultant from "./admin-components/consultant-components/consutant";
import AllCustomer from "./admin-components/customer-components/all-customer";
import Test1 from "./admin-components/customer-components/test1";
import ProgramApplicationPage from "./admin-components/program-application-components/program-apllicationbyStudentprofileId";
import AllPrograms from "./admin-components/program-components/programs";
import Registration from "./admin-components/registration-components/registration";


const AdminPage = () => {
  const [main, setMain] = useState("admin");

  const handleAllConsultantClick = () => {
    setMain("Tư vấn viên");
  };

  const componentMap = {
    "Tư vấn viên": <AllConsultant setMain={setMain} />,
    "Khách hàng": <AllCustomer />,
    "Chương trình": <AllPrograms />,
    "Hồ sơ đăng ký": <ProgramApplicationPage />,
    "Đơn tư vấn": <Registration />,
    "Test1": <Test1 />,
  };

  const getContentComponent = (main) => {
    const selectedComponent = componentMap[main];
    return selectedComponent || <AdminHome handleAllConsultantClick={handleAllConsultantClick} />;
  };

  const renderContent = () => (
    <div className="content-wrapper" style={{ flex: '10', display: 'flex', flexDirection: 'column' }}> 
      {getContentComponent(main)}
    </div>
  );

  return (
    <div id="main-wrapper" >  
      <div id="content-wrapper" className="d-flex flex-row"> 
        <div className="sidebar-wrapper" style={{ flex: '2' }}> 
          <NavHader/>
          <SideBarAd setMain={setMain} />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;

