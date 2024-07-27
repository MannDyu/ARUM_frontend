import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './TabNavigator';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
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

export default DrawerNavigator;