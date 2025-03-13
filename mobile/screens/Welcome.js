import React from 'react';
import { View, Text, Button } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
      <View>
        <Text>Finance Tracker</Text>
        <Text>Track your finances effortlessly and start saving today!</Text>
        <Button title="Log In" onPress={() => navigation.navigate('Login')} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    );
  };

  export default Welcome;