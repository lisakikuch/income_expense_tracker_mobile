import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TransactionDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Details</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Transaction Title</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text>3/11/2025</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Type</Text>
          <Text>Expense</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text>$50</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Categories</Text>
          <Text>Education</Text>
        </View>

        <View style={styles.notes}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.noteText}>Further details about the transaction can go here.</Text>
        </View>

        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.buttonText}>✏️ Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>🗑 Delete</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  notes: {
    marginBottom: 20,
  },
  noteText: {
    color: "#666",
  },
  updateButton: {
    backgroundColor: "#6a5acd",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TransactionDetails;
