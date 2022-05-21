import React, { FC, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IntroSlider from "../components/IntroSlider";

interface IHomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (error) {
      console.log('Error @removeItem: ', error);
    };
  };

  return (
    <View style={styles.container}>
      <IntroSlider />
      <Text>Home Screen</Text>
      <Button
        title="Press Me!"
        onPress={() => {
          clearOnboarding();
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    height: 500,
    backgroundColor: "purple",
  },
});
