import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Diary from '../screens/Diary/Diary';
import MyPage from '../screens/MyPage/MyPage';
import Mission from '../screens/Mission/Mission';
import SelfTest from '../screens/SelfTest/SelfTest';
import Community from '../screens/Community/Community';

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
      <Tab.Screen name="Mission" component={Mission} />
      <Tab.Screen name="SelfTest" component={SelfTest} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}