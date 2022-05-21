import React, { FC, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import IntroSlider from "../components/IntroSlider";
import { viewedOnboarding, getTESTFromFS1 } from "../redux/actions/localDataActions";
import { RootState } from "../redux/store";

interface IHomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creatorsLocations = useSelector((state: RootState) => state.localData.creatorLocations);

  useEffect(() => {
    dispatch(getTESTFromFS1() as any);
  },[])

  useEffect(() => {
    if(creatorsLocations) {
      console.log('creatorsLocations: ', creatorsLocations);
    };
  }, [creatorsLocations]);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
      dispatch(viewedOnboarding(false));
    } catch (error) {
      console.log("Error @removeItem: ", error);
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
