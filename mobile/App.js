import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './contexts/AuthContext';
import { SafeAreaProvider, } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';

export default function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
