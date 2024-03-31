import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import StudentProfilePage from './section-components/StudentProfile';
import Page_header from './global-components/page-header';
import StudentProfileDetails from './section-components/table/student-profile-details';


const StudentProfileDetailPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Thông tin sinh viên"/>
        <StudentProfileDetails/>
        <Footer />
    </div>
}

export default StudentProfileDetailPage

