import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';

// Styling
import styles from './Login.styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Call a login function from AuthContext
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (err) {
      Alert.alert("Error", "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Login to access your account</Text>

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
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.footerText}>
        Don't have an account yet?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
