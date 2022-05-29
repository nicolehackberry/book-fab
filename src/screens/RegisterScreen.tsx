import React, { FC, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";

import { useNavigationContainerRef } from "@react-navigation/native";
import { register } from "../redux/actions/localDataActions";

type IRegisterScreen = {
  displayName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const initialRegisterState: IRegisterScreen = {
  displayName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterScreen: FC = (props: any) => {
  const [disabled, setDisabled] = useState(false);

  const [registerState, setRegisterState] = useState(initialRegisterState);

  const onFieldChange = (field: string, value: any) => {
    setRegisterState({
      ...registerState,
      [field]: value,
    });
  };

  useEffect(() => {
    setDisabled(
      registerState.displayName?.length === 0 ||
        registerState.email?.length === 0 ||
        registerState.password?.length === 0 ||
        registerState.repeatPassword?.length === 0 ||
        registerState.password !== registerState?.repeatPassword
    );
  }, [registerState]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.registerForm}>
          <TextInput
            mode="outlined"
            label="Displayname"
            style={[styles.input]}
            onChangeText={(text) => onFieldChange("displayName", text)}
          />

          <TextInput
            mode="outlined"
            label="E-mail"
            style={[styles.input]}
            onChangeText={(text) => onFieldChange("email", text)}
          />

          <TextInput
            secureTextEntry
            mode={"outlined"}
            label={"Lösenord"}
            style={[styles.input]}
            onChangeText={(text) => onFieldChange("password", text)}
          />

          <TextInput
            secureTextEntry
            mode={"outlined"}
            label={"Lösenord"}
            style={[styles.input]}
            onChangeText={(text) => onFieldChange("repeatPassword", text)}
          />
        </Card>
      </ScrollView>

      <Button
        color={disabled ? "gray" : undefined}
        disabled={disabled}
        style={[styles.input]}
        onPress={async () => {
          console.log("TAG pressed btn");
          register(
            registerState.displayName,
            registerState.email,
            registerState.password
          );

          // await authContext?.register(
          //   registerState.displayName,
          //   registerState.email,
          //   registerState.password
          // );
          // authContext?.login(registerState.displayName, registerState.password);
        }}
      >
        Button
        {/* {translate(tokens.screens.loginScreen.registerBtnText)} */}
      </Button>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    height: 500,
  },
  registerForm: {
    flexDirection: "column",
    width: "100%",
    padding: 16,
  },
  input: {
    margin: 10,
  },
  focus: {
    backgroundColor: "green",
  },
});
