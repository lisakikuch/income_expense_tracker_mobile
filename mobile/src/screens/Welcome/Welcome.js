import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Styling
import styles from './Welcome.styles';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="stats-chart-outline" size={100} color="#fff" style={styles.logo} />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Clarity Financial</Text>
      <Text style={styles.subtitle}>
        Track your finances effortlessly and start saving today!
      </Text>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
