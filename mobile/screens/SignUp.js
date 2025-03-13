import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

const SignUp = ({ navigation }) => {
    return (
      <View>
        <Text>Create Account</Text>
        <TextInput placeholder="Your email address" />
        <TextInput placeholder="Create a password" secureTextEntry />
        <TextInput placeholder="Re-enter your password" secureTextEntry />
        <Button title="Sign Up" onPress={() => {}} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Already registered? Log In</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default SignUp;