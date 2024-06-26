/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import StudentProfile from "../components/student-profile";
import AdminPage from "../components/admin-page";
import StudentProfileDetailPage from "../components/student-detail-page";
import ForgotPasswordPage from "../components/forgot-password";
import ConfirmPasswordPage from "../components/confirm-password";
import ChangePasswordPage from "../components/change-password";
import CreateStudentProfilePage from "../components/student-profile/create-student-profile.jsx";
import HomePage from "../components/home";
import Program from "../components/program";
import ProgramDetail from "../components/program-details";
import CustomerProfile from "../components/customer-profile";
import University from "../components/university-components/university.jsx";
import UniversityDetail from "../components/university-components/university-details";
import RegistrationPage from "../components/registration-page.jsx";
import StudentProfileRegistrationPage from "../components/studentProfileRegistration.jsx";
import StudentProfileAppliedPage from "../components/StudentProfileAppliedPage.jsx";
import RegistrationDetailPage from "../components/registration-details-page.jsx";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import PrivateRoute from "./PrivateRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ConsultantPage from "../components/consultant-page.jsx";
import RegistrationDetailConsultantPage from "../components/registration-form-consultant.jsx";
import ConsultantProfilePage from "../components/consultantProfilePage.jsx";
import ConsultantChangePasswordPage from "../components/consultantChangePassword.jsx";
import StaffPage from "../components/staff-page.jsx";
import StaffRoute from "./StaffRoute.jsx";
import ConsultantRoute from "./ConsultantRoute.jsx";
import ProgramApplicationDetailsPage from "../components/program-application-details-page.jsx";
import PaymentResponsePage from "../components/payment-response-page.jsx";
import CheckRequirement from "../components/check-requirement-page.jsx";
import Payment from "../components/admin-components/program-application-components/payment.jsx";
import PaymentDetailsPage from "../components/admin-components/program-application-components/thanhtoan.jsx";

const Routers = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userRole = token ? jwtDecode(token).Role : null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contact"
          element={
            <PrivateRoute userRole={userRole}>
              <RegistrationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/program"
          element={
            <PrivateRoute userRole={userRole}>
              <Program />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute userRole={userRole}>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/program-details/:programById"
          element={
            <PrivateRoute userRole={userRole}>
              <ProgramDetail />
            </PrivateRoute>
          }
        />
          <Route
          path="/program-details/check-requirement/:programById"
          element={
            <PrivateRoute userRole={userRole}>
              <CheckRequirement />
            </PrivateRoute>
          }
        />
        <Route
          path="/university-details/:universityId"
          element={
            <PrivateRoute userRole={userRole}>
              <UniversityDetail />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/university"
          element={
            <PrivateRoute userRole={userRole}>
              <University />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer-profile"
          element={
            <PrivateRoute userRole={userRole}>
              <CustomerProfile />
            </PrivateRoute>
          }
        />
        {/* asdasdsa */}
        <Route
          path="/students-profile"
          element={
            <PrivateRoute userRole={userRole}>
              <StudentProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-profile/:studentProfileId"
          element={
            <PrivateRoute userRole={userRole}>
              <StudentProfileDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-profile/registration-detail/:registrationFormId"
          element={
            <PrivateRoute userRole={userRole}>
              <RegistrationDetailPage />
            </PrivateRoute>
          }
        />
          <Route
          path="/student-profile/program-application-detail/:programApplicationId"
          element={
            <PrivateRoute userRole={userRole}>
              <ProgramApplicationDetailsPage />
            </PrivateRoute>
          }
        />
        {/* 2 cai nay chua loading */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ConfirmPasswordPage />} />
        <Route
          path="/customer/change-password"
          element={
            <PrivateRoute userRole={userRole}>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />
          <Route path="/payment-response" element={<PaymentResponsePage />} />

        <Route
          path="/create-student-profile"
          element={
            <PrivateRoute userRole={userRole}>
              <CreateStudentProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/students-profile/registrationList"
          element={
            <PrivateRoute userRole={userRole}>
              <StudentProfileRegistrationPage />
            </PrivateRoute>
          }
        />
        {/* chua loading */}
        <Route
          path="/students-profile/appliedList"
          element={
            <PrivateRoute userRole={userRole}>
              <StudentProfileAppliedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultant"
          element={
            <ConsultantRoute userRole={userRole}>
              <ConsultantPage />
            </ConsultantRoute>
          }
        />
        <Route
          path="/consultant-profile"
          element={
            <ConsultantRoute userRole={userRole}>
              <ConsultantProfilePage />
            </ConsultantRoute>
          }
        />
        <Route
          path="/consultant/registrationForm/:registrationFormId"
          element={
            <ConsultantRoute userRole={userRole}>
              <RegistrationDetailConsultantPage />
            </ConsultantRoute>
          }
        />
        <Route
          path="/consultant/change-password"
          element={
            <ConsultantRoute userRole={userRole}>
              <ConsultantChangePasswordPage />
            </ConsultantRoute>
          }
        />
        <Route path="*" element={<p>There is nothing here: 404!</p>} />
        <Route
          path="/staff/:staffId"
          element={
            <StaffRoute userRole={userRole}>
              <StaffPage />
            </StaffRoute>
          }
        >
         
        </Route>
        <Route
            path="staff-programApplication-operation/:programApplicationId" // Remove the leading slash for nested route
            element={
              <StaffRoute userRole={userRole}>
                <PaymentDetailsPage />  
              </StaffRoute>
            }
          />
        
      </Routes>
    </Router>
  );
};

export default Routers;
