import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

const WelcomeScreen: FC = () => {
    return (
        <view style={styles.container}>
            <title>Welcome Screen</title>
        </view>
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