import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#636AE8',
  },
  title: {
    color: 'white'
  },
  text: {
    color: 'white'
  },
  buttonText: {
    color: 'white'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  headerRightButton: {
    marginRight: 15,
  },
  headerRightText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerContainer: {
    backgroundColor: '#fff',
    elevation: 0,  // Remove shadow on Android
    shadowOpacity: 0,  // Remove shadow on iOS
  },
});

export default globalStyles;