import React, { Fragment, useState, useContext } from "react";


import AdminHome from "./admin-components/home";

import '../components/admin-components/index.css'
import '../components/admin-components/chart.css'
import '../components/admin-components/step.css'
import SideBarAd from "./admin-components/side-bar/SideBar";
import Test1 from "./admin-components/student-components/test1";
import Staff from "./admin-components/staff-components/staff";
import NavHader from "./admin-components/NavHader";
import Footer from "./global-components/footer";


const AdminPage = () => {
  const [main, setMain] = useState("admin");
  const getContentComponent = (main) => {
    switch (main) {
      case "Tư vấn viên":
        return <Staff />;
      case "Khách hàng":
        return <Staff />;
      case "Chương trình":
        return <Staff />;
      case "Lợi nhuận":
        return <Staff />;
      case "Hồ sơ":
        return <Test1 />;
      default:
        return <AdminHome />;
    }
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
    <div className="content-wrapper" style={{ flex: '10', display: 'flex', flexDirection: 'column' }}> 
      {main && main === "admin" ? <AdminHome/> : getContentComponent(main)}
    </div>
  </div>
  <Footer/>
</div>



    </>
  
  )

}

export default AdminPage

