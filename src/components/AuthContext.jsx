import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser ] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser  = localStorage.getItem("user");
        if (savedToken && savedUser ) {
            setToken(savedToken);
            setUser (savedUser );
        }
    }, []);

    const login = ({ role, password }) => {
        // Check for admin credentials
        if (role === "admin" && password === "cac25017") {
            const tokenFalso = "dG9rZW5GYWxzbzEyMzQ=";
            setToken(tokenFalso);
            setUser (role);
            localStorage.setItem("token", tokenFalso);
            localStorage.setItem("user", role);
            return true;
        }
        return false;
    };

    const logout = () => {
        setToken(null);
        setUser (null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
