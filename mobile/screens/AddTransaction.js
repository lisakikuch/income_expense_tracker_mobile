import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const AddTransaction = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Transaction</Text>

      <View style={styles.card}>
        <Text style={styles.subHeader}>Transaction Details</Text>

        <Text style={styles.label}>Type</Text>
        <TextInput style={styles.input} value="Income" editable={false} />

        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} value="$0.00" editable={false} />

        <Text style={styles.label}>Category</Text>
        <TextInput style={styles.input} value="Food" editable={false} />

        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} value="12/08/2023" editable={false} />

        <TouchableOpacity style={styles.button} disabled>
          <Text style={styles.buttonText}>Add Transaction</Text>
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#E9ECEF",
    padding: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#6a5acd",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddTransaction;
