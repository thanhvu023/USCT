import React from "react";
import Navbar from "./global-components/navbar-v2";
import Footer from "./global-components/footer";
import ChangePassword from "./consultant-components/changePassword";

const ConsultantChangePasswordPage = () => {
  return (
    <div>
      <Navbar />
      <ChangePassword />
      <Footer />
    </div>
  );
};

export default ConsultantChangePasswordPage;
