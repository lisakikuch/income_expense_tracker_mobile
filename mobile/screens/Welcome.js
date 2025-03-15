import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../shared/GlobalStyles';

const Welcome = ({ navigation }) => {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Finance Tracker</Text>
        <Text style={globalStyles.text}>Track your finances effortlessly and start saving today!</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        >
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  export default Welcome;