import React from 'react';
import Navbar from './global-components/navbar-v4';
import PageHeader from './global-components/page-header';
import EventDetailsPage from './section-components/event-details';
import Footer from './global-components/footer';

const EventDetails = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Event Single"  />
        <EventDetailsPage />
        <Footer />
    </div>
}

export default EventDetails

