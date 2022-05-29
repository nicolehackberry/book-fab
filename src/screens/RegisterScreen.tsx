import React, { FC, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Button, TextInput } from "react-native";
//import {Button, Card, TextInput} from 'react-native-paper';

import { useNavigationContainerRef } from "@react-navigation/native";

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
  // const [loginState, setLoginState] = useState(false);
  // const navigation = useNavigationContainerRef();
  // const authContext = useContext(AuthContext);
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);


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
        <View style={styles.registerForm}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          /> */}

          <TextInput
            placeholder="Displayname"
            style={[styles.margin10]}
            onChangeText={(text) => onFieldChange("displayName", text)}
          />

          <TextInput
            placeholder="E-mail"
            style={[styles.margin10]}
            onChangeText={(text) => onFieldChange("email", text)}
          />

          <TextInput
            secureTextEntry
            placeholder={"text label"}
            style={[styles.margin10]}
            onChangeText={(text) => onFieldChange("password", text)}
          />

          <TextInput
            secureTextEntry
            placeholder={"text label"}
            style={[styles.margin10]}
            onChangeText={(text) => onFieldChange("repeatPassword", text)}
          />
        </View>
      </ScrollView>

      <Button
        color={disabled ? "gray" : undefined}
        disabled={disabled}
        title="title??"
        //style={[styles.margin10]}
        onPress={async () => {
          // await authContext?.register(registerState.displayName, registerState.email, registerState.password);
          // authContext?.login(registerState.displayName, registerState.password)
        }}
      />
      {/* {}
      </Button> */}
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
  },
  textInput: {},
  margin10: {
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
