import { View, Image } from "react-native";
import React from "react";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { NAVIGATION } from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Badge } from "react-native-paper";
import AppText from "./AppText";
const ProductDetailsHeader = ({ cartScreen = false,title="" }) => {
  const navigation = useNavigation();
  const { cart } = useSelector((state) => state.entities.userReducer);

  return (
    <View
      style={{
        height: SIZES.h1 * 2,
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 0.7,
      }}
    >
      <View
        style={{
          ...FSTYLES,
          padding: SIZES.h4,
          height: "100%",
        }}
      >
        <AntDesign
          name="arrowleft"
          onPress={() => navigation.goBack()}
          size={24}
          color="black"
        />
        <View style={{ ...STYLES, width: "45%" }}>
         {
          title? 
          <AppText>{title}</AppText>:
          <Image
          source={require("../../assets/bo.jpg")}
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
          }}
        />
         }
        </View>
        {!cartScreen ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION.CART)}
          >
            {cart.length ? (
              <Badge style={{ position: "absolute", top: -12, left: 12 }}>
                {cart.length}
              </Badge>
            ) : null}
            <AntDesign
              onPress={() => navigation.navigate(NAVIGATION.CART)}
              name="shoppingcart"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default ProductDetailsHeader;
