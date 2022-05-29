import { DefaultTheme } from "react-native-paper";
import { primaryColor } from "./Colors";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: primaryColor,
        accent: 'yellow',
    },
};
