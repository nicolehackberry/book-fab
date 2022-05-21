import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import TabIcon from "react-native-vector-icons/Ionicons";

import { primaryColor } from "../utils/Colors";
import { TabsScreens } from "../helpers/types";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

export const TabsNavigator = () => {
  const Tabs = createBottomTabNavigator<TabsScreens>();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name == "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "SearchScreen") {
            iconName = focused ? "search-sharp" : "search-outline";
          } else if (route.name == "FavoritesScreen") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name == "ProfileScreen") {
            iconName = focused ? "user" : "user-o";
            return <Icon name={iconName} size={24} color={primaryColor} />;
          }
          return <TabIcon name={iconName} size={24} color={primaryColor} />;
        },
      })}
    >
      <Tabs.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
