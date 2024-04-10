import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import ProgramDetail from './section-components/course-details';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Chi tiết chương trình"  />
        <ProgramDetail />
        <Footer />
    </div>
}

export default AboutPage

