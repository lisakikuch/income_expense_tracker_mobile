import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useTransaction } from "../../../contexts/TransactionContext";
import TransactionList from "../../../components/TransactionList/TransactionList";

const UserTransactionList = ({ navigation }) => {
    const { user } = useAuth();
    const userId = user?._id;
    const { fetchTransactions, state } = useTransaction();
    const { transactionMonth, transactionType } = state;

    useEffect(() => {
        if (userId) {
            fetchTransactions(userId);
        }
    }, [userId, transactionMonth, transactionType]);

    return (
        <TransactionList
            editable={true}
            navigation={navigation}
        />
    );
};

export default UserTransactionList;