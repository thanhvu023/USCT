import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Instructor from './section-components/instructor-details';
import Footer from './global-components/footer';

const InstructorPage = () => {
    return <div>
        <Navbar />
        <PageHeader  />
        <Instructor />
        <Footer />
    </div>
}

export default InstructorPage

