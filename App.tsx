import { useEffect } from "react";
import { Provider } from "react-redux";
import {
  useFonts,
  PinyonScript_400Regular,
} from "@expo-google-fonts/pinyon-script";
import { Provider as PaperProvider } from "react-native-paper";

import { AppNavigator } from "./src/navigator/AppNavigator";
import { store } from "./src/redux/store";
//import { fbInit } from "./src/services/firebaseServices";
import { LoadingScreen } from "./src/components/LoadingScreen";
import { fbInit } from "./src/services/firebaseServices";
import { theme } from "./src/utils/themes";

export default function App() {
  let [fontsLoaded] = useFonts({
    PinyonScript_400Regular,
  });

  useEffect(() => {
    fbInit();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </PaperProvider>
  );
}
