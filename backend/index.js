// .env
require('dotenv').config();

// Middleware
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { generalLimiter } = require('./middleware/rateLimiter');

// DB
const connectDB = require('./config/db');

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is missing! Please check your .env file.");
    process.exit(1);
}

connectDB(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(generalLimiter);

app.use('/transactions', transactionRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running! Welcome to the Expense/Income Tracker.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});