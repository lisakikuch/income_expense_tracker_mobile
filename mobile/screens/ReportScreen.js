import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from '@env';

const ReportScreen = () => {
  // Get the logged in user object and token from AuthContext.js
  const { user, token } = useAuth();
  const userId = user?._id;

  // Store all transactions returned from the backend API
  const [transactions, setTransactions] = useState([]);

  // Used to filter the type of transaction (Expense or Income)
  const [transactionType, setTransactionType] = useState("Expense");

  // Backend friendly format (e.g., "2025-3") used in the API query
  const [transactionMonth, setTransactionMonth] = useState("2025-3");

  // User friendly format shown in the UI (e.g., "September 2025")
  const [selectedMonth, setSelectedMonth] = useState("September 2025");

  // Modal visibility for month selection
  const [modalVisible, setModalVisible] = useState(false);

  // Pie chart data formatted from grouped transaction data
  const [pieData, setPieData] = useState([]);

  // Sum of all transaction amounts (per filter)
  const [totalAmount, setTotalAmount] = useState(0);

  // List of selectable months (static)
  const months = [
    "January 2025",
    "February 2025",
    "March 2025",
    "April 2025",
    "May 2025",
    "June 2025",
    "July 2025",
    "August 2025",
    "September 2025",
    "October 2025",
    "November 2025",
    "December 2025",
  ];

  // Whenever the user selects a new month from the modal,
  // convert it into a backend-compatible format and update state
  useEffect(() => {
    const index = months.indexOf(selectedMonth) + 1; // Convert month name to index
    setTransactionMonth(`2025-${index}`); // Set format like "2025-3"
  }, [selectedMonth]);

  // Fetch transaction data from backend when user or filter changes
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        // GET request to backend API with filters: type, month, and user ID
        const res = await axios.get(
          `${API_URL}/transactions?type=${transactionType}&month=${transactionMonth}&userID=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;
        setTransactions(data);

        // Group transactions by category and calculate total amount
        const grouped = {};
        let total = 0;

        data.forEach((tx) => {
          const category = tx.category;
          if (!grouped[category]) {
            grouped[category] = 0;
          }
          grouped[category] += tx.amount;
          total += tx.amount;
        });

        // Convert grouped data into pie chart format
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
        console.error("Error while fetching transaction data: ", err);
      }
    };

    if (userId && token) {
      fetchTransactionData();
    }
  }, [transactionType, transactionMonth, userId, token]);

  return (
    <View style={styles.container}>
      {/* Button to trigger month selection modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.calendarButton}
      >
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text style={styles.monthText}>{selectedMonth}</Text>
      </TouchableOpacity>

      {/* Display total Income or Expense based on selected type */}
      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>
            {transactionType === "Expense" ? "Total Expense" : "Total Income"}
          </Text>
          <Text
            style={
              transactionType === "Expense"
                ? styles.expenseAmount
                : styles.incomeAmount
            }
          >
            {transactionType === "Expense"
              ? `- $${totalAmount.toFixed(2)}`
              : `+ $${totalAmount.toFixed(2)}`}
          </Text>
        </View>
      </View>

      {/* Render pie chart if there is data, otherwise show fallback text */}
      {pieData.length > 0 ? (
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
      ) : (
        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          No data available for this selection.
        </Text>
      )}

      {/* Toggle buttons to switch between Income and Expense */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            transactionType === "Expense" && styles.activeButton,
          ]}
          onPress={() => setTransactionType("Expense")}
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
          onPress={() => setTransactionType("Income")}
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

      {/* Modal window to pick a different month */}
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
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  monthText: {
    fontSize: 16,
    marginLeft: 5,
  },
  totalContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  totalBox: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expenseAmount: {
    fontSize: 24,
    color: "#E57373",
  },
  incomeAmount: {
    fontSize: 24,
    color: "#4CAF50",
  },
  chartContainer: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  toggleButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4A90E2",
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#6a5acd",
  },
  toggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  monthOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
    alignItems: "center",
  },
  monthOptionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});

export default ReportScreen;