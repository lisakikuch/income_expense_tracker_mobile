const transactionService = require('../services/transactionService');

exports.createTransaction = async (req, res) => {
    try {
        const data = await transactionService.createTransaction(req.body);
        res.status(201).json({ message: "Transaction created successfully", transaction: data });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const data = await transactionService.getTransactions(req.query);

        res.status(200).json({ message: "Retrieved transactions", transactions: data });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTransaction = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await transactionService.updateTransaction({ id, update: req.body });

        if (!data) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", transaction: data });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await transactionService.deleteTransaction({ id });

        if (!data) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully", transaction: data });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};