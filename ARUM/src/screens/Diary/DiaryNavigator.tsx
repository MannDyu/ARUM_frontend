import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Diary from './Diary';
import RecordDiary from './RecordDiary';
import { RootStackParamList } from '../../types';

const Stack = createStackNavigator<RootStackParamList>();


export function DiaryNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Diary" component={Diary} />
      <Stack.Screen name="RecordDiary" component={RecordDiary} />
    </Stack.Navigator>
  );
}

export default DiaryNavigator;