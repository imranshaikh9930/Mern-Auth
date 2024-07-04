// context.js
import React, { createContext, useState } from "react";

// Create the context
export const UsersContext = createContext();

// Create the provider component
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    return (
        <UsersContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UsersContext.Provider>
    );
};
