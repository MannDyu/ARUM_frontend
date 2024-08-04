import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelfTest from './SelfTest';
import TestStart from './TestStart';
import TestReport from './TestReport'
import TestLoading from './TestLoading'
import TestPage from './TestPage';
import FindCenter from './FindCenter';
import { RootStackParamList } from '../../navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

export function SelfTestNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelfTestMain" component={SelfTest} />
      <Stack.Screen name="TestStart" component={TestStart} />
      <Stack.Screen name="TestReport" component={TestReport} />
      <Stack.Screen name="TestPage" component={TestPage} />
      <Stack.Screen name="TestLoading" component={TestLoading} />
      <Stack.Screen name="FindCenter" component={FindCenter} />
    </Stack.Navigator>
  );
}