import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        padding: 20,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 10,
        // marginVertical: 10,
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
      refreshButton: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      refreshText: {
        marginLeft: 5,
        fontSize: 14,
        color: "#4A90E2",
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
        marginTop: 20,
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
        width: "100%",
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
      colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
      },
      breakdownText: {
        fontSize: 16,
      },
  });

  export default styles;