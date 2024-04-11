import React from 'react';
import Navbar from '../global-components/navbar';
import PageHeader from '../global-components/page-header';
import Footer from '../global-components/footer';
import UniversityDetailPage from './university-details-page';

const UniversityDetail = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Chi tiết trường đại học" />
        <UniversityDetailPage/>
        <Footer />
    </div>
}

export default UniversityDetail

