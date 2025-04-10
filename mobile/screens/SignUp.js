import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";
import axios from "axios";
import globalStyles from "../shared/GlobalStyles";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email Format");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      Alert.alert("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });

      if (res.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.error("Sign Up Error:", err.response?.data || err.message);
      Alert.alert(
        "Sign Up Failed",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const CustomCheckbox = ({ value, onValueChange }) => (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={globalStyles.checkbox}
    />
  );

  return (
    <SafeAreaView style={globalStyles.authContainer}>
      <Text style={globalStyles.authTitle}>Create Account</Text>
      <Text style={globalStyles.authSubtitle}>
        Create your account to manage your finances.
      </Text>

      {/* Email Input */}
      <View style={globalStyles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" />
        <TextInput
          style={globalStyles.input}
          placeholder="Your email address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={globalStyles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          style={globalStyles.input}
          placeholder="Create a password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm Password */}
      <View style={globalStyles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          style={globalStyles.input}
          placeholder="Re-enter your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Terms Checkbox */}
      <View style={globalStyles.checkboxContainer}>
        <CustomCheckbox
          value={acceptedTerms}
          onValueChange={setAcceptedTerms}
        />
        <Text>I agree with</Text>
        <TouchableOpacity>
          <Text style={globalStyles.linkText}> Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={handleSignUp}
        >
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      {/* Link to login */}
      <Text style={globalStyles.footerText}>
        Already registered?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={globalStyles.linkText}>Log In</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default SignUp;