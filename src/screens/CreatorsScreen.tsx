import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CreatorsScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Creators Screen</Text>
        </View>
    );
};

export default CreatorsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        height: 500,
        backgroundColor: 'beige',
    }
})