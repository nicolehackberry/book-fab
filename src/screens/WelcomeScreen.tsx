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
import Icon from 'react-native-vector-icons/FontAwesome';


interface IWelcomeScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

interface IButton {
    label: string;
    callback: () => void;
}

const ContinueBtn: FC<IButton> = ({ label, callback }) => {
  <Icon name={'home'} size={24} color={'black'} />;

  return (
    <TouchableOpacity
      style={styles.continueBtn}
      onPress={callback}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const WelcomeScreen: FC<IWelcomeScreen> = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const btnText = "Contiunue";

  const btnAction = () => {
    console.log('Btn actionnn');
      
    navigation.push("HomeScreen");
  }

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

              <ContinueBtn label={btnText} callback={btnAction}/>


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
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  continueBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 36,
    backgroundColor: "pink",
    borderRadius: 10,
  },
});
