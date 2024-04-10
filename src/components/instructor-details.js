import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import UniversityDetail from './section-components/instructor-details';

const InstructorPage = () => {
    return <div>
        <Navbar />
        <PageHeader  />
        <UniversityDetail />
        <Footer />
    </div>
}

export default InstructorPage

