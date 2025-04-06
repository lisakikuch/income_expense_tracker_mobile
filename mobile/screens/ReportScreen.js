import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from '@env';

const ReportScreen = () => {

  // Save fetched transaction data
  const [transactions, setTransactions] = useState([]);

  // Switch between Expense/Income
  const [transactionType, setTransactionType] = useState("Expense");

  // Set a month (e.g. 2025-3)
  const [transactionMonth, setTransactionMonth] = useState("2025-3");

  // Logged in user's info + jwt
  const { user, token } = useAuth();
  console.log("User: ", user);
  console.log("Token: ", token);
  // The user object could look like this
  // {
  //   "_id": "662aaa57f0b2d2329c4107d3",
  //   "email": "lisa@example.com",
  //   "password": "...", 
  //   "role": "User",
  //   "createdAt": "...",
  //   "updatedAt": "..."
  // }

  // Extract the user ID from the user object above
  const userId = user?._id;

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        // Send a GET request to get transaction data associated with the user by type + month
        const res = await axios.get(
          `${API_URL}/transactions?type=${transactionType}&month=${transactionMonth}&userID=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Save the fetched transaction data
        setTransactions(res.data);
        console.log(res.data);
        // The fetched data could look like this
        // {
        //   _id: 67d8facb713752ccf9113cbd
        //   userID: 67d8f73e740cdbf73a2edc9c
        //   type: "Income"
        //   amount: 5000
        //   category: "Salary"
        //   date: 2025-03-05T00:00:00.000 +00:00
        //   note: "Monthly salary"
        //   createdAt: 2025-03 - 18T04: 47:07.641 +00:00
        //   updatedAt: 2025-03 - 18T04: 47:07.641 +00:00
        // }

      } catch (err) {
        console.error("Error while fetching transaction data: ", err);
      }
    };
    if (userId && token) {
      fetchTransactionData();
    }
  }, [transactionType, transactionMonth, userId, token]);

  return (
    <View>
      {/* Once the data is fetched from the backend, here’s what we want to do:

      - Switch data using filters
        When the user changes the transaction type (Expense / Income) or selects a different month, 
        send a new GET request to update the chart and numbers:
        /transactions?type=Income&month=2025-09&userID=<id>

      - Group data by category
        Take the list of transactions and group them by category
        For each category, sum the amounts → this becomes the pie chart data
        
      - Calculate total amount
        Add up all the amounts in the transaction list
        Display it as the total (e.g. −$1,500 for expenses) */}
    </View>
  );

  //////////////////////////////////////////////////////////////

  // const [viewType, setViewType] = useState("Expense");
  // const [selectedMonth, setSelectedMonth] = useState("September 2025");
  // const [modalVisible, setModalVisible] = useState(false);

  // const months = [
  //   "January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025",
  //   "July 2025", "August 2025", "September 2025", "October 2025", "November 2025", "December 2025"
  // ];

  // const totalIncome = 3000;
  // const totalExpense = 1500;

  // const expenseData = [
  //   { name: "Education", amount: 300, color: "#4A90E2", legendFontColor: "black", legendFontSize: 14 },
  //   { name: "Eating-out", amount: 500, color: "#F28B82", legendFontColor: "black", legendFontSize: 14 },
  //   { name: "Medical", amount: 700, color: "#34A853", legendFontColor: "black", legendFontSize: 14 },
  // ];

  // const incomeData = [
  //   { name: "Salary", amount: 2500, color: "#4A90E2", legendFontColor: "black", legendFontSize: 14 },
  //   { name: "Other", amount: 500, color: "#A67EBF", legendFontColor: "black", legendFontSize: 14 },
  // ];

  // return (
  //   <View style={styles.container}>
  //     {/* Month Selector */}
  //     <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.calendarButton}>
  //       <Ionicons name="calendar-outline" size={24} color="black" />
  //       <Text style={styles.monthText}>{selectedMonth}</Text>
  //     </TouchableOpacity>

  //     {/* Total Income/Expense */}
  //     <View style={styles.totalContainer}>
  //       <View style={styles.totalBox}>
  //         <Text style={styles.totalLabel}>
  //           {viewType === "Expense" ? "Total Expense" : "Total Income"}
  //         </Text>
  //         <Text style={viewType === "Expense" ? styles.expenseAmount : styles.incomeAmount}>
  //           {viewType === "Expense" ? `- $${totalExpense.toFixed(2)}` : `+ $${totalIncome.toFixed(2)}`}
  //         </Text>
  //       </View>
  //     </View>

  //     {/* Pie Chart */}
  //     <View style={styles.chartContainer}>
  //       <PieChart
  //         data={viewType === "Expense" ? expenseData : incomeData}
  //         width={350}
  //         height={220}
  //         chartConfig={{
  //           backgroundColor: "#fff",
  //           backgroundGradientFrom: "#fff",
  //           backgroundGradientTo: "#fff",
  //           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //         }}
  //         accessor="amount"
  //         backgroundColor="transparent"
  //         paddingLeft="15"
  //       />
  //     </View>

  //     {/* Expense and Income Toggle */}
  //     <View style={styles.toggleContainer}>
  //       <TouchableOpacity
  //         style={[styles.toggleButton, viewType === "Expense" && styles.activeButton]}
  //         onPress={() => setViewType("Expense")}
  //       >
  //         <Text style={[styles.toggleText, viewType === "Expense" && styles.activeText]}>Expense</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={[styles.toggleButton, viewType === "Income" && styles.activeButton]}
  //         onPress={() => setViewType("Income")}
  //       >
  //         <Text style={[styles.toggleText, viewType === "Income" && styles.activeText]}>Income</Text>
  //       </TouchableOpacity>
  //     </View>

  //     {/* Month Selector Modal */}
  //     <Modal visible={modalVisible} animationType="slide" transparent={true}>
  //       <View style={styles.modalContainer}>
  //         <View style={styles.modalContent}>
  //           <Text style={styles.modalTitle}>Select a Month</Text>
  //           <FlatList
  //             data={months}
  //             keyExtractor={(item) => item}
  //             renderItem={({ item }) => (
  //               <TouchableOpacity
  //                 style={styles.monthOption}
  //                 onPress={() => {
  //                   setSelectedMonth(item);
  //                   setModalVisible(false);
  //                 }}
  //               >
  //                 <Text style={styles.monthOptionText}>{item}</Text>
  //               </TouchableOpacity>
  //             )}
  //           />
  //           <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
  //             <Text style={styles.cancelText}>Cancel</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    padding: 15,
    backgroundColor: "#6a5acd",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
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
  chartContainer: {
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  monthOption: {
    padding: 15,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "red",
    textAlign: "center",
  },
});

export default ReportScreen;
