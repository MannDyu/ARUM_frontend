import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mission from './Mission';
import CompletedMissionRecord from './CompletedMissionRecord';
import CompletedMissionDetail from './CompletedMissionDetail';
import { MissionStackParamList } from '../../assets/types';
import EditCompletedMission from './EditCompletedMission';
import CompletedMission from './CompletedMission';
import SelectSection from './SelectSection';
import DailyMission from './DailyMisison';

const Stack = createStackNavigator<MissionStackParamList>();

export function MissionNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mission"  component={Mission} />
      <Stack.Screen name="CompletedMission" component={CompletedMission} />
      <Stack.Screen name="CompletedMissionRecord" component={CompletedMissionRecord} />
      <Stack.Screen name="CompletedMissionDetail" component={CompletedMissionDetail} 
        options={{ 
          gestureEnabled: false,
          headerLeft: () => null  // 헤더의 뒤로가기 버튼도 제거
        }}
       />
       <Stack.Screen name="EditCompletedMission" component={EditCompletedMission} />
       <Stack.Screen name="SelectSection" component={SelectSection} />
       <Stack.Screen name="DailyMission"  component={DailyMission} />
    </Stack.Navigator>
  );
}