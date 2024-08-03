import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Diary from '../screens/Diary/Diary';
import MyPage from '../screens/MyPage/MyPage';
// import Mission from '../screens/Mission/Mission';
import SelfTest from '../screens/SelfTest/SelfTest';
import Community from '../screens/Community/Community';

// Mission 네비게이터 import
import { MissionNavigator } from '../screens/Mission/MissionNavigator';
import { SelfTestNavigator } from '../screens/SelfTest/SelfTestNavigator';
import { DiaryNavigator } from '../screens/Diary/DiaryNavigator';
import Login from '../screens/Home/Login';
import Signup from '../screens/Home/Signup';
import HomeNavigator from '../screens/Home/HomeNavigator';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={() => {
        return { headerShown: false };
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="DiaryNavigator" component={DiaryNavigator} />
      <Tab.Screen name="MyPage" component={MyPage} />
      <Tab.Screen name="Mission" component={MissionNavigator} />
      <Tab.Screen name="SelfTest" component={SelfTest} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}