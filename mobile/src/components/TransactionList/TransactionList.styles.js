import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F8F9FA",
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      paddingHorizontal: 5,
    },
    noDataText: {
      textAlign: "center",
      marginBottom: 15
    },
    input: {
      backgroundColor: "#E9ECEF",
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
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
    toggleContainer: {
      flexDirection: "row",
      justifyContent: "center",
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
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  export default styles;