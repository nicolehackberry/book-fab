import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HomeScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        height: 500,
        backgroundColor: 'purple',
    }
})