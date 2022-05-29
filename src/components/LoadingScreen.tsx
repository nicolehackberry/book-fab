import React, { FC } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export const LoadingScreen: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
