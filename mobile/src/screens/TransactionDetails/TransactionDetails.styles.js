import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F8F9FA",
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
    label: {
      fontWeight: "bold",
    },
    input: {
      backgroundColor: "#E9ECEF",
      padding: 12,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 10,
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

  export default styles;