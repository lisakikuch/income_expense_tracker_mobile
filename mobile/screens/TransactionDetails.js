import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from '@env';

import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

const TransactionDetails = ({ route, navigation }) => {

  const { transaction } = route.params;
  console.log("Transaction Details - Route Params: ", transaction);

  const [transactionDate, setTransactionDate] = useState(new Date(transaction.date));
  const [transactionType, setTransactionType] = useState(transaction.type);
  const [transactionCategory, setTransactionCategory] = useState(transaction.category);
  const [transactionAmount, setTransactionAmount] = useState(String(transaction.amount.toFixed(2))
  );
  const [transactionNote, setTransactionNote] = useState(transaction.note || "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Logged in user info + token
  const { user, token } = useAuth();
  console.log("User: ", user);
  console.log("Token: ", token);

  // Extract the transaction ID from the user object
  const transactionId = transaction?._id;

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

  const handleUpdate = async () => {

    console.log("Updating Transaction...");

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

      console.log(`${API_URL}/transactions/${transactionId}`);
      const res = await axios.put(
        `${API_URL}/transactions/${transactionId}`,
        {
          type: transactionType,
          amount: parseFloat(transactionAmount),
          category: transactionCategory,
          date: transactionDate.toISOString(),
          note: transactionNote
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.status === 200) {
        route.params?.onUpdate?.(res.data);
        Alert.alert("Success", "Transaction updated successfully!");
        navigation.goBack();
      }

    } catch (err) {
      console.error("Error while updating transaction: ", err);
      Alert.alert("Updating transaction failed", "Unexpected error occurred");

    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    console.log("Deleting Transaction...");

    try {
      setIsLoading(true);

      console.log(`${API_URL}/transactions/${transactionId}`);
      const res = await axios.delete(
        `${API_URL}/transactions/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.status === 200) {
        route.params?.onUpdate?.({ deletedId: transactionId });
        Alert.alert("Success", "Transaction deleted successfully!");
        navigation.goBack();
      }

    } catch (err) {
      console.error("Error while deleting transaction: ", err);
      Alert.alert("Deleting transaction failed", "Unexpected error occurred");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.card}>

        <View>
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
              display={Platform.OS === "ios" ? "default" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setTransactionDate(selectedDate);
              }}
            />
          )}
        </View>

        <View>
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
        </View>

        <Text style={styles.label}>Category</Text>
        <Dropdown
          style={styles.input}
          data={transactionType === "Income" ? formattedIncomeCategories : formattedExpenseCategories}
          labelField="label"
          valueField="value"
          value={transactionCategory}
          onChange={(item) => setTransactionCategory(item.value)}
        />

        <View>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={transactionAmount}
            onChangeText={setTransactionAmount}
            keyboardType="decimal-pad"
          />
        </View>

        <View>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.input}
            value={transactionNote}
            onChangeText={setTransactionNote}
          />
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => Alert.alert(
            "Delete Transaction",
            "Are you sure you want to delete this transaction?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => handleDelete(),
                style: "destructive",
              },
            ]
          )}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#E9ECEF",
    padding: 12,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: "#6a5acd",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TransactionDetails;
