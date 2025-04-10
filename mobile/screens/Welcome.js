import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../shared/GlobalStyles';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.welcomeContainer}>
      {/* App Icon / Logo */}
      <Ionicons
        name="stats-chart-outline"
        size={100}
        color="#fff"
        style={globalStyles.welcomeLogo}
      />

      {/* Title and subtitle */}
      <Text style={globalStyles.welcomeTitle}>Finance Tracker</Text>
      <Text style={globalStyles.welcomeSubtitle}>
        Track your finances effortlessly and start saving today!
      </Text>

      {/* Login and Sign Up buttons */}
      <TouchableOpacity
        style={globalStyles.welcomeLoginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={globalStyles.welcomeLoginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.welcomeSignupButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={globalStyles.welcomeSignupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
