import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import Page_header from './global-components/page-header';
import RegistrationDetails from './section-components/registration-details';


const RegistrationDetailPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Chi tiết đơn tư vấn"/>
        <RegistrationDetails/>
        <Footer />
    </div>
}

export default RegistrationDetailPage

