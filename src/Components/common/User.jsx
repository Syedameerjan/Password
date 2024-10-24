// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for user data
const UserContext = createContext();

// Create a Provider component
export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState(''); // Default role, replace with actual logic

  // You can add logic to update userRole here (e.g., from an API or auth provider)

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}



