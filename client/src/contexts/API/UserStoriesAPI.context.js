import React, { createContext, useContext } from "react";
import axios from "axios";

// Contexts
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";

const UserStoriesAPIContext = createContext();
export const useUserStoriesAPI = () => useContext(UserStoriesAPIContext);
export const UserStoriesAPIProvider = ({ children }) => {
  const { checkAuthWrapper, setAuthHeader } = useUsersAPI();

  const createUserStory = (uid, story_id, story_settings) => {
    return checkAuthWrapper((session) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${uid}/stories`,
        { story_id, story_settings },
        setAuthHeader(session)
      )
    );
  };

  return (
    <UserStoriesAPIContext.Provider value={{ createUserStory }}>
      {children}
    </UserStoriesAPIContext.Provider>
  );
};
