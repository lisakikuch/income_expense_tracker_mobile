import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from '@env';

// Custom components
import MonthPickerModal from "../../components/MonthPickerModal";
import TransactionTypeToggle from "../../components/TransactionTypeToggle";

// npm packages
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

// Constants for Dropdown
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES
} from "../../constants/categories";

// Styling
import styles from "./TransactionList.styles";

const TransactionList = ({ navigation, route }) => {

  // Logged in user's info + jwt
  const { user, token } = useAuth();
  console.log("User: ", user);
  console.log("Token: ", token);

  // If there's a selectedUserId passed through navigation, use that. 
  // If not, use the currently logged-in user’s ID.
  const userId = route.params?.selectedUserId || user?._id;
  console.log("userId: ", userId);

  // Get a current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const defaultMonth = `${currentYear}-${currentMonth}`;

  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Expense");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionMonth, setTransactionMonth] = useState(defaultMonth);
  const [isLoading, setIsLoading] = useState(false);

  // Month Selector
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTransactionMonth(selectedMonth);
  }, [selectedMonth]);

  // Dropdown menu
  const formattedIncomeCategories = [
    { label: "All", value: "" },
    ...INCOME_CATEGORIES.map((item) => ({
      label: item,
      value: item
    })),
  ];

  const formattedExpenseCategories = [
    { label: "All", value: "" },
    ...EXPENSE_CATEGORIES.map((item) => ({
      label: item,
      value: item
    })),
  ];

  // Re-fetch when returning from another screen to ensure data stay in sync with the backend
  // or dependencies change
  useFocusEffect(
    useCallback(() => {
      const fetchTransactionData = async () => {
        try {
          setIsLoading(true);

          // Send a GET request to get transaction data associated with the user by type + month wtih JWT
          const res = await axios.get(`${API_URL}/transactions`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              type: transactionType,
              month: transactionMonth,
              category: transactionCategory,
              userID: userId,
            }
          });

          // Save the fetched transaction data
          setTransactions(res.data);
          console.log(res.data);
        } catch (err) {
          console.error("Error while fetching transaction data: ", err);
        } finally {
          setIsLoading(false);
        }
      };
      if (userId && token) {
        fetchTransactionData();
      }
    }, [transactionType, transactionMonth, transactionCategory, userId, token])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.subHeader}>{transactionType}</Text>

        {/* Month Selector */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.calendarButton}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.monthText}>{selectedMonth}</Text>
        </TouchableOpacity>

        <MonthPickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={(month) => {
            setSelectedMonth(month);
            setModalVisible(false);
          }}
          selected={selectedMonth}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : transactions.length === 0 ? (
        <View>
          <Dropdown
            style={styles.input}
            data={transactionType === "Income" ? formattedIncomeCategories : formattedExpenseCategories}
            labelField="label"
            valueField="value"
            value={transactionCategory}
            onChange={(item) => setTransactionCategory(item.value)}
          />
          <Text style={styles.noDataText}>No Transaction Data to Show</Text>
        </View>
      ) : (
        <View style={styles.contentArea}>
          <Dropdown
            style={styles.input}
            placeholder="Select Category"
            data={transactionType === "Income" ? formattedIncomeCategories : formattedExpenseCategories}
            labelField="label"
            valueField="value"
            value={transactionCategory}
            onChange={(item) => setTransactionCategory(item.value)}
          />
          <FlatList
            style={styles.transactionList}
            data={transactions}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={({ item }) => (
              <View style={styles.transactionCard}>
                <View style={styles.transactionRow}>
                  <View>
                    <Text style={styles.transactionDate}>
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                    <Text>{item.category}</Text>
                    {item.note ? <Text>{item.note}</Text> : null}
                    <Text>${item.amount.toFixed(2)}</Text>
                  </View>
                  {userId === user._id && (
                    <TouchableOpacity
                      style={styles.editButton}
                      // Navigate to TransactionDetails screen with the selected item object
                      onPress={() => {
                        navigation.navigate("TransactionDetails", {
                          transaction: item,
                          // Update UI as soon as the value in TransactionDetails is updated
                          onUpdate: (payload) => {
                            if (payload.deletedId) {
                              setTransactions((prev) =>
                                prev.filter((txn) => txn._id !== payload.deletedId)
                              );
                            } else {
                              setTransactions((prev) =>
                                prev.map((txn) =>
                                  txn._id === payload._id ? payload : txn
                                )
                              );
                            }
                          },
                        });
                      }}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      )
      }

      {/* Income/Expense Toggle Button */}
      <TransactionTypeToggle
        selectedType={transactionType}
        onSelect={(type) => {
          setTransactionType(type);
          setTransactionCategory("");
        }}
      />

    </View>
  );
};

export default TransactionList;
