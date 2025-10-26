import React, { createContext, useContext } from "react";
import axios from "axios";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

const UsersAPIContext = createContext();
export const useUsersAPI = () => useContext(UsersAPIContext);
export const UsersAPIProvider = ({ children }) => {
  const { session } = useAuth();
  const checkAuthWrapper = async (fn) => {
    if (!session) {
      return null;
    }

    return await fn(session);
  };

  const setAuthHeader = (session) => {
    return {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    };
  };

  const getUser = async (uid) => {
    return checkAuthWrapper(async (session) => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${uid}`,
        setAuthHeader(session)
      );

      return response.data;
    });
  };

  return (
    <UsersAPIContext.Provider value={{ getUser }}>
      {children}
    </UsersAPIContext.Provider>
  );
};
