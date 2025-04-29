import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from '@env';

// Styling
import styles from "./UserList.styles";

import axios from "axios";

const UserList = ({ navigation }) => {
    // Save fetched transaction data
    const [users, setUsers] = useState([]);

    // Logged in user's info + jwt
    const { user, token, logout } = useAuth();
    console.log("User: ", user);
    console.log("Token: ", token);

    // Extract the user ID from the user object above
    const userId = user?._id;

    // Display activity indicator while loading
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteUser = async (userIdToDelete) => {
        console.log("Deleting User...", userIdToDelete);

        try {
            setIsLoading(true);

            // Send a DELETE request to the backend + JWT
            console.log(`${API_URL}/users/${userIdToDelete}`);
            const res = await axios.delete(
                `${API_URL}/users/${userIdToDelete}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (res.status === 200) {
                Alert.alert("Success", "User deleted successfully!");
                setUsers(prev => prev.filter(user => user._id !== userIdToDelete));
            }

        } catch (err) {
            console.error("Error while deleting user: ", err);
            Alert.alert("Deleting user failed", "Unexpected error occurred");

        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = async () => {
        await logout();
    };

    // Re-fetch when returning from another screen to ensure data stay in sync with the backend
    // or dependencies change
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                // Send a GET request to get user data
                const res = await axios.get(
                    `${API_URL}/users`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Save the fetched user data
                setUsers(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error while fetching user data: ", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (userId && token) {
            fetchUserData();
        }
    }, [userId, token]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.headerContainer}
                onPress={() => handleLogout()}>
                <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
            {isLoading ? (
                <ActivityIndicator />
            ) : users.length === 0 ? (
                <Text>No User Data to Show</Text>
            ) : (
                // Display fetched data in FlatList with email as a key
                <FlatList
                    style={styles.transactionList}
                    data={users}
                    keyExtractor={(item) => item.email}
                    renderItem={({ item }) => (
                        <View style={styles.transactionCard}>
                            <View style={styles.transactionRow}>
                                <View>
                                    <Text>{item.email}</Text>
                                    <Text style={styles.transactionDate}>
                                        {new Date(item.updatedAt).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View>
                                    {item._id !== user._id && (
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            // Navigate to selected user's TransactionList screen with the selected user's object ID
                                            onPress={() => {
                                                console.log("selectedUserId: ", item._id)
                                                // Need to update the path once Admin stack is created
                                                navigation.navigate("TransactionList", {
                                                    selectedUserId: item._id,
                                                });
                                            }}
                                        >
                                            <Text style={styles.editButtonText}>View</Text>
                                        </TouchableOpacity>
                                    )}
                                    {item._id !== user._id && (
                                        <TouchableOpacity
                                            style={[styles.editButton, { backgroundColor: "#dc3545" }]}
                                            onPress={() =>
                                                Alert.alert("Delete User", "Are you sure?", [
                                                    { text: "Cancel", style: "cancel" },
                                                    { text: "Delete", onPress: () => handleDeleteUser(item._id), style: "destructive" },
                                                ])
                                            }
                                        >
                                            <Text style={styles.editButtonText}>Delete</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                />
            )
            }
        </View>
    );
};

export default UserList;
