import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Update User
  const updateUser = (user) => {
    const userData = {
      age: user.age || null,
      username: user.username || null,
      uid: user.uid || null,
      email: user.email || null,
    };

    setUser({ ...userData });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
