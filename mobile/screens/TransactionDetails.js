import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "@env";
import axios from "axios";
import globalStyles from "../shared/GlobalStyles";

const TransactionDetails = ({ route, navigation }) => {
  const { transaction } = route.params;
  console.log("Transaction Details - Route Params: ", transaction);

  const [transactionDate, setTransactionDate] = useState(
    new Date(transaction.date)
  );
  const [transactionType, setTransactionType] = useState(transaction.type);
  const [transactionCategory, setTransactionCategory] = useState(
    transaction.category
  );
  const [transactionAmount, setTransactionAmount] = useState(
    String(transaction.amount.toFixed(2))
  );
  const [transactionNote, setTransactionNote] = useState(
    transaction.note || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useAuth();
  const transactionId = transaction?._id;

  // Handle updating the transaction
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${API_URL}/transactions/${transactionId}`,
        {
          type: transactionType,
          amount: parseFloat(transactionAmount),
          category: transactionCategory,
          date: transactionDate.toISOString(),
          note: transactionNote,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        route.params?.onUpdate?.(res.data);
        Alert.alert("Success", "Transaction updated successfully!");
        navigation.goBack();
      }
    } catch (err) {
      console.error("Error while updating transaction: ", err);
      Alert.alert("Updating transaction failed", "Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting the transaction
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${API_URL}/transactions/${transactionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        route.params?.onUpdate?.({ deletedId: transactionId });
        Alert.alert("Success", "Transaction deleted successfully!");
        navigation.goBack();
      }
    } catch (err) {
      console.error("Error while deleting transaction: ", err);
      Alert.alert("Deleting transaction failed", "Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Transaction Details</Text>

      <View style={globalStyles.card}>
        <View style={globalStyles.row}>
          <Text style={globalStyles.label}>Date</Text>
          <TextInput
            style={globalStyles.input}
            value={new Date(transactionDate).toLocaleDateString()}
            editable={false}
          />
        </View>

        <View style={globalStyles.row}>
          <Text style={globalStyles.label}>Type</Text>
          <Text>{transactionType}</Text>
        </View>

        <View style={globalStyles.row}>
          <Text style={globalStyles.label}>Category</Text>
          <Text>{transactionCategory}</Text>
        </View>

        <View style={globalStyles.row}>
          <Text style={globalStyles.label}>Amount</Text>
          <TextInput
            style={globalStyles.input}
            value={transactionAmount}
            onChangeText={setTransactionAmount}
          />
        </View>

        <View style={globalStyles.row}>
          <Text style={globalStyles.label}>Note</Text>
          <TextInput
            style={globalStyles.input}
            value={transactionNote}
            onChangeText={setTransactionNote}
          />
        </View>

        <TouchableOpacity
          style={globalStyles.updateButton}
          onPress={handleUpdate}
        >
          <Text style={globalStyles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.deleteButton, { marginTop: 12 }]}
          onPress={() =>
            Alert.alert(
              "Delete Transaction",
              "Are you sure you want to delete this transaction?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  onPress: () => handleDelete(),
                  style: "destructive",
                },
              ]
            )
          }
        >
          <Text style={globalStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionDetails;