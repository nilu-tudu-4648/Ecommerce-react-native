import {
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import { NAVIGATION } from "../constants/routes";
import DrawerItems from "../../DrawerItems";
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "80%",
        },
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerItems {...props} />}
    >
      <Drawer.Screen name={NAVIGATION.APP_NAVIGATOR} component={AppNavigator} />
    </Drawer.Navigator>
  );
}

