import React, { FC } from 'react';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { ICreatorsData } from '../screens/HomeScreen';
import { primaryColor } from "../utils/Colors";

interface IMapMarker {
    data: ICreatorsData;
    navigation: NativeStackNavigationProp<any, any>;
}

const MapMarker: FC<IMapMarker> = ({ data, navigation}) => {
    
    return (
        <Marker
          coordinate={{ latitude: data.userLocation.latitude, longitude: data.userLocation.longitude }}
          pinColor="#8fd9a8"
          onPress={() => {
            console.log('TAG pressed pin with this info: ', data);
            navigation.navigate('CreatorsScreen')
          }}
        >

          <Icon name={'map-pin'} size={24} color={primaryColor} />
          
        </Marker>
    );
};

export default MapMarker;
