# 💰 Income Expense Tracker 
A full-stack mobile finance tracking application that helps users securely manage their income and expenses, with access to monthly transaction history and financial summaries through an intuitive and user-friendly interface.

## 🚀 Live App
Available here!:<br> 🔗 **Expo**: [https://expo.dev/accounts/lisa55555/projects/mobile/updates/512aeac9-9d30-4e91-b51e-9c8cbe502a44](https://expo.dev/accounts/lisa55555/projects/mobile/updates/512aeac9-9d30-4e91-b51e-9c8cbe502a44)

## 🧰 Tech Stack
- **Frontend (Mobile):** React Native, React Navigation, useContext (State management), AsyncStorage, Axios (Fetch API), Expo
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (session management), bcrypt (password hashing)  
- **Deployment:** Render (backend), MongoDB Atlas (database)

## ✨ Features

### ✅ Regular User (Completed)
- Register and log in with secure JWT-based authentication
- Secure password storage using bcrypt hashing  
- Add, edit, and delete income/expense transactions
- View monthly transaction history and summary
- Mobile-friendly UI with React Native
- Persistent login with AsyncStorage

### 🚧 Admin User (In Progress)
- View and manage all users
- access to regular users' data
- Role-based access control (backend logic and UI under development)

## 🛠️ Setup
### 🗄️ Backend

The backend is deployed on **Render**:<br>
🔗 [https://income-expense-trakcer-mobile-server.onrender.com](https://income-expense-trakcer-mobile-server.onrender.com)<br>

If you'd like to run it locally: <br>

1. Create a .env file in /backend with:

```bash
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

2. Then run the following commands:

```bash
cd backend
npm install
nodemon index.js
```

### 📱 Frontend (Mobile)
If you'd like to run the mobile app locally:<br>

1. Create a .env file in /mobile with:

```bash
API_URL=https://income-expense-trakcer-mobile-server.onrender.com
```

or

```bash
API_URL=http://localhost:your_port_number
```

2. Then run the following commands:
```bash
cd mobile
npm install
npx expo start
```

3. This will open Expo Dev Tools in your browser. Use the QR code to run the app on your mobile device using the Expo Go app, or use a simulator if available.

## 🗂 Project Structure
```bash
income_expense_tracker_mobile/
# Backend
backend/
├── config/
│   └── db.js               # MongoDB connection setup
├── controllers/            # Logic for handling requests
│   ├── authController.js
│   ├── transactionController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js   # JWT authentication and role checking
├── models/                 # Mongoose schemas for MongoDB
│   ├── transactionModel.js
│   └── userModel.js
├── routes/                 # Defines API endpoints
│   ├── authRoutes.js
│   ├── transactionRoutes.js
│   └── userRoutes.js
├── utils/
│   └── jwt.js              # Generates JWT tokens for authenticated users
├── .env
├── index.js                # Entry point of the Express server
# Frontend 
frontend/                   # React (In Progress)
|
mobile/                     # React Native
├── .expo/
├── assets/
├── contexts/
│   └── AuthContext.js      # Handles user authentication state
├── dist/
├── navigation/
│   └── AppNavigator.js     # React Navigation setup
├── screens/
│   ├── AddTransaction.js
│   ├── Login.js
│   ├── ReportScreen.js
│   ├── SignUp.js
│   ├── TransactionDetails.js
│   ├── TransactionList.js
│   └── Welcome.js          # Landing screen
├── shared/                 # Styling
├── .env
├── App.js                  # Root component that sets up navigation and global authentication context
```