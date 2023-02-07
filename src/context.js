import React, { useState,  createContext } from "react";
import { persistedState } from "./helpers";

export const Context = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => persistedState("user"));

  const [language, setLanguage] = useState(
    () => persistedState("language") || "pl"
  );

  return (
    <Context.Provider
      value={{
        userData: { user, setUser },
        languageData: { language, setLanguage },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default UserProvider;
