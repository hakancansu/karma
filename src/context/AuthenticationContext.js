import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});


  const value = React.useMemo(() => ({
    isAuthenticated, setAuthenticated, user, setUser
  }), [isAuthenticated,setAuthenticated]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };