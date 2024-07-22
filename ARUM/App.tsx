import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import MyPage from './src/screens/MyPage/MyPage';
import Home from './src/screens/Home/Home';
import Mission from './src/screens/Mission/Mission';
import SelfTest from './src/screens/SelfTest/SelfTest';
import Diary from './src/screens/Diary/Diary';
import Community from './src/screens/Community/Community';
import CompletedMission from './src/screens/Mission/CompletedMission';
import CompletedMissionDetail from './src/screens/Mission/CompletedMissionDetail';

export type RootStackParamList = {
  TabNavigator: undefined;
  CompletedMissionDetail: { mission: any }; // 필요에 따라 타입 정의
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={() => {
          return { headerShown: false };
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Diary} />
        <Tab.Screen name="MyPage" component={MyPage} />
        <Tab.Screen name="Mission" component={Mission} />
        <Tab.Screen name="SelfTest" component={SelfTest} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="CompletedMission" component={CompletedMission} />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="inverted" />
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="TabNavigator">
            <Stack.Screen 
              name="TabNavigator" 
              component={TabNavigator} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="CompletedMissionDetail" 
              component={CompletedMissionDetail} 
              options={{ title: "Completed Mission Detail" }} 
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


