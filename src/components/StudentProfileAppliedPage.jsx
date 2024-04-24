import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import Page_header from './global-components/page-header';
import StudentProfileApplied from './section-components/student-profile-applied-list';


const StudentProfileAppliedPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Hồ sơ sinh viên đã được duyệt"/>
        <StudentProfileApplied/>
        <Footer />
    </div>
}

export default StudentProfileAppliedPage

