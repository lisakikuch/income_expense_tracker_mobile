import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { TransactionContext } from "../../contexts/TransactionContext";

// Utils
import { fetchWithRefresh } from "../../utils/fetchWithRefresh";

// API
import { API_URL } from '@env';

// npm packages
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

// Constants for Dropdown
import {
  TRANSACTION_TYPES,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../../constants/categories";

// Styling
import styles from "./AddTransaction.styles";

const AddTransaction = () => {

  const { state, dispatch } = useContext(TransactionContext);

  // Logged in user info + token
  const { user, token, logout, updateToken } = useAuth();
  console.log("User: ", user);

  // Extract the user ID from the user object
  const userId = user?._id;

  // Transaction details
  const [transactionType, setTransactionType] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionCategory, setTransactionCategory] = useState(null);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionNote, setTransactionNote] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Formatted toggle button items
  const formattedTransactionTypes = TRANSACTION_TYPES.map((item) => ({
    label: item,
    value: item
  }));

  // Formatted dropdown items 
  const formattedIncomeCategories = INCOME_CATEGORIES.map((item) => ({
    label: item,
    value: item
  }));

  const formattedExpenseCategories = EXPENSE_CATEGORIES.map((item) => ({
    label: item,
    value: item
  }));

  const handleAddTransaction = async () => {
    console.log("Submitting form...");

    // Input validation
    if (!transactionType || !transactionAmount || !transactionCategory || !transactionDate) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      return;
    }

    if (isNaN(transactionAmount) || Number(transactionAmount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount greater than 0.");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // apiCallFn passed to fetchWithRefresh
      const res = await fetchWithRefresh(
        (newToken) => {
          const finalToken = newToken || token;
          return axios.post(
            `${API_URL}/transactions/`,
            {
              userID: userId,
              type: transactionType,
              amount: parseFloat(transactionAmount),
              category: transactionCategory,
              date: new Date(transactionDate).toISOString(),
              note: transactionNote
            },
            {
              headers: { Authorization: `Bearer ${finalToken}` },
            }
          )
        },
        logout,
        updateToken
      );

      if (res.status === 201) {
        Alert.alert("Success", "Transaction added successfully!");

        // Dispatch to global state
        dispatch({ type: "ADD_TRANSACTION", payload: res.data.transaction });
        console.log("After ADD_TRANSACTION:", res.data.transaction);

        // Reset form
        setTransactionType(null);
        setTransactionAmount("");
        setTransactionCategory(null);
        setTransactionDate(new Date());
        setTransactionNote("");
      }


    } catch (err) {
      console.error("Error while adding transaction: ", err.response?.data || err.message);
      Alert.alert("Adding transaction failed", err.response?.data?.message || "Something went wrong");

    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.subHeader}>Transaction Details</Text>

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{transactionDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={transactionDate}
              mode="date"
              display={Platform.OS === "ios" ? "default" : "calendar"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setTransactionDate(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Type</Text>
          <Dropdown
            style={styles.input}
            data={formattedTransactionTypes}
            labelField="label"
            valueField="value"
            value={transactionType}
            onChange={(item) => {
              setTransactionType(item.value);
              setTransactionCategory(null);
            }}
            placeholder="Select Type"
          />
          <Text style={styles.label}>Category</Text>
          <Dropdown
            style={styles.input}
            data={transactionType === "Income" ? formattedIncomeCategories : formattedExpenseCategories}
            labelField="label"
            valueField="value"
            value={transactionCategory}
            onChange={(item) => setTransactionCategory(item.value)}
            placeholder="Select Category"
            disabled={!transactionType}
          />

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={transactionAmount}
            onChangeText={setTransactionAmount}
            placeholder="Enter Amount"
          />

          <Text style={styles.label}>Note (Optional)</Text>
          <TextInput
            style={styles.input}
            value={transactionNote}
            onChangeText={setTransactionNote}
            placeholder="Add a Note"
          />

          {state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={handleAddTransaction}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>)
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTransaction;
