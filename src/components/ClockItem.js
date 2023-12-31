import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
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
    <Pressable
      style={{
        // shadowColor: "#000000",
        // shadowOffset: {
        //   width: 0,
        //   height: 6,
        // },
        // shadowOpacity:  0.21,
        // shadowRadius: 6.65,
        height: SIZES.height / 3.5,
        // backgroundColor: COLORS.white,
        margin:SIZES.base1/4
    }}
      onPress={() => navigation.navigate(NAVIGATION.PRODUCT_DETAILS, {item,image:item.image})}
    >
      <View
        style={{
          borderRadius:SIZES.base,
          width: SIZES.width / 2.3,
          margin:  SIZES.base/2,
          height: SIZES.height / 4.8,
          elevation:4,
          backgroundColor:COLORS.white
        }}
      >
        <Image
          source={{uri: item.image}}
          style={{
            width: "80%",
            height: "100%",
            resizeMode: "contain",
            alignSelf:'center'
          }}
        />
      </View>
      <View style={{paddingHorizontal:SIZES.base1}}>
      <AppText size={1.8} bold={true}>{truncateString(item.name, 20)}</AppText>
      <AppText size={1.5} bold={true}>
        ₹{item.price}
      </AppText>
      </View>
      {/* <AppButton
        title={item.stock ? "Buy Now" : "Out of Stock"}
        textStyle={{ color: item.stock ? COLORS.green : COLORS.red }}
        style={{
          width: "96%",
          backgroundColor: item.stock ? COLORS.lightgreen : COLORS.lightred,
        }}
      /> */}
    </Pressable>
  );
};

export default ClockItem;

const styles = StyleSheet.create({});
