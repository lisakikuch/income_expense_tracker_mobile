import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "@env";
import globalStyles from "../shared/GlobalStyles";

// Arrays for month names and year range
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

const ReportScreen = () => {
  const { user, token } = useAuth();
  const userId = user?._id;

  const [selectedMonthDate, setSelectedMonthDate] = useState(new Date());
  const [transactionMonth, setTransactionMonth] = useState("");
  const [transactionType, setTransactionType] = useState("Expense");
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Convert selected date to backend-friendly format (e.g. "2025-4")
  useEffect(() => {
    const year = selectedMonthDate.getFullYear();
    const month = selectedMonthDate.getMonth() + 1;
    setTransactionMonth(`${year}-${month}`);
  }, [selectedMonthDate]);

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/transactions?type=${transactionType}&month=${transactionMonth}&userID=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;
        setTransactions(data);

        // Group data by category
        const grouped = {};
        let total = 0;
        data.forEach((tx) => {
          const category = tx.category;
          grouped[category] = (grouped[category] || 0) + tx.amount;
          total += tx.amount;
        });

        // Format for PieChart
        const colors = [
          "#4A90E2",
          "#F28B82",
          "#34A853",
          "#FFB74D",
          "#A67EBF",
          "#FFD700",
        ];
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

    if (userId && token && transactionMonth) {
      fetchTransactionData();
    }
  }, [transactionType, transactionMonth, userId, token]);

  // Toggle calendar dropdown
  const toggleMonthPicker = () => setShowMonthPicker((prev) => !prev);

  // Set selected month
  const handleMonthChange = (monthIndex) => {
    const updated = new Date(selectedMonthDate);
    updated.setMonth(monthIndex);
    setSelectedMonthDate(updated);
    setShowMonthPicker(false);
  };

  // Set selected year
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
      {/* Month Picker Button */}
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

      {/* Month-Year Dropdown UI */}
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

      {/* Total Summary Box */}
      <View style={globalStyles.totalContainer}>
        <View style={globalStyles.totalBox}>
          <Text style={globalStyles.totalLabel}>
            {transactionType === "Expense" ? "Total Expense" : "Total Income"}
          </Text>
          <Text
            style={
              transactionType === "Expense"
                ? globalStyles.expenseAmount
                : globalStyles.incomeAmount
            }
          >
            {transactionType === "Expense"
              ? `- $${totalAmount.toFixed(2)}`
              : `+ $${totalAmount.toFixed(2)}`}
          </Text>
        </View>
      </View>

      {/* Pie Chart & Breakdown */}
      {pieData.length > 0 ? (
        <>
          <View style={globalStyles.chartContainer}>
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

          {/* Category Breakdown */}
          <View style={{ marginTop: 10 }}>
            {pieData.map((item, index) => (
              <View key={index} style={globalStyles.breakdownRow}>
                <View style={globalStyles.breakdownLabel}>
                  <View
                    style={[
                      globalStyles.colorDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={globalStyles.breakdownText}>{item.name}</Text>
                </View>
                <Text style={globalStyles.breakdownText}>
                  ${item.amount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          No data available for this selection.
        </Text>
      )}
    </ScrollView>
  );
};

export default ReportScreen;