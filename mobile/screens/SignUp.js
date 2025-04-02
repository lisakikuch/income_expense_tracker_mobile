import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_URL } from '@env';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const handleSignUp = async () => {

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email Format");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Sign up Successful!");
        navigation.navigate('Login');
      }

    } catch (err) {
      console.error("Sign Up Error: ", err.response?.data || err.message);
      Alert.alert("Sign Up Failed", err.response?.data?.message || "Something went wrong");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      {isLoading ? (<ActivityIndicator />) : (
        <View>
          <Text>Create Account</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
            autoCapitalize='none'
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter your password"
            secureTextEntry
            autoCapitalize='none'
          />
          <TouchableOpacity
            onPress={() => handleSignUp()} >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <Text>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUp;