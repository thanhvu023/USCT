import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Event from './section-components/event-page';
import Footer from './global-components/footer';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Event"  />
        <Event />
        <Footer />
    </div>
}

export default AboutPage

