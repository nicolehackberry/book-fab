import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabIcon from 'react-native-vector-icons/Ionicons';

import { StackScreens, TabsScreens } from "../helpers/types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { primaryColor } from "../utils/Colors";

export const RootStack = createNativeStackNavigator<StackScreens>();
const Tabs = createBottomTabNavigator<TabsScreens>();

const defaultNavOptions = {
    headerStyle: {
      height: 85,
      elevation: 0,
      shadowColor: 'transparent'
    },
    headerBackTitle: 'Back',
    headerTintColor: primaryColor,
    headerHideShadow: true,
    headerTitle: () => (
      <Text>Book Fab</Text>
    )
  };


function TabsNavigator() {
    return (
    <Tabs.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name == "HomeScreen") {
                iconName = focused ? 'home' : 'home-outline';
            } else if (route.name == "SearchScreen") {
                iconName = focused ? 'search-sharp' : 'search-outline';
            } else if (route.name == "FavoritesScreen") {
                iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name == "ProfileScreen") {
                iconName = focused ? 'user' : 'user-o';
                return <Icon name={iconName} size={24} color={primaryColor} />
            }
            return <TabIcon name={iconName} size={24} color={primaryColor} />
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
      <RootStack.Navigator screenOptions={defaultNavOptions} initialRouteName="WelcomeScreen">
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
