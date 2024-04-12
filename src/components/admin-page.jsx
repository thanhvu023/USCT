import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import AdminHome from "./admin-components/home";
import SideBarAd from "./admin-components/side-bar/SideBar";
import NavHader from "./admin-components/NavHader";
import Footer from "./global-components/footer";
import AllCustomer from "./admin-components/customer-components/all-customer";
import Test1 from "./admin-components/customer-components/test1";
import AllConsultant from "./admin-components/consultant-components/consutant";
import AllProgramsPage from "./admin-components/program-components/programs1";
import AllPrograms from "./admin-components/program-components/programs";


const AdminPage = () => {
  const [main, setMain] = useState("admin");
  console.log("main là :", main);
  const handleAllConsultantClick = () => {
    setMain("Tư vấn viên");
  };
  const componentMap = {
    "Tư vấn viên": <AllConsultant setMain={setMain}/>,
    "Khách hàng": <AllCustomer  /> , 
    "Chương trình": <AllPrograms />,
    "Lợi nhuận": <Test1 />,
    "Hồ sơ": <Test1 />,
    
  };
  
  const getContentComponent = (main) => {

    const selectedComponent = componentMap[main] || <AdminHome handleAllConsultantClick={handleAllConsultantClick} />;
    return selectedComponent;
  };
  
  const renderContent = () => {
        return (
        <div className="content-wrapper" style={{ flex: '10', display: 'flex', flexDirection: 'column' }}> 
        {getContentComponent(main)}
      </div>
        )
    
    
  };
  
  return (
    <>
      <div id="main-wrapper">  
        <div id="content-wrapper" className="d-flex flex-row"> 
          <div className="sidebar-wrapper" style={{ flex: '2' }}> 
            <Fragment>
              <NavHader/>
              <SideBarAd setMain={setMain} />
            </Fragment>
          </div>
          {renderContent()}
        </div>
        <Footer/>
      </div>
    </>
  );
}
export default AdminPage;
