import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import Login from './Login';
import Signup from './Signup';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})