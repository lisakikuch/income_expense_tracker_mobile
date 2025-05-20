import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert
} from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchWithRefresh } from "../../../utils/fetchWithRefresh";
import { API_URL } from '@env';

// Styling
import styles from "./UserList.styles";

import axios from "axios";

const UserList = ({ navigation }) => {
    // States
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Constants
    const limit = 10;

    // Logged in user's info + jwt
    const { user, token, logout, updateToken } = useAuth();
    console.log("User: ", user);

    // Extract the user ID from the user object
    const userId = user?._id;

    const handleDeleteUser = async (userIdToDelete) => {
        console.log("Deleting User...", userIdToDelete);

        try {
            setIsInitialLoading(true);

            // Send a DELETE request to the backend + JWT
            console.log(`${API_URL}/users/${userIdToDelete}`);
            const res = await fetchWithRefresh(
                (newToken) => {
                    const finalToken = newToken || token;
                    return axios.delete(
                        `${API_URL}/users/${userIdToDelete}`,
                        {
                            headers: { Authorization: `Bearer ${finalToken}` }
                        }
                    )
                },
                logout,
                updateToken
            );

            if (res.status === 200) {
                Alert.alert("Success", "User deleted successfully!");
                setUsers(prev => prev.filter(user => user._id !== userIdToDelete));
                // Update the total user count as soon as one is deleted
                setTotalUsers((prev) => Math.max(prev - 1, 0));
            }

        } catch (err) {
            console.error("Error while deleting user: ", err);
            Alert.alert("Deleting user failed", "Unexpected error occurred");

        } finally {
            setIsInitialLoading(false);
        }
    }

    const handleLogout = async () => {
        await logout();
    };

    // Re-fetch when returning from another screen to ensure data stay in sync with the backend
    // or dependencies change
    const fetchUserData = async () => {
        // Check if page is '1' and assign true/false to isFirstPage
        const isFirstPage = page === 1;
        isFirstPage ? setIsInitialLoading(true) : setIsLoadingMore(true);

        try {
            // Send a GET request to get user data
            const res = await fetchWithRefresh(
                (newToken) => {
                    const finalToken = newToken || token;
                    return axios.get(
                        `${API_URL}/users`,
                        {
                            headers: { Authorization: `Bearer ${finalToken}` },
                            params: { page, limit }
                        }
                    );
                },
                logout,
                updateToken
            );
            const newData = res.data.users;
            setUsers((prev) => [...prev, ...newData]);
            console.log("Fetched users: ", newData);

            setHasMore(page < res.data.pages);
            setPage((prev) => prev + 1);

            setTotalUsers(res.data.total);

        } catch (err) {
            console.error("Error while fetching user data: ", err);
        } finally {
            isFirstPage ? setIsInitialLoading(false) : setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        if (userId && token) {
            fetchUserData();
        }
    }, [userId, token]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text>Total Users: {totalUsers}</Text>
                <TouchableOpacity
                    style={styles.headerContainer}
                    onPress={() => handleLogout()}>
                    <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Logout</Text>
                </TouchableOpacity>
            </View>
            {isInitialLoading ? (
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
                                    <Text style={styles.cardText}>Email: {item.email}</Text>
                                    <Text style={styles.cardText}>Role: {item.role}</Text>
                                    <Text style={styles.cardText}>
                                        Created At: {new Date(item.updatedAt).toLocaleDateString()}
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
                                                navigation.navigate("AdminTransactionList", {
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
                    ListFooterComponent={
                        hasMore ? (
                            isLoadingMore ? (
                                <ActivityIndicator />
                            ) : (
                                <TouchableOpacity
                                    onPress={fetchUserData}
                                    disabled={isLoadingMore}
                                    style={styles.loadMoreButton}
                                >
                                    <Text style={styles.editButtonText}>Load More</Text>
                                </TouchableOpacity>
                            )
                        ) : null
                    }
                />
            )
            }
        </View>
    );
}

export default UserList;
