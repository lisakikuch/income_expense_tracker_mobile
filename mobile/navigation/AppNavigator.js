import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from '../contexts/AuthContext';

import globalStyles from '../shared/GlobalStyles';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ReportScreen from '../screens/ReportScreen';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp'

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigator handling flows before authentication
const AuthStack = () => {
    return (
        <View style={globalStyles.container}>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen component={Welcome} name="Welcome" />
                <Stack.Screen component={Login} name="Login" />
                <Stack.Screen component={SignUp} name='SignUp' />
            </Stack.Navigator>
        </View>
    )
};

// Tab navigator for handling flows after authentication
const MainTabs = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={globalStyles.container}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout} style={globalStyles.headerRightButton}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    ),
                    headerStyle: globalStyles.headerContainer,
                    headerTitleStyle: globalStyles.headerTitle,
                }}>
                <Tab.Screen component={HomeScreen} name="Home" />
                <Tab.Screen component={ReportScreen} name="Report" />
            </Tab.Navigator>
        </View>
    );
};

// Combine the two navigators
const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {!user ? <AuthStack /> : <MainTabs />}
        </NavigationContainer>
    );
};

export default AppNavigator;