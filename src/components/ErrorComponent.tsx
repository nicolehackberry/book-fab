import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { secondaryColor } from "../utils/Colors";

export const ErrorComponent: FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: secondaryColor }]}>
      <Card style={styles.card}>
        <Text
          style={[
            styles.text,
            { fontSize: 32, fontFamily: "PinyonScript_400Regular" },
          ]}
        >
          Sorry!
        </Text>
        <Text style={[styles.text, { fontSize: 16 }]}>
          This user has not uploaded any data
        </Text>
        <Text style={[styles.text, { fontSize: 16 }]}>Try again later</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    color: "#97002B",
    fontWeight: "bold",
    opacity: 1.0,
  },
});
