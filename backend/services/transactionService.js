const Transaction = require("../models/transactionModel");

exports.createTransaction = async ({ userID, type, amount, category, date, note }) => {

    if (!userID || !type || !category || !date) {
        throw new Error("All fields need to be filled");
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Amount must be a numeric value greater than 0");
    }

    const transaction = new Transaction({
        userID,
        type,
        amount: Number(amount),
        category,
        date,
        note,
    });

    await transaction.save();
    console.log("POST transaction: ", transaction);
    return transaction;
};

exports.getTransactions = async ({ userID, type, month, category }) => {

    let filter = {};
    if (userID) filter.userID = userID;
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (month) {
        const startDate = new Date(month);
        startDate.setUTCHours(0, 0, 0, 0); // Ensure start date is at UTC midnight

        const endDate = new Date(startDate);
        endDate.setUTCMonth(startDate.getUTCMonth() + 1);
        endDate.setUTCHours(0, 0, 0, 0); // Ensure end date is also at UTC midnight

        filter.date = { $gte: startDate, $lt: endDate };
    }

    console.log("GET transaction filter: ", filter)

    return await Transaction.find(filter).sort({ createdAt: -1 });
};

exports.updateTransaction = async ({ id, update }) => {

    console.log("PUT /transactions/:id hit with data:", { id, update });

    return await Transaction.findByIdAndUpdate(
        id,
        update,
        { new: true }
    );
};

exports.deleteTransaction = async ({ id }) => {

    console.log("Deleted transaction: ", { id });
    return await Transaction.findByIdAndDelete(id);
};
