import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [role, setRole] = useState(() => {
        const savedRole = localStorage.getItem("role");
        return savedRole ? JSON.parse(savedRole) : null;
    });



    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        if (role) {
            localStorage.setItem("role", JSON.stringify(role));
        } else {
            localStorage.removeItem("role");
        }
    }, [role]);


    
    return (
        <UserContext.Provider value={{ user, setUser, role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);