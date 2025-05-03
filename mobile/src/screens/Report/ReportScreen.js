import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// npm packages
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

// Context
import { TransactionContext } from "../../contexts/TransactionContext";

// Custom components
import MonthPickerModal from "../../components/MonthPickerModal";
import TransactionTypeToggle from "../../components/TransactionTypeToggle";

// Styling
import styles from "./Report.styles";

const ReportScreen = () => {

  // Global states
  const { state, dispatch } = useContext(TransactionContext);
  const {
    transactions,
    transactionType,
    transactionMonth,
    isLoading
  } = state;

  // Local states
  const [pieData, setPieData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Group transactions by category and calculate totals
  useEffect(() => {
    const grouped = {};
    let total = 0;
    transactions.forEach((transaction) => {
      const category = transaction.category;
      grouped[category] = (grouped[category] || 0) + transaction.amount;
      total += transaction.amount;
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
  }, [transactions]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      <View style={styles.headerContainer}>
      <Text style={styles.subHeader}>{transactionType}</Text>
        {/*Month Selector */}
        <TouchableOpacity
          onPress={() => setShowMonthPicker(true)}
          style={styles.calendarButton}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.monthText}>{transactionMonth}</Text>
        </TouchableOpacity>

        <MonthPickerModal
          visible={showMonthPicker}
          selected={transactionMonth}
          onClose={() => setShowMonthPicker(false)}
          onSelect={(month) => {
            dispatch({ type: "SET_TRANSACTION_MONTH", payload: month });
            setShowMonthPicker(false);
          }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
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
        </>
      )}

      {/* Income/Expense Toggle Button */}
      <TransactionTypeToggle
        selectedType={transactionType}
        onSelect={(type) => dispatch({ type: "SET_TRANSACTION_TYPE", payload: type })}
      />
    </ScrollView>
  );
};

export default ReportScreen;