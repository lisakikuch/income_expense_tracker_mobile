import axios from "axios";
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";

/**
 * Attempts the API call, and if access token is expired (401),
 * uses the refresh token to get a new access token, updates context and retries.
 *
 * @param {Function} apiCallFn - The original API request function. It should accept a token.
 * @param {Function} logout - The logout function from AuthContext.
 * @param {Function} updateToken - The updateToken function from AuthContext.
 * @returns The result of the original or retried API call.
 */

export const fetchWithRefresh = async (apiCallFn, logout, updateToken) => {
    try {
        return await apiCallFn();
    } catch (err) {
        if (err.response?.status === 401) {
            try {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                const res = await axios.post(`${API_URL}/auth/refresh-token`, {
                    refreshToken
                });

                const newAccessToken = res.data.token;

                await updateToken(newAccessToken);
                return await apiCallFn(newAccessToken);

            } catch (err) {
                Alert.alert("Session Expired", "Please log in again");
                await logout();
                throw new Error("Session expired. Please log in again.");
            }
        }
        throw err;
    }
};