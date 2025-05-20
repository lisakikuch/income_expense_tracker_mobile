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
    cardText: {
        marginVertical: 2,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: "#4A90E2",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "flex-end",
    },
    loadMoreButton: {
        marginTop: 5,
        backgroundColor: "lightgrey",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 5,
    },
});

export default styles;