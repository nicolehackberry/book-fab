import React, { FC } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

interface IFavoritesScreen {
    navigation: NativeStackNavigationProp<any, any>,
}

const FavoritesScreen: FC<IFavoritesScreen> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button  title='Press Me!' onPress={() => { navigation.navigate('HomeScreen') }}/>
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        height: 500,
        backgroundColor: 'purple',
    }
})