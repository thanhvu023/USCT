import React, { Fragment, useState } from "react";

import AdminHome from "./admin-components/home";
import SideBarAd from "./admin-components/side-bar/SideBar";
import NavHader from "./admin-components/NavHader";
import Footer from "./global-components/footer";
import AllCustomer from "./admin-components/customer-components/all-customer";
import EditCustomer from "./admin-components/customer-components/edit-customer"; // Import trang chỉnh sửa khách hàng
import Staff from "./admin-components/staff-components/staff";
import Test1 from "./admin-components/customer-components/test1";

const AdminPage = () => {
  const [main, setMain] = useState("admin");

  const getContentComponent = (main) => {
    switch (main) {
      case "Tư vấn viên":
        return <Staff />;
      case "Khách hàng":
        return <AllCustomer />;
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

  // Hàm kiểm tra nếu main là "customer-edit" thì hiển thị trang chỉnh sửa, ngược lại hiển thị nội dung chính
  const renderContent = () => {
    if (main === "customer-edit") {
      return <EditCustomer />;
    } else {
      return (
        <div className="content-wrapper" style={{ flex: '10', display: 'flex', flexDirection: 'column' }}> 
          {getContentComponent(main)}
        </div>
      );
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
          {renderContent()}
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default AdminPage;
