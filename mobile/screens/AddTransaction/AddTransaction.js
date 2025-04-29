import React, { useState } from "react";
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

import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from '@env';

import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

// Styling
import styles from "./AddTransaction.styles";

const AddTransaction = () => {

  // Logged in user info + token
  const { user, token } = useAuth();
  console.log("User: ", user);
  console.log("Token: ", token);

  // Extract the user ID from the user object
  const userId = user?._id;

  // Transaction details
  const [transactionType, setTransactionType] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionCategory, setTransactionCategory] = useState(null);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionNote, setTransactionNote] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Display activity indicator while loading
  const [isLoading, setIsLoading] = useState(false);

  // For dropdown menu items
  const TRANSACTIONTYPES = ["Expense", "Income"];
  const formattedTransactionTypes = TRANSACTIONTYPES.map((item) => ({
    label: item,
    value: item
  }));

  const INCOMECATEGORIES = [
    "Salary",
    "Bonus",
    "Freelance",
    "Investment Returns",
    "Rental Income",
    "Business Income",
    "Gift",
    "Refunds/Reimbursements",
    "Other Income"];
  const formattedIncomeCategories = INCOMECATEGORIES.map((item) => ({
    label: item,
    value: item
  }));

  const EXPENSECATEGORIES = [
    "Housing",
    "Utilities",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Entertainment",
    "Healthcare",
    "Education",
    "Personal Care",
    "Shopping", "Travel",
    "Debt Payments",
    "Savings & Investments",
    "Donations",
    "Other Expenses"
  ];
  const formattedExpenseCategories = EXPENSECATEGORIES.map((item) => ({
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
      setIsLoading(true);
      // Send a POST request to create a new transaction with logged in user ID + JWT
      const res = await axios.post(
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
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.status === 201) {
        Alert.alert("Success", "Transaction added successfully!");

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
      setIsLoading(false);
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

          {isLoading ? (
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
