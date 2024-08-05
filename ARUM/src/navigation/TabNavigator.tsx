import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPage from '../screens/MyPage/MyPage';
// import Mission from '../screens/Mission/Mission';
import SelfTest from '../screens/SelfTest/SelfTest';
import Diary from '../screens/Diary/Diary';
import Home from '../screens/Home/Home';
import Community from '../screens/Community/Community';

// Mission 네비게이터 import
import { DiaryNavigator } from '../screens/Diary/DiaryNavigator';
import { MissionNavigator } from '../screens/Mission/MissionNavigator';
import HomeNavigator from '../screens/Home/HomeNavigator';
import Login from '../screens/Home/Login';
import Signup from '../screens/Home/Signup';
// -----------------------------------------------------------
import { SelfTestNavigator } from '../screens/SelfTest/SelfTestNavigator';
import { createIconSet } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const TabBarIcon = (focused: boolean, name: string) => {
  let iconImagePath;

  switch (name) {
    case 'HomeMain':
      iconImagePath = require('../assets/images/home.png');
      break;
    case 'Mission':
      iconImagePath = require('../assets/images/mission.png');
      break;
    case 'Diary':
      iconImagePath = require('../assets/images/diary.png');
      break;
    case 'MyPage':
      iconImagePath = require('../assets/images/user.png');
      break;
    case 'SelfTest':
      iconImagePath = require('../assets/images/exam2.png');
      break;
  }

  return (
    <Image 
      style={{
        width: focused ? 30 : 20,
        height: focused ? 30 : 20,
      }}
      source={iconImagePath}
    />
  )
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='HomeMain'
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name)
      })}
    >
      <Tab.Screen name="HomeMain" component={HomeNavigator} />
      <Tab.Screen name="Diary" component={DiaryNavigator} />
      <Tab.Screen name="Mission" component={MissionNavigator} />
      <Tab.Screen name="SelfTest" component={SelfTestNavigator} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}