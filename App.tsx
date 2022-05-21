import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { Provider } from 'react-redux'

import { AppNavigator } from "./src/navigator/AppNavigator";
import { store } from "./src/redux/store";
import WelcomeScreen from "./src/screens/WelcomeScreen";

// const Loading = () => {
//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="gray" />
//     </View>
//   );
// };

export default function App() {
  // const [loading, setLoading] = useState(true);
  // const [viewOnboarding, setViewOnboarding] = useState(false);

  // const checkOnboarding = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@viewedOnboarding');

  //     if(value !== null) {
  //       setViewOnboarding(true);
  //     };
  //   } catch (error) {
  //     console.log('Error @checkOnboarding: ', error);
  //   } finally {
  //     setLoading(false);
  //   };
  // };

  // useEffect(() => {
  //   checkOnboarding();
  // }, []);

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : viewOnboarding ? (
        <AppNavigator />
      ) : (
        <WelcomeScreen />
      )} */}
      <Provider store={store}>
      <AppNavigator />
      </Provider>
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center"
//   }
// });
