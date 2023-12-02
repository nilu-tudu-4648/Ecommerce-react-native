import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";
import { truncateString } from "../constants/functions";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../constants/routes";

const ClockItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        // shadowColor: "#000000",
        // shadowOffset: {
        //   width: 0,
        //   height: 6,
        // },
        // shadowOpacity:  0.21,
        // shadowRadius: 6.65,
        // backgroundColor: COLORS.white,
        // elevation: 2
    }}
      onPress={() => navigation.navigate(NAVIGATION.PRODUCT_DETAILS, {item,image:item.image})}
    >
      <View
        style={{
          borderColor: COLORS.black,
          borderWidth: 0.2,
          width: SIZES.width / 2.3,
          margin: SIZES.padding / 2,
          height: SIZES.height / 3.5,
        }}
      >
        <Image
          source={{uri: item.image}}
          style={{
            width: "99%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={{paddingHorizontal:SIZES.base1}}>
      <AppText size={1.8}>{truncateString(item.name, 17)}</AppText>
      <AppText size={1.5} bold={true}>
        ₹{item.price}
      </AppText>
      </View>
      <AppButton
        title={item.stock ? "Buy Now" : "Out of Stock"}
        textStyle={{ color: item.stock ? COLORS.green : COLORS.red }}
        style={{
          width: "96%",
          backgroundColor: item.stock ? COLORS.lightgreen : COLORS.lightred,
        }}
      />
    </TouchableOpacity>
  );
};

export default ClockItem;

const styles = StyleSheet.create({});
