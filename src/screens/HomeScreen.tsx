import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

const HomeScreen: FC = () => {
    return (
        <view style={styles.container}>
            <title>Home Screen</title>
        </view>
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