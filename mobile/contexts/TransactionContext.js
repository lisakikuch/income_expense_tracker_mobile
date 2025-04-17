import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@env';
import { useAuth } from './AuthContext';

export const TransactionContext = createContext();

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const defaultMonth = `${year}-${month}`;

const initialState = {
    transactions: [],
    type: "Expense",
    month: defaultMonth,
    category: null,
    loading: false,
    error: null,
};

function transactionReducer(state, action) {
    switch (action.type) {
        case "SET_TYPE":
            return { ...state, type: action.payload };
        case "SET_MONTH":
            return { ...state, month: action.payload };
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        case "SET_LOADING":
            return { ...state, loading: true };
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload, loading: false };
        case "SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, initialState);
    const { token, user } = useAuth();

    const fetchTransactions = async () => {
        dispatch({ type: "SET_LOADING" });

        try {
            const params = {
                type: state.type,
                month: state.month,
                userID: user?._id,
            };
            if (state.category) params.category = state.category;

            const res = await axios.get(`${API_URL}/transactions`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "SET_TRANSACTIONS", payload: res.data });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    };

    // Automatically refetch on filter change
    useEffect(() => {
        if (user && token && state.month) {
            fetchTransactions();
        }
    }, [state.type, state.month, state.category, user, token]);

    return (
        <TransactionContext.Provider value={{ state, dispatch, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );

}