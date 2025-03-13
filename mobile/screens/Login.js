import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Button} from 'react-native';

const Login = ({ navigation }) => {
    return (
      <View>
        <Text>Login</Text>
        <TextInput placeholder="Your email address" />
        <TextInput placeholder="Your password" secureTextEntry />
        <Button title="Login" onPress={() => {}} />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>Don't have an account yet? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Login;