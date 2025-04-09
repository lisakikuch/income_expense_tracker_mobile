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
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TransactionStack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Welcome} name="Welcome" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={SignUp} name="SignUp" />
    </Stack.Navigator>
);

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

const MainTabs = () => {
    const { logout } = useAuth();

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

const AppNavigator = () => {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            {!user ? <AuthStack /> : <MainTabs />}
        </NavigationContainer>
    );
};

export default AppNavigator;