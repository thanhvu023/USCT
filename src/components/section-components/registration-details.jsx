import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRegistrationByRegistrationFormId } from "../../redux/slice/registrationSlice";

const RegistrationDetail = () => {
  const { registrationFormId } = useParams();
  const dispatch = useDispatch();
  const registration = useSelector((state) => state.registration.registrationById);
  const [loading, setLoading] = useState(true);
console.log("registration:",registration)
  useEffect(() => {
    dispatch(getRegistrationByRegistrationFormId(registrationFormId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching registration details:", error);
        setLoading(false);
      });
  }, [dispatch, registrationFormId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Registration Details</h2>
      <p>Registration Form ID: {registrationFormId}</p>
      {/* Render other fields from the 'registration' object */}
      <p>Consultant ID: {registrationFormId.consultantId}</p>
      <p>Customer ID: {registrationFormId.customerId}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default RegistrationDetail;
