import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
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
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default styles;