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
    const [refreshToken, setRefreshToken] = useState(null);

    console.log("API_URL: ", API_URL);

    // Run once on app load
    useEffect(() => {
        // Retrieve saved user & token from secure storagge (from the previous session)
        const loadStoreData = async () => {
            const storedToken = await SecureStore.getItemAsync('accessToken');
            const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');
            const storedUser = await SecureStore.getItemAsync('userData');

            if (storedToken && storedRefreshToken && storedUser) {
                setToken(storedToken);
                setRefreshToken(storedRefreshToken);
                setUser(JSON.parse(storedUser));
            }
        };
        loadStoreData();
    }, []);

    // Send a login request to the backend with input email and pw
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });

            // If successful:
            const { user: fetchedUser, token, refreshToken } = res.data;

            // Access token
            await SecureStore.setItemAsync('accessToken', token);
            await SecureStore.setItemAsync('refreshToken', refreshToken);
            await SecureStore.setItemAsync('userData', JSON.stringify(fetchedUser));

            // Save user data and token
            setUser(fetchedUser);
            setToken(token);
            setRefreshToken(refreshToken)

            console.log("Log in as: ", fetchedUser);

            // If failed: throw an exception
        } catch (err) {
            console.error("Login Failed: ", err);
            throw new Error("Invalid Credentials");
        }
    };

    // Logout
    const logout = async () => {
        try {
            // Simply delete user data & token from secure storage
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            await SecureStore.deleteItemAsync('userData');
            setUser(null);
            setToken(null);
            setRefreshToken(null);
        } catch (err) {
            console.error("Failed to clear to tokens: ", err);
        }
    };

    // Store a new token retrieved with refresh token
    const updateToken = async (newToken) => {
        await SecureStore.setItemAsync('accessToken', newToken);
        setToken(newToken);
    };

    return (
        // Make the user, token and authentication functions (login/logout) available
        // to all child components
        <AuthContext.Provider value={{ user, token, login, logout, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to make it easier to access auth state and functions
export const useAuth = () => React.useContext(AuthContext);