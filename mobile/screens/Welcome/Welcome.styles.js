import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6E72F1',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 30,
      textAlign: 'center',
    },
    loginButton: {
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginBottom: 10,
      width: "100%"
    },
    loginButtonText: {
      color: '#6E72F1',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: "center"
    },
    signupButton: {
      borderColor: '#fff',
      borderWidth: 2,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      width: "100%"
    },
    signupButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: "center"
    },
  });

export default styles;