import React, { useState, useEffect } from "react";
// import {useContext} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
// import { TransactionContext } from "../../contexts/TransactionContext";
import { useTransaction } from "../../contexts/TransactionContext";

// Custom components
import MonthPickerModal from "../../components/MonthPickerModal";
import TransactionTypeToggle from "../../components/TransactionTypeToggle";

// npm packages
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";

// Constants for Dropdown menu items
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES
} from "../../constants/categories";

// Styling
import styles from "./TransactionList.styles";

const TransactionList = ({ navigation, route }) => {

  // Logged in user's info + jwt
  const { user } = useAuth();
  console.log("User: ", user);

  // If there's a selectedUserId passed through navigation, use that. 
  // If not, use the currently logged-in user’s ID.
  const userId = route.params?.selectedUserId || user?._id;
  console.log("userId: ", userId);

  // Global states
  // const { state, dispatch } = useContext(TransactionContext);
  const { state, dispatch } = useTransaction();
  const {
    transactions,
    transactionType,
    transactionMonth,
    isLoading
  } = state;

  // Local states
  const [transactionCategory, setTransactionCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Filter transaction data by category
  const filteredTransactions = transactions.filter(transaction =>
    transactionCategory ? transaction.category === transactionCategory : true
  );

  // Category dropdown menu
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

  // Reset category when transactionType changes
  useEffect(() => {
    setTransactionCategory("");
  }, [transactionType]);

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
          <Text style={styles.monthText}>{transactionMonth}</Text>
        </TouchableOpacity>

        <MonthPickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={(month) => {
            dispatch({ type: "SET_TRANSACTION_MONTH", payload: month });
            setModalVisible(false);
          }}
          selected={transactionMonth}
        />
      </View>

      {/* Category dropdown */}
      {isLoading ? (
        <ActivityIndicator />
      ) : filteredTransactions.length === 0 ? (
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

          {/* Transaction list */}
          <FlatList
            style={styles.transactionList}
            data={filteredTransactions}
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
          dispatch({ type: "SET_TRANSACTION_TYPE", payload: type });
          setTransactionCategory("");
        }}
      />

    </View>
  );
};

export default TransactionList;
