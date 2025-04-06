import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';

const AuthContext = createContext();

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