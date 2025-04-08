import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from '../contexts/AuthContext';
import globalStyles from '../shared/GlobalStyles';
import TransactionList from '../screens/TransactionList';
import ReportScreen from '../screens/ReportScreen';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AddTransaction from '../screens/AddTransaction';
import TransactionDetails from '../screens/TransactionDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TransactionStack = createStackNavigator();

const AuthStack = () => {
    return (

        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen component={Welcome} name="Welcome" />
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={SignUp} name='SignUp' />
        </Stack.Navigator>

    );
};

const MainTabs = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (

        <Tab.Navigator
            initialRouteName="TransactionList"
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
            <Tab.Screen name="TransactionList" component={TransactionStackScreen} options={{ title: "Transaction List" }} />
            <Tab.Screen name="Report" component={ReportScreen} options={{ title: "Report" }} />
            <Tab.Screen name="AddTransaction" component={AddTransaction} options={{ title: "Add Transaction" }} />
        </Tab.Navigator>
    );
};

const TransactionStackScreen = () => {
    return (
        <TransactionStack.Navigator screenOptions={{ headerShown: false }}>
            <TransactionStack.Screen
                name="TransactionList"
                component={TransactionList}
                options={{ title: "Transaction List" }}
            />
            <TransactionStack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
                options={{ title: "Transaction Details" }}
            />
        </TransactionStack.Navigator>
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