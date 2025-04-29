import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from '@env';

import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

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

  // Calendar
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const defaultMonth = `${currentYear}-${currentMonth}`;

  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Expense");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionMonth, setTransactionMonth] = useState(defaultMonth);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [modalVisible, setModalVisible] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => `${currentYear}-${i + 1}`);

  useEffect(() => {
    setTransactionMonth(selectedMonth);
  }, [selectedMonth]);

  // Dropdown menu
  const INCOMECATEGORIES = [
    "All",
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
    value: item === "All" ? "" : item
  }));

  const EXPENSECATEGORIES = [
    "All",
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
    value: item === "All" ? "" : item
  }));

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

        {/* Month Selector Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Month</Text>
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.monthOption}
                    onPress={() => {
                      setSelectedMonth(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.monthOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            transactionType === "Expense" && styles.activeButton,
          ]}
          onPress={() => {
            setTransactionType("Expense")
            setTransactionCategory("")
          }}
        >
          <Text
            style={[
              styles.toggleText,
              transactionType === "Expense" && styles.activeText,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            transactionType === "Income" && styles.activeButton,
          ]}
          onPress={() => {
            setTransactionType("Income")
            setTransactionCategory("")
          }}
        >
          <Text
            style={[
              styles.toggleText,
              transactionType === "Income" && styles.activeText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionList;
