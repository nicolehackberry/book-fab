import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Button, Text} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";

import {
  viewedOnboarding,
  getCreatorsDataFS,
  useCurrentUserLocation,
  userLocation,
} from "../redux/actions/localDataActions";
import { RootState } from "../redux/store";
import MapMarker from "../components/MapMarker";
import { LocationObject } from "expo-location";
import { LoadingScreen } from "../components/LoadingScreen";
import LocationFetcher from "../components/LocationFetcher";

interface IHomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

export interface ICreatorsData {
    description: string;
    email: string;
    expertise: string;
    id: string;
    name: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
    test: boolean;
    userLocation: {
      latitude: number;
      longitude: number;
    };
};

interface IInitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creatorsLocations = useSelector(
    (state: RootState) => state.localData.creatorLocations
  );
  const useUserLocation = useSelector((state: RootState) => state.localData.useUserLocation);
  const [location, setLocation] = useState<LocationObject>();
  const [regionOnChange, setRegionOnChange] =
    useState<IInitialRegion>(initialRegion);

  const [pin, setPin] = useState({
    latitude: 59.62210052300712,
    longitude: 18.791429741098028,
    altitude: 17.961627960205078,
    timestamp: 675250850470.678,
    accuracy: 4033.360920173482,
    speed: -1,
    heading: -1,
    isFromMockProvider: false,
  });

  const isUserLocationPermissionGranted = async () => {
    try {
      const value = await AsyncStorage.getItem("@useUserLocation");
      if (value !== null) {
        dispatch(useCurrentUserLocation(value));
      }
    } catch (error) {
      console.log("Error in retrieving data (HomeScreen.tsx: ", error);
    }
  };

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
      dispatch(viewedOnboarding(false));
    } catch (error) {
      console.log("Error @removeItem: ", error);
    }
  };

  const onRegionChange = (region: IInitialRegion) => {
    setRegionOnChange(region);
  };

  useEffect(() => {
    dispatch(getCreatorsDataFS() as any);
    isUserLocationPermissionGranted();
  }, []);

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
              showsUserLocation={useUserLocation === 'true' ? true : false}
              onUserLocationChange={(e) => {
                if(useUserLocation) {
                  dispatch(userLocation(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude))

                  
                };
                // console.log(
                //   "TAG on user location change: ",
                //   e.nativeEvent.coordinate
                // );
                setPin(e.nativeEvent.coordinate);
              }}
            >
              {creatorsLocations.map(
                (item: ICreatorsData, index: number) => (
                  <MapMarker key={index} data={item} navigation={navigation} />
                )
              )}

              {/* <View style={{ height: 300, width: 300, backgroundColor: 'purple' }}><Text>Testar denna div</Text></View> */}
            </MapView>
          </>
        ) : (
          <>
            <LoadingScreen />
          </>
        )}

        <LocationFetcher
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
    height: 700,
    backgroundColor: "purple",
  },
});
