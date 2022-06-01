import React, { FC, useEffect, useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { Button, Card, TextInput } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";

interface LoginScreenInterface {
  navigation: NativeStackNavigationProp<any, any>;
}

type FirebaseUser = {
  userName: string;
  password: string;
};

const initialUserState: FirebaseUser = {
  userName: "test@test.se",
  password: "12345678910",
};

export const LoginScreen: FC<LoginScreenInterface> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [userState, setUserState] = useState<FirebaseUser>(initialUserState);

  const onInputChange = (field: string, value: any) => {
    setUserState({
      ...userState,
      [field]: value,
    });
  };

  useEffect(() => {
    setDisabled(
      userState.userName.length === 0 || userState.userName.length === 0
    );
  }, [userState.userName, userState.password]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TextInput
          mode="outlined"
          label="E-mail"
          defaultValue={userState.userName}
          onChangeText={(text) => onInputChange("username", text)}
          right={<TextInput.Icon name="account" onPress={() => {}} />}
          style={styles.textInput}
        />

        <TextInput
          mode="outlined"
          secureTextEntry
          label={"test 1"}
          defaultValue={userState.password}
          right={<TextInput.Icon name="lock" />}
          onChangeText={(text) => onInputChange("password", text)}
          style={styles.textInput}
        />
      </Card>

      <View style={styles.buttonRow}>
        <Button
          mode={"contained"}
          color={"#ffebee"}
          onPress={() => {
            navigation.navigate("RegisterScreen", {
              navigation: navigation,
            });
          }}
        >
          Register
        </Button>

        <Button
          color={disabled ? "gray" : undefined}
          disabled={disabled}
          mode={"contained"}
          icon={"login"}
          onPress={async () => {
            authContext?.login(userState.userName, userState.password);

            if (authContext?.isUserSignedIn) {
              navigation.navigate("ProfileScreen");
            }
          }}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: 15,
  },
  card: {
    flexDirection: "column",
    // marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  textInput: {
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-evenly",
  },
});
