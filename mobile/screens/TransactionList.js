import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const transactions = [
  { date: "09/21/2025", category: "Transportation", description: "TTC Monthly Pass", amount: "$128.15" },
  { date: "09/20/2025", category: "Eating Out", description: "Dinner", amount: "$5.25" },
  { date: "09/19/2025", category: "Grocery", description: "Groceries", amount: "$15.99" },
  { date: "09/18/2025", category: "Entertainment & Leisure", description: "Trip to Mexico", amount: "$3,000" },
  { date: "09/17/2025", category: "Medical", description: "Doctor’s consultant fee", amount: "$120.49" },
  { date: "09/17/2023", category: "Eating Out", description: "Lunch", amount: "$50.00" },
  { date: "09/17/2025", category: "Grocery", description: "Snacks", amount: "$30.00" },
];

const months = [
  "January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025",
  "July 2025", "August 2025", "September 2025", "October 2025", "November 2025", "December 2025"
];

const TransactionList = () => {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState("September 2025");
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToEdit = ({ navigation }) => {
    navigation.navigate("TransactionDetails", { transaction });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.subHeader}>Transactions for {selectedMonth}</Text>

      {/* Month Selector */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.calendarButton}
      >
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text style={styles.monthText}>{selectedMonth}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.transactionList}>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionCard}>
            <Text style={styles.transactionDate}>
              {transaction.date} - {transaction.category}
            </Text>
            <Text style={styles.transactionDetails}>
              {transaction.description} - {transaction.amount}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("TransactionDetails")}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
    padding: 20,
    backgroundColor: "#F8F9FA",
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
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  monthText: {
    fontSize: 16,
    marginLeft: 5,
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
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  transactionDate: {
    fontWeight: "bold",
  },
  transactionDetails: {
    color: "#666",
    marginBottom: 5,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#4A90E2",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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

export default TransactionList;
