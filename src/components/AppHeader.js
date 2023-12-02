import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { COLORS, FSTYLES, SIZES ,STYLES} from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import AppText from "./AppText";

const AppHeader = ({ onPressLeft, style ,title=''}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
        <View style={{ width:SIZES.width/3, alignSelf: "center" }}>
          <AntDesign
            name="arrowleft"
            onPress={() => navigation.goBack()}
            size={24}
            color="black"
          />
        </View>
        <View style={{ width: SIZES.width/3 ,alignItems:'center'}} >
          <AppText bold={true} size={2.2}>{title}</AppText>
        </View>
        <View style={{ width:SIZES.width/3}}/>
    </View>
  );
};

export default React.memo(AppHeader);

const styles = StyleSheet.create({
  container: {
    height: SIZES.h1 * 2,
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.7,
    padding:SIZES.padding,
    ...FSTYLES
  },
});
