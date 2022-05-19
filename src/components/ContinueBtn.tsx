import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface IButton {
  label: string;
  callback: () => void;
}

export const ContinueBtn: FC<IButton> = ({ label, callback }) => {
  return (
    <TouchableOpacity style={styles.continueBtn} onPress={callback}>
      <View style={styles.test}>
        <Text style={styles.text}>{label}</Text>
        <Icon name={"angle-right"} size={24} color={"white"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
