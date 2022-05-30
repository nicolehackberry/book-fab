import { User } from "firebase/auth";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { AuthContext } from "../contexts/AuthContext";
import { getCurrentLogedInUser } from "../services/firebaseServices";
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
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState<User>();

  const fetchCurrentUserData = async () => {
    const data = await getCurrentLogedInUser();

    if(data) {
      setUserData(data);
    };
  };

  useEffect(() => {
    if(userData) {
      console.log('TAG lyssnar på user data: ', userData.providerData[0].email);
    };
  }, [userData]);

  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  
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

          // console.log('TAG current user: ', getCurrentLogedInUser());

          

          // navigation.navigate("CreatorsScreen", {
          //   creatorData: data,
          // });

          console.log("TAG pressing Profile");
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
          authContext?.logOut();
          console.log('TAG logout user');
          
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
