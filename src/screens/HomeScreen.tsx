import React, { FC, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";

import {
  viewedOnboarding,
  getCreatorsDataFS,
} from "../redux/actions/localDataActions";
import { RootState } from "../redux/store";
import MapMarker from "../components/MapMarker";

interface IHomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

export interface ICreatorLocations {
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creatorsLocations = useSelector(
    (state: RootState) => state.localData.creatorLocations
  );

  useEffect(() => {
    dispatch(getCreatorsDataFS() as any);
  }, []);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
      dispatch(viewedOnboarding(false));
    } catch (error) {
      console.log("Error @removeItem: ", error);
    }
  };

  return creatorsLocations ? (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {creatorsLocations.map((item: ICreatorLocations, index: number) => (
          <MapMarker key={index} data={item} />
        ))}
      </MapView>
      <Button title="Press Me!" onPress={clearOnboarding} />
    </View>
  ) : (
    <></>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    height: 500,
  },
  map: {
    padding: 15,
    justifyContent: "center",
    height: 500,
    backgroundColor: "purple",
  },
  marker: {
    height: 24,
    width: 24,
    borderRadius: 100,
    backgroundColor: "purple",
  },
});
