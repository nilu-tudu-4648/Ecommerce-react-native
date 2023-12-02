import React from "react";
import "react-native-gesture-handler";
import { store } from "./src/store/configureStore";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    "OpenSans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  // eas build -p android --profile preview
  // eas update --branch preview --message "Updating the app"
  // eas build --platform android
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <DrawerNavigator />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
