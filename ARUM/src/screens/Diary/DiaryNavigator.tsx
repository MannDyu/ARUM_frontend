import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Diary from './Diary';
import RecordDiary from './RecordDiary';
import DiaryEmoji from './DiaryEmoji';
import DiaryEmotion from './DiaryEmotion'
import DiaryThumbnail from './DiaryThumbnail';
import DiaryDetail from './DiaryDetail';
import Home from '../Home/Home'
import { RootStackParamList } from '../../navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

export function DiaryNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiaryMain" component={Diary} />
      <Stack.Screen name="RecordDiary" component={RecordDiary} />
      <Stack.Screen name="DiaryEmoji" component={DiaryEmoji} />
      <Stack.Screen name="DiaryEmotion" component={DiaryEmotion} />
      <Stack.Screen name="DiaryThumbnail" component={DiaryThumbnail} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
    </Stack.Navigator>
  );
}

export default DiaryNavigator;