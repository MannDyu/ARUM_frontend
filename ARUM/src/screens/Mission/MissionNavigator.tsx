import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mission from './Mission';
import CompletedMissionRecord from './CompletedMissionRecord';
import CompletedMissionDetail from './CompletedMissionDetail';
import { MissionStackParamList } from '../../assets/types';
import EditCompletedMission from './EditCompletedMission';
import CompletedMission from './CompletedMission';

const Stack = createStackNavigator<MissionStackParamList>();

export function MissionNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MissionMain" component={Mission} />
      <Stack.Screen name="CompletedMission" component={CompletedMission} />
      <Stack.Screen name="CompletedMissionRecord" component={CompletedMissionRecord} />
      <Stack.Screen name="CompletedMissionDetail" component={CompletedMissionDetail} 
        options={{ 
          gestureEnabled: false,
          headerLeft: () => null  // 헤더의 뒤로가기 버튼도 제거
        }}
       />
       <Stack.Screen name="EditCompletedMission" component={EditCompletedMission} />
    </Stack.Navigator>
  );
}