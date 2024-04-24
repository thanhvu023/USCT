import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import StudentProfilePage from './section-components/student-profile';
import Page_header from './global-components/page-header';


const StudentProfile = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Hồ sơ sinh viên"/>
        <StudentProfilePage/>
        <Footer />
    </div>
}

export default StudentProfile

