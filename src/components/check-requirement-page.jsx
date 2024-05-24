import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import ChecRequirementPage from './section-components/check-requirement-page';

const CheckRequirement = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle=""  />
        <ChecRequirementPage />
        <Footer />
    </div>
}

export default CheckRequirement

