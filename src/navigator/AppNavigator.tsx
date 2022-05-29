import React, { useEffect } from "react";
import { Text } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";

import { StackScreens } from "../helpers/types";
import WelcomeScreen from "../screens/WelcomeScreen";
import { primaryColor } from "../utils/Colors";
import { RootState } from "../redux/store";
import { viewedOnboarding } from "../redux/actions/localDataActions";
import { LoadingScreen } from "../components/LoadingScreen";
import { TabsNavigator } from "./TabsNavigator";
import CreatorsScreen from "../screens/CreatorsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

export const RootStack = createNativeStackNavigator<StackScreens>();

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

const Navigation = () => (
  <RootStack.Navigator screenOptions={navOptions}>
    <RootStack.Screen name="TabsNavigator" component={TabsNavigator} />
    <RootStack.Screen name="CreatorsScreen" component={CreatorsScreen} />
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
  </RootStack.Navigator>
);

const Welcome = () => (
  <RootStack.Navigator screenOptions={navOptions}>
    <RootStack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
  </RootStack.Navigator>
);

const Loading = () => (
  <RootStack.Navigator screenOptions={navOptions}>
    <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
  </RootStack.Navigator>
);

export function AppNavigator() {
  const dispatch = useDispatch();
  const navigationRef = useNavigationContainerRef();
  const viewOnboarding = useSelector(
    (state: RootState) => state.localData.viewOnBoarding
  );

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      dispatch(viewedOnboarding(value != null ? JSON.parse(value) : false));
    } catch (error) {
      console.log("Error @checkOnboarding: ", error);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {viewOnboarding ? <Navigation /> : <Welcome />}
    </NavigationContainer>
  );
}
