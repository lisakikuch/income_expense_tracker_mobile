import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const transactions = [
  { date: "09/21/2025", category: "Transportation", details: "TTC Monthly Pass: $128.15" },
  { date: "09/20/2025", category: "Eating Out", details: "$5.25" },
  { date: "09/19/2025", category: "Grocery", details: "$15.99" },
  { date: "09/18/2025", category: "Entertainment & Leisure", details: "Trip to Mexico: $3,000" },
  { date: "09/17/2025", category: "Medical", details: "Doctor’s consultant fee: $120.49" },
  { date: "09/17/2023", category: "Eating Out", details: "$50.00" },
  { date: "09/17/2025", category: "Grocery", details: "$30.00" },
];

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <Text style={styles.subHeader}>September 2025</Text>
      
      <ScrollView style={styles.transactionList}>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionCard}>
            <Text style={styles.transactionDate}>{transaction.date} - {transaction.category}</Text>
            <Text style={styles.transactionDetails}>{transaction.details}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.expenseButton}><Text style={styles.filterText}>Expense</Text></TouchableOpacity>
        <TouchableOpacity style={styles.incomeButton}><Text style={styles.filterText}>Income</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  transactionList: {
    marginBottom: 20,
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  transactionDate: {
    fontWeight: "bold",
  },
  transactionDetails: {
    color: "#666",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#6a5acd",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 10,
  },
  expenseButton: {
    backgroundColor: "#8884d8",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  incomeButton: {
    backgroundColor: "#6a5acd",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  filterText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TransactionList;
