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
        backgroundColor: "#6E72F1",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
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
        color: "#6E72F1",
        fontWeight: "bold",
      },
  });

  export default styles;