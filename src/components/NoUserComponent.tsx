import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { secondaryColor } from "../utils/Colors";

interface IChildren {
  children: React.ReactNode;
}

export const NoUserComponent: FC<IChildren> = ({ children }) => {
  return (
    <View style={[styles.container, { backgroundColor: secondaryColor }]}>
      <Card style={styles.card}>
        <Text
          style={[
            styles.text,
            { fontSize: 32, fontFamily: "PinyonScript_400Regular" },
          ]}
        >
          Become a Creator!
        </Text>
        <Text style={[styles.text, { fontSize: 16 }]}>
          would you like to becoma a creator to proceed to the profile screen?
        </Text>
        {children}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      height: 200,
  },
  card: {
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
