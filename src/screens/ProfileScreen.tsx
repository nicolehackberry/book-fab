import React, { FC, useEffect } from "react";
import { StyleSheet, Text, Button, Dimensions, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { getCurrentLogedInUser } from "../services/firebaseServices";
import MissingAuthScreen from "./MissingAuthScreen";

interface IProfileScreen {
  navigation: NativeStackNavigationProp<any, any>;
}

const ProtectedItems: React.FC = ({ children }) => {
  const authStatus = getCurrentLogedInUser();
  if (authStatus === null) return <MissingAuthScreen />;
  return <>{children || null}</>;
};

const ProfileScreen: FC<IProfileScreen> = ({ navigation }) => {
  useEffect(() => {
    console.log("TAG USER?: ", getCurrentLogedInUser());
  }, []);

  return (
    <ProtectedItems>
      <ScrollView style={styles.container}>
        <Text>Profile Screen</Text>
        <Button
          title="Press Me!"
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        />
      </ScrollView>
    </ProtectedItems>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "green",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
