import React, { useState } from "react";
// import { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
// import { TransactionContext } from "../../contexts/TransactionContext";
import { useTransaction } from "../../contexts/TransactionContext";

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
  EXPENSE_CATEGORIES
} from '../../constants/categories';

// Styling
import styles from "./TransactionDetails.styles";

const TransactionDetails = ({ route, navigation }) => {

  // Global states
  // const { dispatch } = useContext(TransactionContext);
  const { dispatch } = useTransaction();

  const { transaction } = route.params;
  console.log("Transaction Details - Route Params: ", transaction);

  // Local states
  const [transactionDate, setTransactionDate] = useState(new Date(transaction.date));
  const [transactionType, setTransactionType] = useState(transaction.type);
  const [transactionCategory, setTransactionCategory] = useState(transaction.category);
  const [transactionAmount, setTransactionAmount] = useState(String(transaction.amount.toFixed(2))
  );
  const [transactionNote, setTransactionNote] = useState(transaction.note || "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Logged in user info + token
  const { user, token, logout, updateToken } = useAuth();
  console.log("User: ", user);

  // Extract the transaction ID from the user object
  const transactionId = transaction?._id;

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
      // Send a PUT request to the backend to update the data + JWT

      const res = await fetchWithRefresh(
        (newToken) => {
          const finalToken = newToken || token;
          return axios.put(
            `${API_URL}/transactions/${transactionId}`,
            {
              type: transactionType,
              amount: parseFloat(transactionAmount),
              category: transactionCategory,
              date: transactionDate.toISOString(),
              note: transactionNote
            },
            {
              headers: { Authorization: `Bearer ${finalToken}` }
            }
          );
        },
        logout,
        updateToken
      );

      if (res.status === 200) {
        // Dispatch the update to the global states
        dispatch({ type: "UPDATE_TRANSACTION", payload: res.data.transaction });
        console.log("After UPDATE_TRANSACTION: ", res.data.transaction);

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

      // Send a DELETE request to the backend + JWT
      console.log(`${API_URL}/transactions/${transactionId}`);
      const res = await fetchWithRefresh(
        (newToken) => {
          const finalToken = newToken || token;
          return axios.delete(
            `${API_URL}/transactions/${transactionId}`,
            {
              headers: { Authorization: `Bearer ${finalToken}` }
            }
          )
        },
        logout,
        updateToken
      );

      if (res.status === 200) {
        // Remove this line once the global states have been fully implemented
        route.params?.onUpdate?.({ deletedId: transactionId });

        // Dispatch the deletion to the global states
        dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
        console.log("Deleted ID with DELETE_TRANSACTION: ", transactionId);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TransactionDetails;
