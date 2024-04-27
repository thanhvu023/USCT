import React from 'react';
import Footer from './global-components/footer';
import Navbar from './global-components/navbar';
import About from './section-components/about';
import Banner from './section-components/banner';
import CourseFilter from './section-components/course-filter';
import FunFact from './section-components/fun-fact';
import HowToWork from './section-components/how-to-work';
import Intro from './section-components/intro';
import Team from './section-components/team';

const HomePage = () => {
    return <div>
        <Navbar />
        <Banner />
        <Intro />
        <About />
        <HowToWork />
        <CourseFilter />
        <FunFact />
        <Team />
        
        <Footer />
    </div>
}

export default HomePage

