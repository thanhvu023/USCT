import React from 'react';
import Navbar from '../global-components/navbar';
import PageHeader from '../global-components/page-header';
import Footer from '../global-components/footer';
import UniversityPage from '../blog-components/university-page';

const University = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Trường Đại Học"  />
        <UniversityPage />
        <Footer />
    </div>
}

export default University

