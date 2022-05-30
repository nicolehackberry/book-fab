import React, { FC, useContext } from "react";
import {
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { AuthContext } from "../contexts/AuthContext";
import MissingAuthScreen from "./MissingAuthScreen";

interface IProfileScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

interface IProtectedItems {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any, any>;
}

const profileList = ["General", "Profile", "Logout", "Contact us"];

const ProtectedItems: React.FC<IProtectedItems> = ({
  children,
  navigation,
}) => {
  const authContext = useContext(AuthContext);
  const authStatus = authContext?.isUserSignedIn;

  if (authStatus === null) return <MissingAuthScreen navigation={navigation} />;
  return <>{children || null}</>;
};

const ProfileScreen: FC<IProfileScreen> = ({ navigation }) => {
  return (
    <ProtectedItems navigation={navigation}>
      {/* <TouchableOpacity
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={() => {
              console.log("TAG pressing 1");
            }}
          >
            <Text>General</Text>
          </TouchableOpacity> */}

      <View style={styles.button}></View>

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          console.log("TAG pressing 1");
        }}
      >
        <Text>Profile</Text>
      </TouchableOpacity>

      <View style={[styles.button, { flex: 3 }]}></View>

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          console.log("TAG pressing 1");
        }}
      >
        <Text>Contact us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          console.log("TAG pressing 1");
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      <View style={styles.button}></View>

      {/* <Button
          title="Press Me!"
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        /> */}
    </ProtectedItems>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 32,
    flexDirection: "column",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    paddingLeft: 32,
    width: "100%",
    justifyContent: "center",
    height: 60,
  },
});
