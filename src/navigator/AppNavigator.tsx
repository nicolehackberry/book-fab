import React, { FC } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import { StackScreens, TabsScreens } from "../helpers/types";

export const RootStack = createNativeStackNavigator<StackScreens>();
const Tab = createBottomTabNavigator<TabsScreens>();


function TabsNavigator() {

}

export function AppNavigator() {
    const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName="WelcomeScreen" id="yygdk">
        <>
          <RootStack.Screen
            name={"WelcomeScreen"}
            component={WelcomeScreen}
            options={{ title: "Welcome Screenooo" }}
          />

          <RootStack.Screen
            name={"HomeScreen"}
            component={HomeScreen}
            options={{ title: "HOME Screenooo" }}
          />
        </>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
