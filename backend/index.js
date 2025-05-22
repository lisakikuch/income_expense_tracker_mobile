// .env
require('dotenv').config();

const express = require('express');
const app = express();

// Trust Render or other reverse proxies
app.set('trust proxy', 1);

// Middleware
const cors = require('cors');
const morgan = require('morgan');
const { generalLimiter } = require('./middleware/rateLimiter');

// DB
const connectDB = require('./config/db');

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is missing! Please check your .env file.");
    process.exit(1);
}

// DB connection
connectDB(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });

// CORS config
const allowedOrigins = [
  'https://studio.expo.dev',
  'exp://',
  'https://u.expo.dev',
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS request origin:', origin);
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

// Allow other devices on the same network accessible to the server by 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});