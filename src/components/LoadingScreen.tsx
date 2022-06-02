import React, { FC } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { primaryColor } from "../utils/Colors";

export const LoadingScreen: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
