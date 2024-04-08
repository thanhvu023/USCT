import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import ForgotPassword from './section-components/forgot-password';

const ForgotPasswordPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Forgot Password"  />
        <ForgotPassword />
        <Footer />
    </div>
}

export default ForgotPasswordPage

