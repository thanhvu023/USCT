import React, { useState } from "react";
import NavHader from "./admin-components/NavHader";
import Test1 from "./admin-components/customer-components/test1";
import AdminHome from "./admin-components/home";
import ProgramApplicationPage from "./admin-components/program-application-components/program-apllicationbyStudentprofileId";
import AllPrograms from "./admin-components/program-components/programs";
import Registration from "./admin-components/registration-components/registration";
import SideBarStaff from "./admin-components/side-bar/side-bar-staff";
import PaymentForm from "./admin-components/program-application-components/payment";
import { PaymentProvider } from "./admin-components/program-application-components/context/payment-context";
import AllUniversitiesStaffPage from "./admin-components/uni-components/all-university-staff";
const StaffPage = () => {
  const [main, setMain] = useState("admin");
  const [selectedApp, setSelectedApp] = useState(null);

  const handleSetSelectedApp = (app) => {
    setSelectedApp(app);
    setMain("Thanh toán");
  };

  const handleAllConsultantClick = () => {
    setMain("Tư vấn viên");
  };

  const getContentComponent = () => {
    switch (main) {
      case "Tư vấn viên":
        return <Test1 />;
      case "Trường đại học":
        return <AllUniversitiesStaffPage />;
        case "Chương trình":
          return <AllPrograms />;
      case "Hồ sơ đăng ký":
        return <ProgramApplicationPage setMain={setMain} setSelectedApp={handleSetSelectedApp} />;
      case "Thanh toán":
        return <PaymentForm selectedApp={selectedApp} />;
      case "Đơn tư vấn":
        return <Registration />;
      default:
        return <ProgramApplicationPage setMain={setMain} setSelectedApp={handleSetSelectedApp} />;
    }
  };

  return (
    <PaymentProvider value={{ selectedApp, setSelectedApp }}>
      <div id="main-wrapper">
        <NavHader />
        <div id="content-wrapper" className="d-flex flex-row">
          <SideBarStaff setMain={setMain} />
          <div className={`content-area ${main === "Thanh toán" ? 'w-100' : ''}`} style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {getContentComponent()}
          </div>
        </div>
      </div>
    </PaymentProvider>
  );
};

export default StaffPage;

