import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelfTest from './SelfTest';
import TestStart from './TestStart';
import TestReport from './TestReport'
import TestLoading from './TestLoading'
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';
import TestPage from './TestPage';

const Stack = createStackNavigator<SelfTestStackParamList>();

export function SelfTestNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelfTest" component={SelfTest} />
      <Stack.Screen name="TestStart" component={TestStart} />
      <Stack.Screen name="TestReport" component={TestReport} />
      <Stack.Screen name="TestPage" component={TestPage} />
      <Stack.Screen name="TestLoading" component={TestLoading} />
    </Stack.Navigator>
  );
}