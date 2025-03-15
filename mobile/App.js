import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, } from 'react-native-safe-area-context';

import globalStyles from './shared/GlobalStyles';

// Screens
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp'

const Stack = createStackNavigator();

// Stack before authentication
function AuthStack() {
  return (
    <SafeAreaProvider>
      <View style={globalStyles.container}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Welcome} name="Welcome" />
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={SignUp} name='SignUp' />
        </Stack.Navigator>
      </View>
    </SafeAreaProvider>
  )
}

// Stack after authentication
function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={ReportScreen} name="Report" />
    </Stack.Navigator>
  )
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
