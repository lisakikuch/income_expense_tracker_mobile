import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, } from 'react-native-safe-area-context';

import { AuthProvider } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionContext';

import AppNavigator from './navigation/AppNavigator';

export default function App() {

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TransactionProvider>
          <AppNavigator />
        </TransactionProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
