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
import {
  getCurrentLogedInUser,
  getCurrentUserData,
} from "../services/firebaseServices";
import { primaryColor } from "../utils/Colors";
import { ICreatorsData } from "./HomeScreen";
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
  console.log("TAG AUTH STATUS: ", authStatus);

  if (authStatus === false)
    return <MissingAuthScreen navigation={navigation} />;
  return <>{children || null}</>;
};

const ProfileScreen: FC<IProfileScreen> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState<User>();
  const [userEmail, setUserEmail] = useState<String>();
  const [fsData, setFsData] = useState<ICreatorsData | null>();

  const fetchCurrentUserData = async () => {
    const data = await getCurrentLogedInUser();

    if (data) {
      //console.log('VAH? data: ', data);
      setUserData(data);
    }
  };

  const fecthCurrentUserData = async (docName: string | null) => {
    console.log(
      "TAG FIRESTORE data of a user: ",
      await getCurrentUserData(docName)
    );
    console.log("TAG kommer vi hit?");
  };

  useEffect(() => {
    if (userData) {
      console.log("TAG lyssnar på user data: ", userData.providerData[0].email);
      fecthCurrentUserData(userData.providerData[0].email);
    }
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
        style={[styles.item]}
        onPress={() => {
          fetchCurrentUserData();

          if (userData) {
            navigation.navigate("CreatorsScreen", {
              isProfile: true,
              docID: userData,
              navigation: navigation,
            });
          }
        }}
      >
        <Text style={[styles.text, { color: primaryColor }]}>Profile</Text>
      </TouchableOpacity>

      <View style={[styles.button, { flex: 3 }]}></View>

      {/* <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          console.log("TAG pressing 1");
        }}
      >
        <Text>Contact us</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          authContext?.logOut();
        }}
      >
        <Text style={[styles.text, { color: primaryColor }]}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.button}></View>
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
  item: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    justifyContent: "center",
  },
  text: {
    paddingLeft: 32
  }
});
