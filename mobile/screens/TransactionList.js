import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from '@env';

import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const TransactionList = ({ navigation }) => {

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

  // Extract the user ID from the user object above
  const userId = user?._id;

  // Display activity indicator while loading
  const [isLoading, setIsLoading] = useState(false);

  // Month Picker
  const months = [
    "January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025",
    "July 2025", "August 2025", "September 2025", "October 2025", "November 2025", "December 2025"
  ];
  const [selectedMonth, setSelectedMonth] = useState("September 2025");
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchTransactionData = async () => {
        try {

          setIsLoading(true);

          // Send a GET request to get transaction data associated with the user by type + month
          const res = await axios.get(
            `${API_URL}/transactions?type=${transactionType}&month=${transactionMonth}&userID=${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Save the fetched transaction data
          setTransactions(res.data);
          console.log(res.data);

        } catch (err) {
          console.error("Error while fetching transaction data: ", err);

        } finally {
          setIsLoading(false);
        }
      };
      if (userId && token) {
        fetchTransactionData();
      }
    }, [transactionType, transactionMonth, userId, token])
  );


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

      {isLoading ? (
        <ActivityIndicator />
      ) : transactions.length === 0 ? (
        <Text>No Transaction Data to Show</Text>
      ) : (
        <FlatList
          style={styles.transactionList}
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
              <Text>{item.category}</Text>
              {item.note ? (
                <Text>{item.note}</Text>
              ) : null}
              <Text>${item.amount.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  navigation.navigate("TransactionDetails", {
                    transaction: item,
                    onUpdate: (payload) => {
                      if (payload.deletedId) {
                        setTransactions(prev => prev.filter(txn => txn._id !== payload.deletedId));
                      } else {
                        setTransactions(prev =>
                          prev.map(txn => txn._id === payload._id ? payload : txn)
                        );
                      }
                    }
                  });
                }}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

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
