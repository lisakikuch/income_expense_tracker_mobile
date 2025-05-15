import { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Context
import { useAuth } from '../contexts/AuthContext';
import { useTransaction } from '../contexts/TransactionContext';

// Styling
import globalStyles from '../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

// Auth Screens
import Welcome from '../screens/auth/Welcome/Welcome';
import SignUp from '../screens/auth/SignUp/SignUp';
import Login from '../screens/auth/Login/Login';

// User Screens
import UserTransactionList from '../screens/user/UserTransactionList/UserTransactionList';
import ReportScreen from '../screens/user/Report/ReportScreen';
import TransactionDetails from '../screens/user/TransactionDetails/TransactionDetails';
import AddTransaction from '../screens/user/AddTransaction/AddTransaction';

// Admin Screens
import UserList from '../screens/admin/UserList/UserList';
import AdminTransactionList from '../screens/admin/AdminTransactionList/AdminTransactionList';

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
            name="TransactionMain"
            component={UserTransactionList}
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
        tabBarActiveTintColor: 'darkblue',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused }) => {
            let iconName;
            let color = focused ? 'darkblue' : 'gray';

            if (route.name === 'UserTransactionList') {
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
        <Tab.Navigator initialRouteName="UserTransactionList" screenOptions={screenOptions}>
            <Tab.Screen name="UserTransactionList" component={TransactionStackScreen} options={{ title: "Transaction List" }} />
            <Tab.Screen name="Report" component={ReportScreen} options={{ title: "Report" }} />
            <Tab.Screen name="AddTransaction" component={AddTransaction} options={{ title: "Add Transaction" }} />
        </Tab.Navigator>
    );
};

const AdminStack = () => (
    <Stack.Navigator initialRouteName="UserList" screenOptions={{ headerShown: true }}>
        <Stack.Screen component={UserList} name="UserList" options={{ title: "Manage Users" }} />
        <Stack.Screen component={AdminTransactionList} name="AdminTransactionList" options={{ title: "User Transaction" }} />
    </Stack.Navigator>
);

// Display the stack after authentication if the user is logged in
// Otherwise bring the user back to the stack before authentication
const AppNavigator = () => {
    const { user } = useAuth();
    const { resetTransactionState } = useTransaction();

    // Ensure reset transaction state on login/logout/switch
    useEffect(() => {
        resetTransactionState();
    }, [user])

    return (
        <NavigationContainer>
            {!user ? <AuthStack /> :
                (user.role !== "Admin" ? <MainTabs /> : <AdminStack />)}
        </NavigationContainer>
    );
};

export default AppNavigator;