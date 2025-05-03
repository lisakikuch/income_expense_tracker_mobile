import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@env';
import { useAuth } from './AuthContext';

export const TransactionContext = createContext();

// Get a current month
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const defaultMonth = `${year}-${month}`;

// Set initial states
const initialState = {
    transactions: [],
    transactionType: "Expense",
    transactionMonth: defaultMonth,
    isLoading: false,
    error: null,
};

// Reducer
function transactionReducer(state, action) {
    switch (action.type) {
        case "SET_TRANSACTION_TYPE":
            return { ...state, transactionType: action.payload };

        case "SET_TRANSACTION_MONTH":
            return { ...state, transactionMonth: action.payload };

        case "SET_LOADING":
            return { ...state, isLoading: action.payload };

        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload };

        case "SET_ERROR":
            return { ...state, error: action.payload };

        case "ADD_TRANSACTION":
            return { ...state, transactions: [action.payload, ...state.transactions] };

        case "UPDATE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.map(transaction =>
                    transaction._id === action.payload._id ? action.payload : transaction
                )
            };

        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            };

        default:
            return state;
    }
}

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, initialState);
    
    // User data
    const { token, user } = useAuth();

    // Fetch transaction data
    const fetchTransactions = async () => {

        dispatch({ type: "SET_LOADING", payload: true });

        try {
            const params = {
                type: state.transactionType,
                month: state.transactionMonth,
                userID: user?._id,
            };

            const res = await axios.get(`${API_URL}/transactions`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch({ type: "SET_TRANSACTIONS", payload: res.data });

        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });

        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        };
    };

    // Automatically refetch on filter change
    useEffect(() => {
        if (user && token && state.transactionMonth && state.transactionType) {
            fetchTransactions();
        }
    }, [state.transactionType, state.transactionMonth, user, token]);

    return (
        <TransactionContext.Provider value={{ state, dispatch, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );

};