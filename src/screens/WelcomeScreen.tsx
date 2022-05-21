import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ContinueBtn } from "../components/ContinueBtn";
import { viewedOnboarding } from "../redux/actions/localDataActions";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");

  const btnText = "Contiunue";
  const title = "Book";
  const subTitle = "Fab";

  const continueBtn = async () => {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      dispatch(viewedOnboarding(true));
    } catch (error) {
      console.log("Error @setItem: ", error);
    }
  };

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
              <Text style={styles.logoText}>{title}</Text>
              <Text style={styles.logoText}>{subTitle}</Text>
            </View>

            <ContinueBtn label={btnText} callback={continueBtn} />
          </View>
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
    alignItems: "center",
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
});
