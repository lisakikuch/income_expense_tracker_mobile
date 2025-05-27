# 💰 Clarity Financial
A full-stack mobile finance tracking application that helps users securely manage their income and expenses, with access to monthly transaction history and financial summaries through an intuitive and user-friendly interface.

## 🚀 Demo
Deployed mobile app: [**Expo**](https://expo.dev/preview/update?message=Updated%20README%20%26%20LICENSE&updateRuntimeVersion=1.0.0&createdAt=2025-05-22T21%3A40%3A11.245Z&slug=exp&projectId=7d0e5ea6-905d-4223-b2ab-69f2b0b735a5&group=f796e013-7da4-401b-a317-6b24b103393a)
<br />
This app is connected to a live demo backend hosted on [**Render**](https://income-expense-trakcer-mobile-server.onrender.com).
- Please DO NOT submit real personal data.
- The backend is rate-limited and monitored for abuse.

Alternatively, you can clone this repository and run it locally using your own server setup by following the steps outlined in the **Setup** section.

Recordings:
- [**Sign-up**](https://drive.google.com/file/d/1LmtsdzZmPTvJM9cLomG_4QB-nCKhJaaH/view?usp=sharing)
- [**Regular user**](https://drive.google.com/file/d/1JkiBRDTFwqix41LTuUlpahmRXR0Glppr/view?usp=sharing)
- [**Admin user**](https://drive.google.com/file/d/12OYa7_1yeaDDSfPGaGSAJ927gys_qUMS/view?usp=sharing)

## 🧰 Tech Stack
### 📱 Frontend (Mobile) <br />
**Framework**: React Native with Expo <br />
**Navigation**: React Navigation <br />
**State Management**: 
- User state: useContext + Expo SecureStore
- Transaction state: useContext + useReducer <br />

**API Requests**: Axios <br />
**UI Components**:
- react-native-paper (Material Design components and icons)
- react-native-element-dropdown (customizable dropdown menus)
- react-native-chart-kit (charts and visualizations) <br />

**Deployment**: Expo <br />

### 🗄️ Backend <br />
**Framework**: Node.js + Express.js <br />
**Database**: MongoDB Atlas (cloud) + Mongoose (ODM) <br />
**Authentication & Security**:
- JWT (access & refresh tokens) - stateless authentication with automatic token renewal
- bcryptjs – secure password hashing
- express-rate-limit – API rate limiting to prevent abuse
- dotenv – secure environment variable management <br />

**Dev & Middleware Tools**:
- Morgan (HTTP logging)
- CORS (Cross-Origin Resource Sharing)
- Nodemon (dev auto-restart) <br />

**Deployment**: Render


## ✨ Features
- Register and log in with secure **JWT-based authentication**
- Store passwords securely using **bcrypt hashing** 
- Persistent login using **Expo SecureStore**
- **Protected routes** with token validation
- Seamless session renewal with **refresh token** support
- API security via **rate limiting** and **middleware**
- **Role-based access control (RBAC)** to restrict admin-only features
- Efficient user management with **server-side pagination** in the admin UserList
<br />

### ✅ Regular User 
- Add, edit, and delete income/expense transactions
- View monthly transaction history and summary with charts
- Filter transactions by type, month, and category

### 👥 Admin User
- View a paginated list of all users
- Delete users
- Access and view data of regular users

## 🛠️ Setup
### 🗄️ Backend
1. Create a .env file in /backend with:

```bash
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
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
- Live demo server hosted on Render:
```bash
API_URL=https://income-expense-trakcer-mobile-server.onrender.com
```

or

- Your local server
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
.
├── backend
│   ├── config
│   │   └── db.js                       # MongoDB connection setup
│   ├── controllers                     # Logic for handling requests
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── authMiddleware.js           # JWT authentication and role checking
│   │   ├── errorHandler.js
│   │   ├── isAdmin.js                  # Restrict access to admin-only routes
│   │   └── rateLimiter.js              # Limits repeated requests to prevent abuse
│   ├── models                          # Mongoose schemas for MongoDB
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   ├── routes                          # Defines REST API endpoints
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   ├── services                        # Reusable business logic (used by controllers)
│   │   ├── authService.js
│   │   ├── transactionService.js
│   │   └── userService.js
│   ├── utils
│   │   └── jwt.js                      # Generates JWT tokens for authenticated users
│   ├── .env
│   ├── index.js                        # Entry point of the Express server
│   ├── package.json
│   └── package-lock.json
│
├── mobile
│   ├── .expo
│   ├── dist
│   ├── node_modules
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── TransactionList
│   │   │   ├── MonthPickerModal.js
│   │   │   └── TransactionTypeToggle.js
│   │   ├── constants
│   │   │   └── categories.js
│   │   ├── contexts
│   │   │   ├── AuthContext.js          # Global auth state using Context API
│   │   │   └── TransactionContext.js   # Global transaction state
│   │   ├── navigation
│   │   │   └── AppNavigator.js         # Navigation structure using React Navigation
│   │   ├── screens
│   │   │   ├── admin                   # Admin-only views
│   │   │   │   ├── AdminTransactionList
│   │   │   │   └── UserList
│   │   │   ├── auth
│   │   │   │   ├── Login
│   │   │   │   ├── SignUp
│   │   │   │   └── Welcome             # Intro screen shown at first launch
│   │   │   └── user
│   │   │       ├── AddTransaction
│   │   │       ├── Report
│   │   │       ├── TransactionDetails
│   │   │       └── UserTransactionList
│   │   ├── styles                      # Shared styling modules
│   │   └── utils
│   │       └── fetchWithRefresh.js     # Helper for refreshing tokens on expired requests
│   └── .env
│   └── App.js                          # Root component with navigation and auth setup                                 

```

## 🔐 License
This project is licensed for personal and educational use only.  
See [LICENSE.txt](./LICENSE.txt) for details.