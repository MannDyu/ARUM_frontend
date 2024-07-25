import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { MissionProvider } from './src/context/MissionContext';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import FindCenter from './src/screens/SelfTest/FindCenter';
import TestReport from './src/screens/SelfTest/TestReport';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <MissionProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="FindCenter" component={FindCenter} />
            <Stack.Screen name="TestReport" component={TestReport} />
          </Stack.Navigator>
      </NavigationContainer>
      </MissionProvider>
    </>
  );
}

