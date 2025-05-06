import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';

// npm packages
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// Context
import { useAuth } from '../../contexts/AuthContext';

// API
import { API_URL } from '@env';

// Styling
import styles from './SignUp.styles';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Login function
  const { login } = useAuth();

  const handleSignUp = async () => {
    // Input Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email Format");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      Alert.alert("Error", "Please agree to the Terms & Conditions");
      return;
    }

    try {
      setIsLoading(true);
      // Send a POST request with input email and pw to the backend
      // to create a new account
      const res = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });

      if (res.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        // Auto login
        await login(email, password);
      }
    } catch (err) {
      console.error("Sign Up Error: ", err.response?.data || err.message);
      Alert.alert(
        "Sign Up Failed",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const CustomCheckbox = ({ value, onValueChange }) => {
    return (
      <TouchableOpacity
        onPress={() => onValueChange(!value)}
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: "#4A90E2",
          backgroundColor: value ? "#4A90E2" : "white",
          marginRight: 8,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Create your account to manage your finances.
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Your email address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomCheckbox
          value={acceptedTerms}
          onValueChange={setAcceptedTerms}
        />
        <Text>I agree with</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.termsAndConditions}> Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.footerText}>
        Already registered?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </Text>

      {/* Terms & Conditions Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            <Text style={styles.termsAndConditionsText}>
              Your data is securely stored by Apeksha & Lisa 🔐 {'\n'}
              {'\n'}
              We don’t judge your personal spending habits 👀
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;