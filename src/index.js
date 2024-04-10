import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

import Course from "./components/course";
import CourseDetails from "./components/course-details";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Contact from "./components/contact";
import Profile from "./components/profile";
import StudentProfile from "./components/student-profile";
import UniversityPage from "./components/university-page";
import AdminPage from "./components/admin-page";
import StudentProfileDetailPage from "./components/student-detail-page";
import ForgotPasswordPage from "./components/forgot-password";
import ConfirmPasswordPage from "./components/confirm-password";
import ChangePasswordPage from "./components/change-password";
import CreateStudentProfilePage from "./components/create-student-profile";
import UniversityDetail from "./components/section-components/instructor-details";
import HomePage from "./components/home-v1";
// import EditCustomer from "./components/admin-components/customer-components/edit-customer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/program" element={<Course />} />
        <Route
          path="/program-details/:programById"
          element={<CourseDetails />}
        />
        <Route
          path="/university-details/:universityId"
          element={<UniversityDetail />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/university" element={<UniversityPage />} />
        <Route path="/customer-profile" element={<Profile />} />
        <Route path="/students-profile" element={<StudentProfile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/student-profile-detail/:studentProfileId"
          element={<StudentProfileDetailPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ConfirmPasswordPage />} />
        <Route
          path="/customer/change-password"
          element={<ChangePasswordPage />}
        />
        <Route
          path="/create-student-profile"
          element={<CreateStudentProfilePage />}
        />
        {/* <Route path="/customer-edit/:id" element={<EditCustomer />} /> */}
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("edumint"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
