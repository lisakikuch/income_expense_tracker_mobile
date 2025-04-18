import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from '@env';

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
                                            style={[styles.editButton, {backgroundColor: "#dc3545"}]}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    header: {
        padding: 15,
        backgroundColor: "#6a5acd",
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    calendarButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
    },
    monthText: {
        fontSize: 16,
        marginLeft: 5,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    transactionList: {
        marginBottom: 20,
    },
    transactionCard: {
        marginBottom: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
    },
    transactionDate: {
        fontWeight: "bold",
    },
    transactionDetails: {
        color: "#666",
        marginBottom: 5,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: "#4A90E2",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "flex-end",
    },
    editButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 300,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    monthOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: "100%",
        alignItems: "center",
    },
    monthOptionText: {
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
    },
    cancelText: {
        fontSize: 16,
        color: "red",
        fontWeight: "bold",
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "center",

    },
    toggleButton: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#4A90E2",
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: "#6a5acd",
    },
    toggleText: {
        color: "#fff",
        fontWeight: "bold",
    },
    activeText: {
        color: "#fff",
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default UserList;
