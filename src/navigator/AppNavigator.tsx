import React, { FC } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { StackScreens, TabsScreens } from "../helpers/types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

export const RootStack = createNativeStackNavigator<StackScreens>();
const Tabs = createBottomTabNavigator<TabsScreens>();


function TabsNavigator() {
    return (
    <Tabs.Navigator screenOptions={({ route }) => ({
        tabBarIcon: () => {
            let iconName = "";
            if (route.name == "HomeScreen") {
                iconName = "home"
            } else if (route.name == "SearchScreen") {
                iconName = "favorite"
            } else if (route.name == "FavoritesScreen") {
                iconName = "favorite"
            } else if (route.name == "ProfileScreen") {
                iconName = "favorite"
            }
            return <MaterialIcons name={"home"} color="#111a27" size={24} />
        }
    })}>
        <Tabs.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
        <Tabs.Screen options={{headerShown: false}} name="SearchScreen" component={SearchScreen} />
        <Tabs.Screen options={{headerShown: false}} name="FavoritesScreen" component={FavoritesScreen} />
        <Tabs.Screen options={{headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
    </Tabs.Navigator>
    )
};

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
            component={TabsNavigator}
            options={{ title: "HOME Screenooo" }}
          />
        </>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
