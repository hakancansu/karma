import React, { createContext, useState } from 'react';

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
    
    const [register, setRegister] = useState({});
  console.log(register);
  
    const value = React.useMemo(() => ({
        register, setRegister
    }), [register, setRegister]);
  
    return (
      <RegisterContext.Provider value={value}>
        {children}
      </RegisterContext.Provider>
    );
  };
  
  export { RegisterContext, RegisterProvider };