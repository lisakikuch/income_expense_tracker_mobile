import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  
  // Welcome screen
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#6E72F1",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  welcomeLoginButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  welcomeLoginButtonText: {
    color: "#6E72F1",
    fontSize: 18,
    fontWeight: "bold",
  },
  welcomeSignupButton: {
    borderColor: "#fff",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  welcomeSignupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Login Screen
  authContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  authSubtitle: {
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
  inputField: {
    flex: 1,
    marginLeft: 10,
  },
  primaryButton: {
    backgroundColor: "#6E72F1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
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
  // Sign Up Screen
  authContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  authSubtitle: {
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#6E72F1",
    backgroundColor: "white",
    marginRight: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#6E72F1",
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
    color: "#6E72F1",
    fontWeight: "bold",
  },
  // Transaction List
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  monthText: {
    fontSize: 16,
    marginLeft: 5,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  yearRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  pickerItem: {
    padding: 8,
    margin: 4,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlign: "center",
    minWidth: 80,
  },
  activeItem: {
    backgroundColor: "#6a5acd",
    color: "#fff",
    borderColor: "#6a5acd",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
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
  transactionCard: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDate: {
    fontWeight: "bold",
  },
  editButton: {
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
  // Report Screen
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  monthText: {
    fontSize: 16,
    marginLeft: 5,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  yearRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  pickerItem: {
    padding: 8,
    margin: 4,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlign: "center",
    minWidth: 80,
  },
  activeItem: {
    backgroundColor: "#6a5acd",
    color: "#fff",
    borderColor: "#6a5acd",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
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
  totalContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  totalBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expenseAmount: {
    fontSize: 24,
    color: "#E57373",
  },
  incomeAmount: {
    fontSize: 24,
    color: "#4CAF50",
  },
  chartContainer: {
    marginBottom: 20,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  breakdownLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  breakdownText: {
    fontSize: 16,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  // Add Transaction
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    color: "white",
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
    marginBottom: 10,
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
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  headerRightButton: {
    marginRight: 15,
  },
  headerRightText: {
    color: "#007AFF",
    fontSize: 16,
  },
  headerContainer: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
  },
  // Transaction Details
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default globalStyles;