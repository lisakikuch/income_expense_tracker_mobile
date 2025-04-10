// React Hooks used to create & manage authentication state
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
// A secure storage API from Expo to persist sensitive info like JWT tokens.
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

// Create a new context object, allowing us to share
// authentication-related data & functions throughout the component
const AuthContext = createContext();

// Wrap the app & provide authentication data to all nested components via context
export const AuthProvider = ({ children }) => {
    // Define variables holding a user object and its jwt received from backend
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    console.log("API_URL: ", API_URL);

    useEffect(() => {
        const loadStoreData = async () => {
            const storedToken = await SecureStore.getItemAsync('jwtToken');
            const storedUser = await SecureStore.getItemAsync('userData');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        };
        loadStoreData();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });

            const { user, token } = res.data;

            await SecureStore.setItemAsync('jwtToken', token);
            await SecureStore.setItemAsync('userData', JSON.stringify(user));

            setUser(user);
            setToken(token);

            console.log(JSON.stringify(user));

        } catch (err) {
            console.error("Login Failed: ", err);
            throw new Error("Invalid Credentials");
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('jwtToken');
        await SecureStore.deleteItemAsync('userData');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);