import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "@env";

import styles from "./Report.styles";

// Array list for month and year selection
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const YEARS = [2023, 2024, 2025, 2026, 2027]; // Expandable

const ReportScreen = () => {

  // Authentication context
  const { user, token } = useAuth();
  const userId = user?._id;

  // State for selected month/year as Date
  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date());

  // Backend format "YYYY-MM" (e.g., "2025-4")
  const [transactionMonth, setTransactionMonth] = useState("");

  // Toggle between "Expense" and "Income"
  const [transactionType, setTransactionType] = useState("Expense");

  // State for fetched transactions
  const [transactions, setTransactions] = useState([]);

  // Processed data for pie chart
  const [pieData, setPieData] = useState([]);

  // Total amount for the selected month/type
  const [totalAmount, setTotalAmount] = useState(0);

  // Toggle custom dropdown
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // When user selects new month/year, update backend-friendly string
  useEffect(() => {
    const year = selectedMonthDate.getFullYear();
    const month = selectedMonthDate.getMonth() + 1;
    setTransactionMonth(`${year}-${month}`);
  }, [selectedMonthDate]);

  // Fetch transactions and generate pie data
  const fetchTransactionData = async () => {
    try {
      const res = await axios.get(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          type: transactionType,
          month: transactionMonth,
          userID: userId
        }
      });

      const data = res.data;
      setTransactions(data);

      // Group transactions by category and calculate totals
      const grouped = {};
      let total = 0;
      data.forEach((tx) => {
        const category = tx.category;
        grouped[category] = (grouped[category] || 0) + tx.amount;
        total += tx.amount;
      });

      // Format for pie chart
      const colors = ["#4A90E2", "#F28B82", "#34A853", "#FFB74D", "#A67EBF", "#FFD700"];
      const pie = Object.keys(grouped).map((category, index) => ({
        name: category,
        amount: grouped[category],
        color: colors[index % colors.length],
        legendFontColor: "black",
        legendFontSize: 14,
      }));

      setPieData(pie);
      setTotalAmount(total);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Fetch data when filters change
  useEffect(() => {
    if (userId && token && transactionMonth) {
      fetchTransactionData();
    }
  }, [transactionType, transactionMonth, userId, token]);

  // Toggle month picker UI
  const toggleMonthPicker = () => setShowMonthPicker((prev) => !prev);

  // Handle month change from picker
  const handleMonthChange = (monthIndex) => {
    const updated = new Date(selectedMonthDate);
    updated.setMonth(monthIndex);
    setSelectedMonthDate(updated);
    setShowMonthPicker(false);
  };

  // Handle year change from picker
  const handleYearChange = (year) => {
    const updated = new Date(selectedMonthDate);
    updated.setFullYear(year);
    setSelectedMonthDate(updated);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      <View style={styles.headerContainer}>

        {/* Refresh Button */}
        <TouchableOpacity onPress={fetchTransactionData} style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#4A90E2" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>


        {/* Month/Year Picker Toggle button */}
        <TouchableOpacity onPress={toggleMonthPicker} style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.monthText}>
            {MONTH_NAMES[selectedMonthDate.getMonth()]} {selectedMonthDate.getFullYear()}
          </Text>
        </TouchableOpacity>

      </View>

      {/* Custom Month/Year Dropdown Picker UI */}
      {showMonthPicker && (
        <View style={styles.pickerContainer}>
          {/* Months */}
          <View style={styles.monthGrid}>
            {MONTH_NAMES.map((name, index) => (
              <TouchableOpacity key={name} onPress={() => handleMonthChange(index)}>
                <Text style={[
                  styles.pickerItem,
                  selectedMonthDate.getMonth() === index && styles.activeItem,
                ]}>
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Years */}
          <View style={styles.yearRow}>
            {YEARS.map((year) => (
              <TouchableOpacity key={year} onPress={() => handleYearChange(year)}>
                <Text style={[
                  styles.pickerItem,
                  selectedMonthDate.getFullYear() === year && styles.activeItem,
                ]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Summary Box */}
      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>
            {transactionType === "Expense" ? "Total Expense" : "Total Income"}
          </Text>
          <Text style={transactionType === "Expense" ? styles.expenseAmount : styles.incomeAmount}>
            {transactionType === "Expense"
              ? `- $${totalAmount.toFixed(2)}`
              : `+ $${totalAmount.toFixed(2)}`}
          </Text>
        </View>
      </View>

      {/* Chart and Category Breakdown */}
      {pieData.length > 0 ? (
        <>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              width={350}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* Category Breakdown Text */}
          <View style={{ marginTop: 10 }}>
            {pieData.map((item, index) => (
              <View key={index} style={styles.breakdownRow}>
                <View style={styles.breakdownLabel}>
                  <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                  <Text style={styles.breakdownText}>{item.name}</Text>
                </View>
                <Text style={styles.breakdownText}>${item.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          No data available for this selection.
        </Text>
      )}
      {/* Income/Expense Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, transactionType === "Expense" && styles.activeButton]}
          onPress={() => setTransactionType("Expense")}
        >
          <Text style={[
            styles.toggleText,
            transactionType === "Expense" && styles.activeText,
          ]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, transactionType === "Income" && styles.activeButton]}
          onPress={() => setTransactionType("Income")}
        >
          <Text style={[
            styles.toggleText,
            transactionType === "Income" && styles.activeText,
          ]}>
            Income
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ReportScreen;