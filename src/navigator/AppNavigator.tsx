import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import TabIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StackScreens, TabsScreens } from "../helpers/types";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { primaryColor } from "../utils/Colors";

export const RootStack = createNativeStackNavigator<StackScreens>();
const Tabs = createBottomTabNavigator<TabsScreens>();

const navOptions = {
  headerStyle: {
    backgroundColor: "white",
    height: 85,
    elevation: 0,
    shadowColor: "transparent",
  },
  headerBackTitle: "Back",
  headerTintColor: primaryColor,
  gestureEnabled: false,
  headerHideShadow: true,
  headerMode: "float",
  headerTitle: () => <Text>Book Fab</Text>,
};

function TabsNavigator() {
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
}

export function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@first_time_loggedin");
      console.log("Data fetched: ", jsonValue);

      //setIsFirstLogin(jsonValue != null ? JSON.parse(jsonValue) : null);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("Error in reading value from Async Storage: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={navOptions}>
        <>
          {isFirstLogin ? (
            <RootStack.Screen
              name={"WelcomeScreen"}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <RootStack.Screen
              name={"TabsNavigator"}
              component={TabsNavigator}
              options={{ title: "tralöalalala" }}
            />
          )}
        </>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
