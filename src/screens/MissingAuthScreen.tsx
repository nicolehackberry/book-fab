import React, { FC } from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { NoUserComponent } from "../components/NoUserComponent";

interface IMissingAuthScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const MissingAuthScreen: FC<IMissingAuthScreen> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NoUserComponent />
      <Button
        title="Login"
        onPress={() => {
          console.log("Btn pressed? ");
          navigation.navigate("LoginScreen");
        }}
      />
      <Button
        title="Create Profile"
        onPress={() => {
          console.log("Btn pressed? ");
          navigation.navigate("RegisterScreen", {
            navigation: navigation,
          });
        }}
      />
    </View>
  );
};

export default MissingAuthScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
