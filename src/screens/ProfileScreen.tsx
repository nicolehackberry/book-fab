import React, { FC } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

interface IProfileScreen {
    navigation: NativeStackNavigationProp<any, any>,
}

const ProfileScreen: FC<IProfileScreen> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button  title='Press Me!' onPress={() => { navigation.navigate('HomeScreen') }}/>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        height: 500,
        backgroundColor: 'green',
    }
})