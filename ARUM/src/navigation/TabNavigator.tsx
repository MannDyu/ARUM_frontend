import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Diary from '../screens/Diary/Diary';
import MyPage from '../screens/MyPage/MyPage';
import Community from '../screens/Community/Community';


// Mission 네비게이터 import
import { MissionNavigator } from '../screens/Mission/MissionNavigator';
import { SelfTestNavigator } from '../screens/SelfTest/SelfTestNavigator';
import { DiaryNavigator } from '../screens/Diary/DiaryNavigator';

const Tab = createBottomTabNavigator();

const TabBarIcon = (focused: any, name: string) => {
  let iconImagePath;

  if (name == '홈') {
    // iconImagePath = require('./src/assets/images/home.png');
    iconImagePath = require('../assets/images/home.png');
  } else if (name == '랜덤미션') {
    iconImagePath = require('../assets/images/mission.png');
  } else if (name == '감정일기') {
    iconImagePath = require('../assets/images/diary.png');
  } else if (name == '마이페이지') {
    iconImagePath = require('../assets/images/user.png');
  } else if (name == '자가테스트') {
    iconImagePath = require('../assets/images/exam2.png');
  }
  return (
    <Image
      style={{
        width: focused ? 30 : 20,
        height: focused ? 30 : 20,
      }}
      source={iconImagePath}
    />
  );
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
      })}
    >
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="감정일기" component={DiaryNavigator} />
      <Tab.Screen name="랜덤미션" component={MissionNavigator} />
      <Tab.Screen name="자가테스트" component={SelfTestNavigator} />
      <Tab.Screen name="마이페이지" component={MyPage} />
      {/* <Tab.Screen name="Community" component={Community} /> */}
    </Tab.Navigator>
  );
}

export default TabNavigator;