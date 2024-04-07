import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import HomeV1 from "./components/home-v1";
import HomeV2 from "./components/home-v2";
import HomeV3 from "./components/home-v3";
import Course from "./components/course";
import CourseDetails from "./components/course-details";
import About from "./components/about";
import Event from "./components/event";
import EventDetails from "./components/event-details";
import Instructor from "./components/instructor";
import InstructorDetails from "./components/instructor-details";
import Pricing from "./components/pricing";
import Gallery from "./components/gallery";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Contact from "./components/contact";
import BlogDetails from "./components/blog-details";
import Profile from "./components/profile";
import StudentProfile from "./components/student-profile";
import UniversityPage from "./components/university-page";
import AdminPage from "./components/admin-page";
import StudentProfileDetailPage from "./components/student-detail-page";
import AllCustomer from "./components/admin-components/customer-components/all-customer";
import EditCustomer from "./components/admin-components/customer-components/edit-customer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeV1 />} />
        <Route path="/home-v2" element={<HomeV2 />} />
        <Route path="/home-v3" element={<HomeV3 />} />
        <Route path="/program" element={<Course />} />
        <Route path="/program-details/:programById" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/university-details/:universityId" element={<InstructorDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/university" element={<UniversityPage />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/customer-profile" element={<Profile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/student-profile-detail/:id" element={<StudentProfileDetailPage />} />
        {/* <Route path="/admin/customer-edit/:id" element={<EditCustomer />} /> */}
    

      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("edumint"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
