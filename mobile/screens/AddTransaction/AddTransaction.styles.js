import { StyleSheet } from "react-native";

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

  export default styles;