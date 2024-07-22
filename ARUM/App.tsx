import * as React from 'react';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyPage from './src/screens/MyPage/MyPage'
import Home from './src/screens/Home/Home'
import Mission from './src/screens/Mission/Mission'
import SelfTest from './src/screens/SelfTest/SelfTest'
import Diary from './src/screens/Diary/Diary'
import Community from './src/screens/Community/Community'


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

      </Tab.Navigator>
    );
  }



  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.tsx to start working on your app!</Text> */}
    //   <Text style={{backgroundColor:'yellow'}}>TEAM Manndyu's ARUManzim Project APP START!!! </Text>
    //   <StatusBar style="auto" />
    // </View>
        <>
        <StatusBar style="inverted" />
        <NavigationContainer>
          <Drawer.Navigator screenOptions={{ drawerPosition: "left" }}>
            <Drawer.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ title: "Main" }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </>
  );
}
