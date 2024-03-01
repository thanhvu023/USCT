import React from 'react';
import Navbar from './global-components/navbar-v2';
import Banner from './section-components/banner-v2';
import Intro from './section-components/intro-v2';
import About from './section-components/about-v2';
import FeaturedCourse from './section-components/course-featured';
import SpecialArea from './section-components/special-area';
import Price from './section-components/price';
import Client from './section-components/client';
import Event from './section-components/event';
import Testimonial from './section-components/testimonial-v2';
import LatestPost from './blog-components/latest-news-v2';
import Footer from './global-components/footer-v2';

const Home_V2 = () => {
    return <div>
        <Navbar />
        <Banner />
        <Intro />
        <About />
        <FeaturedCourse />
        <SpecialArea />
        <Price />
        <Client />
        <Event />
        <Testimonial />
        <LatestPost />
        <Footer />
    </div>
}

export default Home_V2

