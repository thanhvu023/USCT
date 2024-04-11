import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Footer from './global-components/footer';
import ProgramDetailPage from './section-components/program-detail-page';

const ProgramDetail = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Chi tiết chương trình"  />
        <ProgramDetailPage />
        <Footer />
    </div>
}

export default ProgramDetail

