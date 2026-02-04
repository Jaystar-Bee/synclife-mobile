import { StatusBar } from 'expo-status-bar';

import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/welcome/SplashScreen';
import { COLORS } from './constants/colors';
import WelcomeScreen from './screens/welcome/WelcomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import DashboardApp from './DashboardApp';
import { MenuProvider } from 'react-native-popup-menu';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <MenuProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              initialRouteName="dashboard"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: COLORS.BACKGROUND },
                animation: 'slide_from_right',
              }}>
              <Stack.Group options={{ headerShown: false }}>
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="welcome" component={WelcomeScreen} />
              </Stack.Group>

              <Stack.Group>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="register" component={RegisterScreen} />
              </Stack.Group>
              <Stack.Screen name="dashboard" component={DashboardApp} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </MenuProvider>
    </>
  );
}
