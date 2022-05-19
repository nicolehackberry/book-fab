import React, { FC, useState, useEffect } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  PinyonScript_400Regular,
} from "@expo-google-fonts/pinyon-script";

interface IWelcomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

interface IButton {
  label: string;
  callback: () => void;
}

const ContinueBtn: FC<IButton> = ({ label, callback }) => {
  return (
    <TouchableOpacity style={styles.continueBtn} onPress={callback}>
      <View style={styles.test}>
        <Text style={styles.text}>{label}</Text>
        <Icon name={"angle-right"} size={24} color={"white"} />
      </View>
    </TouchableOpacity>
  );
};

const WelcomeScreen: FC<IWelcomeScreen> = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const btnText = "Contiunue";
  let [fontsLoaded] = useFonts({
    PinyonScript_400Regular,
  });

  let fontSize = 24;
  let paddingVertical = 8;

  const continueBtn = () => {
    navigation.push("HomeScreen");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
            <View style={styles.container}>
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoText}>Book</Text>
                <Text style={styles.logoText}>Fab</Text>
              </View>

              <ContinueBtn label={btnText} callback={continueBtn} />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
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
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "30%",
  },
  logoTextContainer: {
    justifyContent: "flex-start",
    alignItems: 'center',
    height: "80%",
    width: "100%",
  },
  logoText: {
    display: "flex",
    fontFamily: "PinyonScript_400Regular",
    color: "#FFFF",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 1.0,
  },
  text: {
    color: "#FFFF",
    fontSize: 18,
    paddingEnd: 32,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 1.0,
    fontFamily: "Pinyon Script",
  },
  continueBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 36,
    backgroundColor: "rgba(255, 100, 127, 0.17)",
    borderRadius: 10,
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
  },
});
