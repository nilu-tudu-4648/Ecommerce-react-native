import React from "react";
import { View, Image, ToastAndroid } from "react-native";
import { COLORS, FSTYLES, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import AppText from "./AppText";

const HomeHeader = ({ iconColor, header, headerColor = "" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="reorder-three-sharp"
          size={SIZES.largeTitle * 0.8}
          color={iconColor || COLORS.black}
        />
        {header && (
          <View style={styles.userInfo}>
            <Image
              source={require("../../assets/bo.jpg")}
              style={styles.userImage}
            />
            <AppText
              bold={true}
              color={headerColor || COLORS.lightgray2}
              size={2}
            >
              {header}
            </AppText>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            ToastAndroid.show("Search", ToastAndroid.SHORT);
          }}
        >
          <AntDesign
            name="search1"
            size={SIZES.largeTitle * 0.5}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: SIZES.h1 * 2,
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.7,
  },
  headerContent: {
    ...FSTYLES,
    padding: SIZES.h6,
  },
  userInfo: {
    ...FSTYLES,
    width: "42%",
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
};

export default HomeHeader;
