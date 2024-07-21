import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DailyMission from './DailyMission';
import SelectSection from './SelectSection';
import CompleteMissionRecord from './CompleteMissionRecord';

const Stack = createStackNavigator();

const MissionNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DailyMission">
      <Stack.Screen name="DailyMission" component={DailyMission} />
      <Stack.Screen name="SelectSection" component={SelectSection} />
      <Stack.Screen name="CompleteMissionRecord" component={CompleteMissionRecord} />
    </Stack.Navigator>
  );
};

export default MissionNavigator;