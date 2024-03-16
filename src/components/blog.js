import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Blog from './blog-components/blog';
import Footer from './global-components/footer';

const SingUpPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Trường Đại Học"  />
        <Blog />
        <Footer />
    </div>
}

export default SingUpPage

