import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom

import AdminHome from "./admin-components/home";
import SideBarAd from "./admin-components/side-bar/SideBar";
import NavHader from "./admin-components/NavHader";
import Footer from "./global-components/footer";
import AllCustomer from "./admin-components/customer-components/all-customer";
import EditCustomer from "./admin-components/customer-components/edit-customer";
import Staff from "./admin-components/staff-components/staff";
import Test1 from "./admin-components/customer-components/test1";

const AdminPage = () => {
  const [main, setMain] = useState("admin");
  const navigate = useNavigate(); 

  const componentMap = {
    "Tư vấn viên": <Staff />,
    "Khách hàng": <AllCustomer  /> , 
    "Chương trình": <Staff />,
    "Lợi nhuận": <Staff />,
    "Hồ sơ": <Test1 />,
  };
  
  const getContentComponent = (main) => {

    const selectedComponent = componentMap[main] || <AdminHome />;
    return selectedComponent;
  };
  
  const renderContent = () => {
    return (
      <div className="content-wrapper" style={{ flex: '10', display: 'flex', flexDirection: 'column' }}> 
        {getContentComponent(main)}
      </div>
    );
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
