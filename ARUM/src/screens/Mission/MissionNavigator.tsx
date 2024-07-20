import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mission from './Mission';
import CompletedMissionRecord from './CompletedMissionRecord';
import CompletedMissionDetail from './CompletedMissionDetail';
import { MissionStackParamList } from '../../assets/types';

const Stack = createStackNavigator<MissionStackParamList>();

export function MissionNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MissionMain" component={Mission} />
      <Stack.Screen name="CompletedMissionRecord" component={CompletedMissionRecord} />
      <Stack.Screen name="CompletedMissionDetail" component={CompletedMissionDetail} />
    </Stack.Navigator>
  );
}