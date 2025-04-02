import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      Alert.alert("Email or Password is invalid");
    }
  };

  return (
    <SafeAreaView>
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
        onPress={()=>handleLogin()}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <Text>Don't have an account yet?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;