import React from "react";
import Footer from "./global-components/footer";
import PageHeader from "./global-components/page-header";
import Navbar2 from "./global-components/navbar-v2";
import ConsultantProfile from "./consultant-components/consultant-profile";

const ConsultantProfilePage = () => {
  return (
    <div>
      <Navbar2 />
      <PageHeader headertitle="Consultant" />
      <ConsultantProfile />
      <Footer />
    </div>
  );
};

export default ConsultantProfilePage;
