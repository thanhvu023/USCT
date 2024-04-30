import React from 'react';
import Navbar from './global-components/navbar';
import Footer from './global-components/footer';
import Page_header from './global-components/page-header';
import ProgramApplicationDetails from './section-components/program-application-details';


const ProgramApplicationDetailsPage = () => {
    return <div>
        <Navbar />
        <Page_header headertitle="Chi tiết chương trình đã ứng tuyển "/>
        <ProgramApplicationDetails/>
        <Footer />
    </div>
}

export default ProgramApplicationDetailsPage

