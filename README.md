🌐 Backend Deployment
The backend is deployed on Render:
🔗 https://income-expense-trakcer-mobile-server.onrender.com

You can test the API by sending requests to the following endpoints:

- GET / → Returns a welcome message
- POST /auth/register → Register a new user
- POST /auth/login → Log in and receive a JWT token


📱 Mobile App Setup
To run the mobile app locally, create a .env file in the /mobile folder with the following content:

API_URL=https://income-expense-trakcer-mobile-server.onrender.com
Then install dependencies and start the app using Expo.