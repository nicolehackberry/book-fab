import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WelcomeScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
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