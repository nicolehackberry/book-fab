import React, { FC, useEffect, useState } from "react";
import { View, Platform, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Device from "expo-device";
import * as Location from "expo-location";

import { LocationObject } from "expo-location";
import { userLocation } from "../redux/actions/localDataActions";
import { useDispatch } from "react-redux";

interface ILocation extends React.HTMLProps<HTMLCollection> {
  setLocation: (location: LocationObject) => void;
}

const LocationFetcher: FC<ILocation> = ({ setLocation }) => {
  const dispatch = useDispatch();
  const [locationInternal, setLocationInternal] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

  const setUserLocationPermission = async (useLocation: string) => {
    try {
      await AsyncStorage.setItem("@useUserLocation", useLocation);
    } catch (error) {
      console.log("Error @setItem: ", error);
    }
  };

  const fetchUserLocation = async () => {
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setUserLocationPermission("false");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(userLocation(location.coords.latitude, location.coords.longitude));
    setLocation(location);
    setLocationInternal(location);
    setUserLocationPermission("true");
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (locationInternal) {
    text = JSON.stringify(locationInternal);
  }

  return (
    <></>
  );
};

export default LocationFetcher;
