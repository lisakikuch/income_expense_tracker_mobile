import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ReportScreen = () => {
  const navigation = useNavigation();
  const [viewType, setViewType] = useState("Expense"); // Toggle between Expense & Income
  const [selectedMonth, setSelectedMonth] = useState("September 2025");
  const [modalVisible, setModalVisible] = useState(false); // Controls the month selector

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

  const expenseData = [
    {
      name: "Education",
      amount: 300,
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 14,
    },
    {
      name: "Eating-out",
      amount: 500,
      color: "pink",
      legendFontColor: "black",
      legendFontSize: 14,
    },
    {
      name: "Medical",
      amount: 700,
      color: "green",
      legendFontColor: "black",
      legendFontSize: 14,
    },
  ];

  const incomeData = [
    {
      name: "Salary",
      amount: 2500,
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 14,
    },
    {
      name: "Other",
      amount: 500,
      color: "purple",
      legendFontColor: "black",
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>

      {/* Header with Back Button & Month Selector */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Report</Text>

        {/* Month Selector Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.calendarButton}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.monthText}>{selectedMonth}</Text>
        </TouchableOpacity>
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={viewType === "Expense" ? expenseData : incomeData}
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

      {/* Toggle between Expense & Income */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewType === "Expense" && styles.activeButton,
          ]}
          onPress={() => setViewType("Expense")}
        >
          <Text
            style={[
              styles.toggleText,
              viewType === "Expense" && styles.activeText,
            ]}
          >
        Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewType === "Income" && styles.activeButton,
          ]}
          onPress={() => setViewType("Income")}
        >
          <Text
            style={[
              styles.toggleText,
              viewType === "Income" && styles.activeText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      {/* Month Selector */}
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
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  backButton: { padding: 10 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", flex: 1 },
  calendarButton: { flexDirection: "row", alignItems: "center", padding: 10 },
  monthText: { fontSize: 16, marginLeft: 5 },

  chartContainer: { alignItems: "center", marginBottom: 20 },

  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
  },
  activeButton: { backgroundColor: "#4A90E2" },
  toggleText: { fontSize: 16 },
  activeText: { color: "#fff", fontWeight: "bold" },

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
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  monthOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
    alignItems: "center",
  },
  monthOptionText: { fontSize: 16 },
  cancelButton: { marginTop: 10, padding: 10 },
  cancelText: { fontSize: 16, color: "red", fontWeight: "bold" },
});

export default ReportScreen;