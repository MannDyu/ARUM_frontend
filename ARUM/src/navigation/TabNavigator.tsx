import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Diary from '../screens/Diary/Diary';
import MyPage from '../screens/MyPage/MyPage';
import Community from '../screens/Community/Community';

// Mission 네비게이터 import
import { MissionNavigator } from '../screens/Mission/MissionNavigator';
import { SelfTestNavigator } from '../screens/SelfTest/SelfTestNavigator';


const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator  
      screenOptions={() => {
        return { headerShown: false };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Diary" component={Diary} />
      <Tab.Screen name="MyPage" component={MyPage} />
      <Tab.Screen name="MissionNavigator" component={MissionNavigator} />
      <Tab.Screen name="SelfTestNavigator" component={SelfTestNavigator} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}