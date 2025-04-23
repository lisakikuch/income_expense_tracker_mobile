# 💰 Income Expense Tracker 
A full-stack mobile finance tracking application that helps users securely manage their income and expenses, with access to monthly transaction history and financial summaries through an intuitive and user-friendly interface.

## 🚀 Live App
is available on [**Expo**](https://expo.dev/accounts/lisa55555/projects/mobile/builds/b610ea5a-00d6-409e-8170-16b20d70237c)

## 🧰 Tech Stack
### 📱 Frontend (Mobile) <br />
**Framework**: React Native with Expo <br />
**Navigation**: React Navigation <br />
**State Management**: useContext + SecureStore + AsyncStorage <br />
**API Requests**: Axios <br />
**UI Components**:
- react-native-paper (Material Design components and icons)
- react-native-element-dropdown (customizable dropdown menus)
- react-native-chart-kit (charts and visualizations)
**Deployment**: Expo <br />
<br />

### 🗄️ Backend <br />
**Framework**: Node.js + Express.js <br />
**Database**: MongoDB Atlas (cloud) + Mongoose (ODM) <br />
**Authentication & Security**:
- JWT (token-based auth)
- bcryptjs (password hashing)
- express-rate-limit (rate limiting)
- dotenv (env management) <br />

**Dev & Middleware Tools**:
- Morgan (HTTP logging)
- CORS (Cross-Origin Resource Sharing)
- Nodemon (dev auto-restart) <br />

**Deployment**: Render


## ✨ Features
- Register and log in with secure **JWT-based authentication**
- Store passwords securely using **bcrypt hashing** 
- Persistent login using **AsyncStorage**
- Protected routes
- API security via rate limiting and middleware
- **Role-based access control (RBAC)** to restrict admin-only features
<br />

### ✅ Regular User 
- Add, edit, and delete income/expense transactions
- View monthly transaction history and summary with charts
- Filter transactions by type, month, and category

### 👥 Admin User
- View a list of all users
- Delete users
- Access and view data of regular users

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
node index.js
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
│   ├── authMiddleware.js   # JWT authentication and role checking
|   ├── isAdmin.js          # Restrict access to admin-only routes
|   ├── rateLimiter.js      # Limits repeated requests to prevent abuse
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
|   ├── UserList.js         # Admin-only
│   └── Welcome.js          # Landing screen
├── shared/                 # Styling
├── .env
├── App.js                  # Root component that sets up navigation and global authentication context
```