import React, { FC, useEffect } from "react";
import { StyleSheet, View, Button, Dimensions, Text } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

import { viewedOnboarding, getCreatorsDataFS } from "../redux/actions/localDataActions";
import { RootState } from "../redux/store";
import { primaryColor } from "../utils/Colors";

interface IHomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creatorsLocations = useSelector((state: RootState) => state.localData.creatorLocations);

  useEffect(() => {
    dispatch(getCreatorsDataFS('1xBiFbRDBy4hKfgwvQoN') as any);
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

  var markers = [
    {
      latitude: 17.9415,
      longitude: 59.4391,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    }
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>

        <Marker
          coordinate={{ latitude: 59.4391, longitude: 17.9415 }}
          pinColor="#8fd9a8"
          title={"omnomnomnom"}
        >
          <Icon name={'map-pin'} size={24} color={primaryColor} />
          
        </Marker>

      </MapView>
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
    backgroundColor: 'purple'
  }
});
