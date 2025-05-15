import { useEffect } from "react";
import { useTransaction } from "../../../contexts/TransactionContext";
import TransactionList from "../../../components/TransactionList/TransactionList";

const AdminTransactionList = ({ navigation, route }) => {
    const selectedUserId = route.params?.selectedUserId;
    const { fetchTransactions, state } = useTransaction();
    const { transactionMonth, transactionType } = state;

    useEffect(()=>{
        if(selectedUserId) {
            fetchTransactions(selectedUserId);
        }
    }, [selectedUserId, transactionMonth, transactionType]);

    return (
        <TransactionList
        editable={false}
        navigation={navigation}
        />
    );
};

export default AdminTransactionList;