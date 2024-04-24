import React from 'react';
import Navbar from './global-components/navbar';
import Banner from './section-components/banner';
import Intro from './section-components/intro';
import About from './section-components/about';
import CourseFilter from './section-components/course-filter';
import FunFact from './section-components/fun-fact';
import HowToWork from './section-components/how-to-work';
import Team from './section-components/team';
import Footer from './global-components/footer';

const HomePage = () => {
    return <div>
        <Navbar />
        <Banner />
        <Intro />
        <About />
        <HowToWork />
        <CourseFilter />
        <FunFact />
        <HowToWork />
        <Team />
        
        <Footer />
    </div>
}

export default HomePage

