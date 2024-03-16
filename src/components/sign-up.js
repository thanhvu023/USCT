import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import SignUp from './section-components/sign-up';
import Footer from './global-components/footer';

const SingUpPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Đăng ký"  />
        <SignUp />
        <Footer />
    </div>
}

export default SingUpPage

