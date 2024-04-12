import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import Registration from './section-components/contact-page';

const RegistrationPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Mục Tư Vấn"  />
        <Registration />
        <Footer />
    </div>
}

export default RegistrationPage

