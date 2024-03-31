import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import University from './blog-components/university';

const UniversityPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Trường Đại Học"  />
        <University />
        <Footer />
    </div>
}

export default UniversityPage

