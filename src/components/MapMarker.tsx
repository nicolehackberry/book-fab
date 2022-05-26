import React, { FC } from 'react';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ICreatorLocations } from '../screens/HomeScreen';
import { primaryColor } from "../utils/Colors";

interface IMapMarker {
    data: ICreatorLocations;
}

const MapMarker: FC<IMapMarker> = ({ data }) => {
    
    return (
        <Marker
          coordinate={{ latitude: data.userLocation.latitude, longitude: data.userLocation.longitude }}
          pinColor="#8fd9a8"
          onPress={() => {
            console.log('TAG pressed pin with this info: ', data);
          }}
        >

          <Icon name={'map-pin'} size={24} color={primaryColor} />
          
        </Marker>
    );
};

export default MapMarker;
