import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MissionProvider } from './src/context/MissionContext';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './src/navigation/TabNavigator';
import Home from './src/screens/Home/Home';
import FindCenter from './src/screens/SelfTest/FindCenter';
import TestReport from './src/screens/SelfTest/TestReport';
import RecordDiary from './src/screens/Diary/RecordDiary';
import DiaryThumbnail from './src/screens/Diary/DiaryThumbnail';
import DiaryDetail from './src/screens/Diary/DiaryDetail';
import { RootStackParamList } from './src/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <MissionProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        {/* <Stack.Screen name="Home" component={Home} /> //! DrawerNavigator 없애기위해 삭제
        <Stack.Screen name="FindCenter" component={FindCenter} />
        <Stack.Screen name="TestReport" component={TestReport} />
        <Stack.Screen name="RecordDiary" component={RecordDiary} />
        <Stack.Screen name="DiaryThumbnail" component={DiaryThumbnail} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetail} /> */}
      </Stack.Navigator>
      </NavigationContainer>
      </MissionProvider>
    </>
  );
}

