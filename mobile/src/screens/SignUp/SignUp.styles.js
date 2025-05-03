import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      marginBottom: 20,
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F0F0F0",
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      marginLeft: 10,
    },
    button: {
      backgroundColor: "#4A90E2",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    footerText: {
      marginTop: 15,
      textAlign: "center",
      color: "#666",
    },
    linkText: {
      color: "#4A90E2",
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
    termsAndConditions: {
      color: "#4A90E2", 
      fontWeight: "bold"
    },
    termsAndConditionsText: {
      fontSize: 16,
      marginVertical: 10,
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

  export default styles;