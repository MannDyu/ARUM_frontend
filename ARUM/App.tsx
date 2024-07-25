import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import { MissionProvider } from './src/context/MissionContext';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <MissionProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      </MissionProvider>
    </>
  );
}
