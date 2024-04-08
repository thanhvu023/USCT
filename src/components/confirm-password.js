import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import Footer from "./global-components/footer";
import ConfirmPassword from "./section-components/confirm-password";

const ConfirmPasswordPage = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Reset Password" />
      <ConfirmPassword/>
      <Footer />
    </div>
  );
};

export default ConfirmPasswordPage;
