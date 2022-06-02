import React, { FC } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Button } from "react-native-paper";

import { NoUserComponent } from "../components/NoUserComponent";
import { primaryColor } from "../utils/Colors";

interface IMissingAuthScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const MissingAuthScreen: FC<IMissingAuthScreen> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NoUserComponent>
        <View style={styles.buttonRow}>
          <Button
            color={"#ffebee"}
            mode={"contained"}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            Login
          </Button>
          <Button
            color={primaryColor}
            mode={"contained"}
            onPress={() => {
              navigation.navigate("RegisterScreen", {
                navigation: navigation,
              });
            }}
          >
            Create profile
          </Button>
        </View>
      </NoUserComponent>
    </View>
  );
};

export default MissingAuthScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffebee",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-evenly",
  },
});
