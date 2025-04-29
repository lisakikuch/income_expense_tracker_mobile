import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, } from 'react-native-safe-area-context';

import { AuthProvider } from './src/contexts/AuthContext';
import {TransactionProvider} from './src/contexts/TransactionContext';

import AppNavigator from './src/navigation/AppNavigator';

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
