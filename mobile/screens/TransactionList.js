import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "@env";
import globalStyles from "../shared/GlobalStyles";

// Month/year picker options
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = [2023, 2024, 2025, 2026, 2027];

const TransactionList = ({ navigation }) => {
  const { user, token } = useAuth();
  const userId = user?._id;

  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Expense");
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date());
  const [transactionMonth, setTransactionMonth] = useState("");
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Convert selected date → "YYYY-M" format
  useEffect(() => {
    const year = selectedMonthDate.getFullYear();
    const month = selectedMonthDate.getMonth() + 1;
    setTransactionMonth(`${year}-${month}`);
  }, [selectedMonthDate]);

  // Fetch transactions on focus or filter change
  useFocusEffect(
    useCallback(() => {
      const fetchTransactionData = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(
            `${API_URL}/transactions?type=${transactionType}&month=${transactionMonth}&userID=${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setTransactions(res.data);
        } catch (err) {
          console.error("Error fetching transactions:", err);
        } finally {
          setIsLoading(false);
        }
      };

      if (userId && token && transactionMonth) {
        fetchTransactionData();
      }
    }, [transactionType, transactionMonth, userId, token])
  );

  // Month/year picker toggle
  const toggleMonthPicker = () => setShowMonthPicker((prev) => !prev);

  const handleMonthChange = (index) => {
    const updated = new Date(selectedMonthDate);
    updated.setMonth(index);
    setSelectedMonthDate(updated);
    setShowMonthPicker(false);
  };

  const handleYearChange = (year) => {
    const updated = new Date(selectedMonthDate);
    updated.setFullYear(year);
    setSelectedMonthDate(updated);
  };

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Calendar Picker Button */}
      <TouchableOpacity
        onPress={toggleMonthPicker}
        style={globalStyles.calendarButton}
      >
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text style={globalStyles.monthText}>
          {MONTH_NAMES[selectedMonthDate.getMonth()]}{" "}
          {selectedMonthDate.getFullYear()}
        </Text>
      </TouchableOpacity>

      {/* Month Picker */}
      {showMonthPicker && (
        <View style={globalStyles.pickerContainer}>
          <View style={globalStyles.monthGrid}>
            {MONTH_NAMES.map((name, index) => (
              <TouchableOpacity
                key={name}
                onPress={() => handleMonthChange(index)}
              >
                <Text
                  style={[
                    globalStyles.pickerItem,
                    selectedMonthDate.getMonth() === index &&
                      globalStyles.activeItem,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={globalStyles.yearRow}>
            {YEARS.map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => handleYearChange(year)}
              >
                <Text
                  style={[
                    globalStyles.pickerItem,
                    selectedMonthDate.getFullYear() === year &&
                      globalStyles.activeItem,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Expense/Income Toggle */}
      <View style={globalStyles.toggleContainer}>
        <TouchableOpacity
          style={[
            globalStyles.toggleButton,
            transactionType === "Expense" && globalStyles.activeButton,
          ]}
          onPress={() => setTransactionType("Expense")}
        >
          <Text
            style={[
              globalStyles.toggleText,
              transactionType === "Expense" && globalStyles.activeText,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.toggleButton,
            transactionType === "Income" && globalStyles.activeButton,
          ]}
          onPress={() => setTransactionType("Income")}
        >
          <Text
            style={[
              globalStyles.toggleText,
              transactionType === "Income" && globalStyles.activeText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      {isLoading ? (
        <ActivityIndicator />
      ) : transactions.length === 0 ? (
        <Text>No Transaction Data</Text>
      ) : (
        transactions.map((item) => (
          <View key={item._id} style={globalStyles.transactionCard}>
            <View style={globalStyles.transactionRow}>
              <View>
                <Text style={globalStyles.transactionDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text>{item.category}</Text>
                {item.note && <Text>{item.note}</Text>}
                <Text>${item.amount.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={globalStyles.editButton}
                onPress={() => {
                  navigation.navigate("TransactionDetails", {
                    transaction: item,
                    onUpdate: (payload) => {
                      if (payload.deletedId) {
                        setTransactions((prev) =>
                          prev.filter((t) => t._id !== payload.deletedId)
                        );
                      } else {
                        setTransactions((prev) =>
                          prev.map((t) => (t._id === payload._id ? payload : t))
                        );
                      }
                    },
                  });
                }}
              >
                <Text style={globalStyles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default TransactionList;
