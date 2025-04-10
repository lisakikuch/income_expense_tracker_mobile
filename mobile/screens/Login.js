import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import globalStyles from '../shared/GlobalStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.authContainer}>
      <Text style={globalStyles.authTitle}>Login</Text>
      <Text style={globalStyles.authSubtitle}>
        Login to access your account
      </Text>

      <View style={globalStyles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" />
        <TextInput
          style={globalStyles.inputField}
          placeholder="Your email address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={globalStyles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          style={globalStyles.inputField}
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={globalStyles.primaryButtonText}>Login</Text>
        </TouchableOpacity>
      )}

      <Text style={globalStyles.footerText}>
        Don't have an account yet?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={globalStyles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default Login;