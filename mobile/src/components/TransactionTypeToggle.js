import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { TRANSACTION_TYPES } from "../constants/categories";

const TransactionTypeToggle = ({ selectedType, onSelect }) => {
  return (
    <View style={styles.toggleContainer}>
      {TRANSACTION_TYPES.map((type) => (
        <TouchableOpacity
          key={type}
          style={[styles.toggleButton, selectedType === type && styles.activeButton]}
          onPress={() => onSelect(type)}
        >
          <Text style={[styles.toggleText, selectedType === type && styles.activeText]}>
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TransactionTypeToggle;

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#4A90E2",
  },
  toggleText: {
    fontSize: 16,
    color: "#333",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});
