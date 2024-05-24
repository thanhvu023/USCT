import React from "react";
import Navbar from "../global-components/navbar";
import PageHeader from "../global-components/page-header";
import Footer from "../global-components/footer";
import CreateStudentProfile from "./CreateStudentProfile";

const CreateStudentProfilePage = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Khởi tạo hồ sơ du học" />
      <CreateStudentProfile />
      <Footer />
    </div>
  );
};

export default CreateStudentProfilePage;
