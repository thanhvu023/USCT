import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import CustomerProfilePage from './section-components/customer-profile-page';
import PageHeader from './global-components/page-header';

const CustomerProfile = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Hồ sơ khách hàng"/>
        <CustomerProfilePage />
        <Footer />
    </div>
}

export default CustomerProfile

