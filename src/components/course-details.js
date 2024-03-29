import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import CourseDetails from './section-components/course-details';
import Footer from './global-components/footer';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Chi tiết chương trình"  />
        <CourseDetails />
        <Footer />
    </div>
}

export default AboutPage

