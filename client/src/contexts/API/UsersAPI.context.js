import React, { createContext, useContext } from "react";
import axios from "axios";

// Error Codes
import { errorCodes } from "@/lib/handlers/errorHandlers";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

const UsersAPIContext = createContext();
export const useUsersAPI = () => useContext(UsersAPIContext);
export const UsersAPIProvider = ({ children }) => {
  const { session } = useAuth();
  const checkAuthWrapper = (fn) => {
    if (!session) {
      return {
        data: null,
        error: {
          code: errorCodes.NO_ACCESS_TOKEN,
          message: "Please log in to continue.",
        },
      };
    }

    return fn(session);
  };

  const setAuthHeader = (session) => {
    return {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    };
  };

  const getUser = (uid) => {
    return checkAuthWrapper((session) =>
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${uid}`,
        setAuthHeader(session)
      )
    );
  };

  const createProfile = (values) => {
    return checkAuthWrapper((session) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}/profile`,
        values,
        setAuthHeader(session)
      )
    );
  };

  return (
    <UsersAPIContext.Provider value={{ getUser, createProfile }}>
      {children}
    </UsersAPIContext.Provider>
  );
};
