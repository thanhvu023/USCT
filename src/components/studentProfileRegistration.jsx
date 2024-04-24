import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import Page_header from './global-components/page-header';
import StudentProfileRegistration from './section-components/student-profile-registration';


const StudentProfileRegistrationPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Hồ sơ sinh viên"/>
        <StudentProfileRegistration/>
        <Footer />
    </div>
}

export default StudentProfileRegistrationPage

