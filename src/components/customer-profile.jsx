import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import CustomerProfilePage from './section-components/customer-profile-page';

const CustomerProfile = () => {
    return <div>
        <Navbar />
        <CustomerProfilePage />
        <Footer />
    </div>
}

export default CustomerProfile

