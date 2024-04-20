import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRegistration, getRegistrationByCustomerId } from '../../../redux/slice/registrationSlice';

const Test2 = () => {
    const dispatch = useDispatch();
  
    const registrations = useSelector(state => state.registration.registrationForms);
    const registrationsByCustomerId = useSelector(state => state.registration.registrationById);
    const loading = useSelector(state => state.registration.loading);
  
    const [customerId, setCustomerId] = useState(null);
    const [uniqueCustomerIds, setUniqueCustomerIds] = useState([]);
  
    useEffect(() => {
      dispatch(getRegistration());
    }, [dispatch]);
  
    useEffect(() => {
      // Tạo mảng chứa các customerId duy nhất
      const uniqueIds = Array.from(new Set(registrations.map(registration => registration.customerId)));
      console.log("uniqueIds:",uniqueIds)
      setUniqueCustomerIds(uniqueIds);
    }, [registrations]);
  
    const handleCustomerIdChange = (event) => {
      const selectedCustomerId = event.target.value;
      setCustomerId(selectedCustomerId);
      if (selectedCustomerId) {
        dispatch(getRegistrationByCustomerId(selectedCustomerId));
      }
    };
  
    return (
      <div>
        <h1>Registration Forms</h1>
        <label htmlFor="customerId">Select CustomerId:</label>
        <select id="customerId" onChange={handleCustomerIdChange}>
          <option value="">-- Select --</option>
          {/* Sử dụng mảng uniqueCustomerIds để render các customerId duy nhất */}
          {uniqueCustomerIds.map((id, index) => (
            <option key={index} value={id}>
              {id}
            </option>
          ))}
        </select>
  
        {loading && <p>Loading...</p>}
  
        <div>
          {registrationsByCustomerId.map((registration, index) => (
            <div key={index}>
              <h2>Đơn tư vấn #{index + 1}</h2>
              <p>Customer ID: {registration.customerId}</p>
              <p>Chuyên ngành đã chọn: {registration.majorChoose}</p>
              <p>Chương trình đã chọn: {registration.programChoose}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Test2;
  