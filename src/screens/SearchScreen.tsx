import React, { FC } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

interface ISearchScreen {
    navigation: NativeStackNavigationProp<any, any>,
}

const SearchScreen: FC<ISearchScreen> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Search Screen</Text>
            <Button  title='Press Me!' onPress={() => { navigation.navigate('HomeScreen') }}/>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        height: 500,
        backgroundColor: 'pink',
    }
})