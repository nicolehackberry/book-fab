import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

interface IWelcomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const WelcomeScreen: FC<IWelcomeScreen> = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode={"cover"} // or cover
        style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
        source={require("../assets/model.jpg")}
      >
        <Button
          title="Press Me!"
          onPress={() => {
            navigation.push("HomeScreen");
          }}
        />
      </ImageBackground>
      <Button
        title="Press Me!"
        onPress={() => {
          navigation.push("HomeScreen");
        }}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    height: 500,
    backgroundColor: "pink",
  },
});
