import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import Page_header from './global-components/page-header';
import RegistrationFormDetail from './consultant-components/registrionFormDetail';


const RegistrationDetailConsultantPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Chi tiết đơn tư vấn"/>
        <RegistrationFormDetail/>
        <Footer />
    </div>
}

export default RegistrationDetailConsultantPage

