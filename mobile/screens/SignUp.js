import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Create Account</Text>
      <TextInput placeholder="Your email address" />
      <TextInput placeholder="Create a password" secureTextEntry />
      <TextInput placeholder="Re-enter your password" secureTextEntry />
      <TouchableOpacity
        onPress={() => { }} >
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <Text>Already registered? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;