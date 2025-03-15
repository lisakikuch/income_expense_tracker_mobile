import React from 'react';
import { Text, TouchableOpacity, TextInput, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../shared/GlobalStyles';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Text>Login to access your account</Text>
      <TextInput placeholder="Your email address" />
      <TextInput placeholder="Your password" secureTextEntry />

      <TouchableOpacity
        onPress={() => { }}
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