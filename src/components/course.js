import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Course from './section-components/course-page';
import Footer from './global-components/footer';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Các Chương Trình"  />
        <Course />
        <Footer />
    </div>
}

export default AboutPage

