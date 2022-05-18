import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IntroSlider: FC = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <StatusBar />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
        >
          <View style={{ width, height }}>
            <Text>Screen 1</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 2</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 3</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 4</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 5</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    height: 300,
    width: 300,
    backgroundColor: "green",
  },
  statusBar: {
    backgroundColor: "black",
    color: "white",
  },
});
