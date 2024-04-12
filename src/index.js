import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import StudentProfile from "./components/student-profile";
import AdminPage from "./components/admin-page";
import StudentProfileDetailPage from "./components/student-detail-page";
import ForgotPasswordPage from "./components/forgot-password";
import ConfirmPasswordPage from "./components/confirm-password";
import ChangePasswordPage from "./components/change-password";
import CreateStudentProfilePage from "./components/student-profile/create-student-profile.jsx";
import HomePage from "./components/home";
import Program from "./components/program";
import ProgramDetail from "./components/program-details";
import CustomerProfile from "./components/customer-profile";
import University from "./components/university-components/university.jsx";
import UniversityDetail from "./components/university-components/university-details";
import RegistrationPage from "./components/registration-page.jsx";
import StudentProfileRegistrationPage from "./components/studentProfileRegistration.jsx";
import StudentProfileAppliedPage from "./components/StudentProfileAppliedPage.jsx";
// import EditCustomer from "./components/admin-components/customer-components/edit-customer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/program" element={<Program />} />
        <Route
          path="/program-details/:programById"
          element={<ProgramDetail />}
        />
        <Route
          path="/university-details/:universityId"
          element={<UniversityDetail />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<RegistrationPage />} />
        <Route path="/university" element={<University />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/students-profile" element={<StudentProfile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/student-profile-detail/:studentProfileId"
          element={<StudentProfileDetailPage />}
        />
             {/* <Route
          path="/registration-detail/:registrationFormId"
          element={<RegistrationDetailPage />}
        /> */}
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
        <Route 
        path="/students-profile/registrationList" 
        element={<StudentProfileRegistrationPage/>}
        />
        <Route 
        path="/students-profile/appliedList" 
        element={<StudentProfileAppliedPage/>}
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
