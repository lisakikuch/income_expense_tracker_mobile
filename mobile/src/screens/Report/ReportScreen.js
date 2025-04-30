import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// npm packages
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "@env";

// Custom components
import MonthPickerModal from "../../components/MonthPickerModal";
import TransactionTypeToggle from "../../components/TransactionTypeToggle";

// Styling
import styles from "./Report.styles";

const ReportScreen = () => {

  // Authentication context
  const { user, token } = useAuth();
  const userId = user?._id;

  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [transactionMonth, setTransactionMonth] = useState(defaultMonth);

  // Toggle between "Expense" and "Income"
  const [transactionType, setTransactionType] = useState("Expense");

  // State for fetched transactions
  const [transactions, setTransactions] = useState([]);

  // Processed data for pie chart
  const [pieData, setPieData] = useState([]);

  // Total amount for the selected month/type
  const [totalAmount, setTotalAmount] = useState(0);

  // Toggle dropdown
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  useEffect(() => {
    setTransactionMonth(selectedMonth);
  }, [selectedMonth]);

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      <View style={styles.headerContainer}>

        {/* Refresh Button */}
        <TouchableOpacity onPress={fetchTransactionData} style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#4A90E2" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>

        {/*Month Selector */}
        <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.monthText}>{selectedMonth}</Text>
        </TouchableOpacity>

        <MonthPickerModal
          visible={showMonthPicker}
          selected={selectedMonth}
          onClose={() => setShowMonthPicker(false)}
          onSelect={(month) => {
            setSelectedMonth(month);
            setShowMonthPicker(false);
          }}
        />
      </View>

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
      {/* Income/Expense Toggle Button */}
      <TransactionTypeToggle
        selectedType={transactionType}
        onSelect={(type) => setTransactionType(type)}
      />
    </ScrollView>
  );
};

export default ReportScreen;