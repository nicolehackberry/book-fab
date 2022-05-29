import React, { FC } from 'react';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';

const MissingAuthScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Create Profile?</Text>
            <Button title='On press?' onPress={() => {
                console.log('Btn pressed? ');
            }}/>
        </View>
    );
};

export default MissingAuthScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
})