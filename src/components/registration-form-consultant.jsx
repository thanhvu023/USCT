import React from 'react';
import Navbar from './global-components/navbar-v2';
import Footer from './global-components/footer';
import Page_header from './global-components/page-header';
import RegistrationFormDetail from './consultant-components/registration-form-detail';


const RegistrationDetailConsultantPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Chi tiết đơn tư vấn"/>
        <RegistrationFormDetail/>
        <Footer />
    </div>
}

export default RegistrationDetailConsultantPage

