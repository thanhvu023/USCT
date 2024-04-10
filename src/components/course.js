import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import ProgramsPage from './section-components/course-page';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Các Chương Trình"  />
        <ProgramsPage />
        <Footer />
    </div>
}

export default AboutPage

