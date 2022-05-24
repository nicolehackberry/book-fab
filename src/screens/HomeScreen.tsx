import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Button, Platform, Text } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import Device from "expo-device";
import * as Location from "expo-location";

import {
  viewedOnboarding,
  getCreatorsDataFS,
} from "../redux/actions/localDataActions";
import { RootState } from "../redux/store";
import MapMarker from "../components/MapMarker";
import { LocationObject } from "expo-location";
import { LoadingScreen } from "../components/LoadingScreen";

interface IHomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

export interface ICreatorLocations {
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

export interface ILocation extends React.HTMLProps<HTMLCollection> {
  setLocation: (location: LocationObject) => void;
}

export const FetchLocation: FC<ILocation> = ({ setLocation }) => {
  const [locationInternal, setLocationInternal] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationInternal(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (locationInternal) {
    text = JSON.stringify(locationInternal);
  }

  return (
    <View style={styles.container}>
      <Text style={{ backgroundColor: "pink" }}>{text}</Text>
    </View>
  );
};

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

interface IInitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creatorsLocations = useSelector(
    (state: RootState) => state.localData.creatorLocations
  );
  const [location, setLocation] = useState<LocationObject>();
  const [userLocation, setUserLocation] =
    useState<IInitialRegion>(initialRegion);

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

  const onRegionChange = (region: IInitialRegion) => {
    setUserLocation(region);
  };

  useEffect(() => {
    if (location) {
      setUserLocation((prevState) => ({
        ...prevState,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    }
  }, [location]);

  useEffect(() => {
    if (userLocation) {
      console.log("TAG USER location: ", userLocation);
    }
  }, [userLocation]);

  return (
    creatorsLocations && (
      <View style={styles.container}>
        {location ? (
          <>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0221,
              }}
              onRegionChange={onRegionChange}
            >
              {creatorsLocations.map(
                (item: ICreatorLocations, index: number) => (
                  <MapMarker key={index} data={item} />
                )
              )}
            </MapView>
          </>
        ) : (
          <>
            <LoadingScreen />
          </>
        )}

        <FetchLocation
          setLocation={(value: LocationObject) => setLocation(value)}
        />
        <Button title="Press Me!" onPress={clearOnboarding} />
      </View>
    )
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
});
