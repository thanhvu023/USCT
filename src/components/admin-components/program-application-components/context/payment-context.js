import React, { createContext, useState } from 'react';

const PaymentContext = createContext({
  selectedApp: null,
  setSelectedApp: () => {}
});

export const PaymentProvider = ({ children }) => {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <PaymentContext.Provider value={{ selectedApp, setSelectedApp }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
