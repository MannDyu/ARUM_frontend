import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import MyPage from './src/screens/MyPage'
import Home from './src/screens/Home'
import Quest from './src/screens/Quest'
import SelfTest from './src/screens/SelfTest'
import Diary from './src/screens/Diary'
import Community from './src/screens/Community'
import CompletedMission from './src/screens/CompletedMission';
import CompleteMissionDetail from './src/screens/CompletedMissionDetail';

interface Mission {
  id: string;
  date: string;
  title: string;
  category: string;
}

export type RootStackParamList = {
  DrawerNavigator: undefined;
  CompletedMission: undefined;
  CompleteMissionDetail: { mission: Mission };
};

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

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
      <Tab.Screen name="Quest" component={Quest} />
      <Tab.Screen name="SelfTest" component={SelfTest} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ drawerPosition: "left" }}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ title: "Main" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="inverted" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DrawerNavigator">
          <Stack.Screen 
            name="DrawerNavigator" 
            component={DrawerNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="CompletedMission" 
            component={CompletedMission} 
          />
          <Stack.Screen 
            name="CompleteMissionDetail" 
            component={CompleteMissionDetail} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
