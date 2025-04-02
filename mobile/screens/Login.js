import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

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
      Alert.alert("Email or Password is invalid");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      {isLoading ? (<ActivityIndicator />) : (
        <View>
          <Text>Login</Text>
          <Text>Login to access your account</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
            autoCapitalize='none'
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            autoCapitalize='none'
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => handleLogin()}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <Text>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;