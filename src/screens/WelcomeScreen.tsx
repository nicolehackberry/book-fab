import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

interface IWelcomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const WelcomeScreen: FC<IWelcomeScreen> = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={containerStyle(height, width).container}>
      <ImageBackground
        resizeMode={"cover"}
        style={styles.image}
        source={require("../assets/model.jpg")}
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => {
              navigation.push("HomeScreen");
            }}>
                <Text>Presss me!</Text>
            </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const containerStyle = (height: number, width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      height: height,
      width: width,
    },
  });

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  gradient: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  continueBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: 36,
      backgroundColor: 'pink'
  }
});
