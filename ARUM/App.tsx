import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
}
