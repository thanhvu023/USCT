import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ContactPage from './section-components/contact-page';
import Footer from './global-components/footer';

const Contact = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Mục Tư Vấn"  />
        <ContactPage />
        <Footer />
    </div>
}

export default Contact

