import React, { FC } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

interface IWelcomeScreen {
    navigation: NativeStackNavigationProp<any, any>,
};


const WelcomeScreen: FC<IWelcomeScreen> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
            <Button  title='Press Me!' onPress={() => { navigation.push('HomeScreen') }}/>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        height: 500,
        backgroundColor: 'pink',
    }
})