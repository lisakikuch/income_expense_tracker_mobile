import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "@env";
import axios from "axios";
import globalStyles from "../shared/GlobalStyles";

const AddTransaction = () => {
  // Logged in user info + token
  const { user, token } = useAuth();
  const userId = user?._id;

  // Transaction details
  const [transactionType, setTransactionType] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionCategory, setTransactionCategory] = useState(null);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionNote, setTransactionNote] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Placeholder dropdown values
  const TRANSACTIONTYPES = ["Expense", "Income"];
  const INCOMECATEGORIES = [
    "Salary",
    "Bonus",
    "Freelance",
    "Investment Returns",
    "Rental Income",
    "Business Income",
    "Gift",
    "Refunds/Reimbursements",
    "Other Income",
  ];
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
    "Shopping",
    "Travel",
    "Debt Payments",
    "Savings & Investments",
    "Donations",
    "Other Expenses",
  ];

  const handleAddTransaction = async () => {
    console.log("Submitting form...");

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/transactions/`,
        {
          userID: userId,
          type: "Expense",
          amount: parseFloat(transactionAmount),
          category: "Dinning Out",
          date: new Date("2025-03-10").toISOString(),
          note: transactionNote,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        Alert.alert("Success", "Transaction added successfully!");

        // Reset form
        setTransactionType(null);
        setTransactionAmount("");
        setTransactionCategory(null);
        setTransactionDate(new Date());
        setTransactionNote("");
      }
    } catch (err) {
      console.error(
        "Error while adding transaction: ",
        err.response?.data || err.message
      );
      Alert.alert(
        "Adding transaction failed",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.subHeader}>Transaction Details</Text>

        <Text style={globalStyles.label}>Type</Text>
        {/* Dropdown or input for type */}

        <Text style={globalStyles.label}>Amount</Text>
        <TextInput
          style={globalStyles.input}
          keyboardType="decimal-pad"
          value={transactionAmount}
          onChangeText={setTransactionAmount}
          placeholder="Enter Amount"
        />

        <Text style={globalStyles.label}>Category</Text>
        {/* Dropdown or input for category */}

        <Text style={globalStyles.label}>Date</Text>
        {/* Date picker input here */}

        <Text style={globalStyles.label}>Note (Optional)</Text>
        <TextInput
          style={globalStyles.input}
          value={transactionNote}
          onChangeText={setTransactionNote}
          placeholder="Add a Note"
        />

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            onPress={handleAddTransaction}
            style={globalStyles.button}
          >
            <Text style={globalStyles.buttonText}>Add Transaction</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddTransaction;