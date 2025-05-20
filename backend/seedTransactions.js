require('dotenv').config();

const mongoose = require('mongoose');
const Transaction = require('./models/transactionModel');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MONGO CONNECTION OPEN!!");

        const seedTransactions = [
            {
                userID: "60c72b2f9b1d8e1a4c8b1234",
                type: "Income",
                amount: 5000,
                category: "Salary",
                date: new Date("2025-02-01"),
                note: "Monthly salary"
            },
            {
                userID: "60c72b2f9b1d8e1a4c8b1234",
                type: "Expense",
                amount: 150,
                category: "Groceries",
                date: new Date("2025-02-05"),
                note: "Weekly groceries"
            },
            {
                userID: "60c72b2f9b1d8e1a4c8b5678",
                type: "Income",
                amount: 200,
                category: "Freelance",
                date: new Date("2025-02-10"),
                note: "Freelance project payment"
            },
        ];

        await Transaction.insertMany(seedTransactions);
        console.log("Sample data inserted successfully!");
        mongoose.connection.close();
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR :(");
        console.log(err);
    });