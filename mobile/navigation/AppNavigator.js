import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Context
import { useAuth } from '../contexts/AuthContext';

// Styling
import globalStyles from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Screens
import TransactionList from '../screens/TransactionList';
import ReportScreen from '../screens/ReportScreen';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AddTransaction from '../screens/AddTransaction';
import TransactionDetails from '../screens/TransactionDetails';

// Create Stacks and Tab
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TransactionStack = createStackNavigator();

// Before authentication
const AuthStack = () => (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Welcome} name="Welcome" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={SignUp} name="SignUp" />
    </Stack.Navigator>
);

// After authentication 
// (Transaction List screen + corresponding transaction details screen)
const TransactionStackScreen = () => (
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

// After authentication
// (Transaction Stack + Report screens + Add Transaction screen)
const MainTabs = () => {
    const { logout } = useAuth();

    // Call logout function from Auth
    const handleLogout = async () => {
        await logout();
    };

    const screenOptions = ({ route }) => ({
        headerTitleAlign: 'center',
        headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={globalStyles.headerRightButton}>
                <Text>Logout</Text>
            </TouchableOpacity>
        ),
        headerStyle: globalStyles.headerContainer,
        headerTitleStyle: globalStyles.headerTitle,
        tabBarActiveTintColor: 'slateblue',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused }) => {
            let iconName;
            let color = focused ? 'slateblue' : 'gray';

            if (route.name === 'TransactionList') {
                iconName = 'list-alt';
            } else if (route.name === 'Report') {
                iconName = 'book';
            } else if (route.name === 'AddTransaction') {
                iconName = 'plus-circle';
            }

            return <Icon name={iconName} size={24} color={color} />;
        },
    });

    return (
        <Tab.Navigator initialRouteName="TransactionList" screenOptions={screenOptions}>
            <Tab.Screen name="TransactionList" component={TransactionStackScreen} options={{ title: "Transaction List" }} />
            <Tab.Screen name="Report" component={ReportScreen} options={{ title: "Report" }} />
            <Tab.Screen name="AddTransaction" component={AddTransaction} options={{ title: "Add Transaction" }} />
        </Tab.Navigator>
    );
};

// Display the stack after authentication if the user is logged in
// Otherwise bring the user back to the stack before authentication
const AppNavigator = () => {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {!user ? <AuthStack /> : <MainTabs />}
        </NavigationContainer>
    );
};

export default AppNavigator;