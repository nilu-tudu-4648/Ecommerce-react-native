import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppButton,
  AppLoader,
  AppText,
  ProductDetailsHeader,
} from "../components";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { NAVIGATION } from "../constants/routes";
import { addtoCart } from "../store/userReducer";
import { AntDesign } from "@expo/vector-icons";
const ProductDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [itemDetails, setitemDetails] = useState(null);
  const [loading, setloading] = useState(true);
  const [wishlisted, setwishlisted] = useState(false);

  const [selectType, setselectType] = useState("Men");
  const RenderItemSizes = ({ item }) => {
    let selected = item === selectType;
    return (
      <TouchableOpacity
        onPress={() => setselectType(item)}
        style={{
          ...styles.tabStyle,
          backgroundColor: selected ? COLORS.primary : COLORS.lightgray,
        }}
      >
        <AppText>{item}</AppText>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
      setitemDetails(item);
    }, 1000);
  }, [item]);

  const { cart } = useSelector((state) => state.entities.userReducer);
  const dispatch = useDispatch();
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.HOME);
      return () => true;
    },
    []
  );
  const CLOTHSIZES = ["XL", "L", "M", "S", "XS"];
  return (
    <>
      {!itemDetails && <AppLoader visible={loading} />}
      <ProductDetailsHeader />
      {itemDetails && (
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                width: SIZES.width,
                height: SIZES.height * 0.4,
              }}
            >
              <AntDesign
                onPress={() => setwishlisted(!wishlisted)}
                name={wishlisted ? "heart" : "hearto"}
                style={{ alignSelf: "flex-end", right: SIZES.base * 4 }}
                size={24}
                color={wishlisted ? COLORS.red : COLORS.gray}
              />
              <Image
                source={{ uri: itemDetails.image }}
                style={{
                  width: "100%",
                  height: "95%",
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
            </View>
            <AppText style={styles.text} size={2.4} bold={true}>
              {itemDetails.name}
            </AppText>
            <View style={FSTYLES}>
              <AppText style={styles.text} size={2.3} bold={true}>
                ₹{itemDetails.price}
              </AppText>
              <View style={{ ...FSTYLES, width: "40%" }}>
                <AntDesign
                  name="star"
                  size={SIZES.h3}
                  color={COLORS.background}
                />
                <AntDesign
                  name="star"
                  size={SIZES.h3}
                  color={COLORS.background}
                />
                <AntDesign
                  name="star"
                  size={SIZES.h3}
                  color={COLORS.background}
                />
                <AntDesign
                  name="star"
                  size={SIZES.h3}
                  color={COLORS.background}
                />
                <AntDesign
                  name="star"
                  size={SIZES.h3}
                  color={COLORS.background}
                />
                <AppText>{"(12)"}</AppText>
              </View>
            </View>
            <View style={{ ...FSTYLES, width: "30%" }}>
              {CLOTHSIZES.map((item, i) => (
                <RenderItemSizes key={i} item={item} />
              ))}
            </View>
            <Image
              source={require("../../assets/trust.jpeg")}
              style={{ width: SIZES.width, height: 70, alignSelf: "center" }}
            />
            <AppText size={1.8} bold={true}>
              Product details
            </AppText>
            <AppText size={1.5}>
              {itemDetails.description.slice(0, 250)}
            </AppText>
          </View>
          {item.stock ? (
            <View
              style={{
                ...FSTYLES,
                marginBottom: SIZES.base,
                padding: SIZES.padding * 1.5,
                backgroundColor: COLORS.white,
              }}
            >
              {cart?.filter((ite) => ite.id === itemDetails.id)[0] ? (
                <AppButton
                  onPress={() => navigation.navigate(NAVIGATION.CART)}
                  varient={true}
                  style={{ width: "46%" }}
                  title={"Go to Cart"}
                />
              ) : (
                <AppButton
                  varient={true}
                  onPress={() => dispatch(addtoCart(itemDetails))}
                  style={{ width: "46%" }}
                  title={"Add to Cart"}
                />
              )}

              <AppButton
                style={{ width: "46%", backgroundColor: COLORS.green }}
                title={"Buy Now"}
              />
            </View>
          ) : (
            <AppButton
              title={item.stock ? "Buy Now" : "Out of Stock"}
              textStyle={{ color: item.stock ? COLORS.green : COLORS.red }}
              style={{
                width: "96%",
                alignSelf: "center",
                backgroundColor: item.stock
                  ? COLORS.lightgreen
                  : COLORS.lightred,
              }}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 1.5,
  },
  tabStyle: {
    ...STYLES,
    borderRadius: SIZES.base,
    margin: SIZES.base1,
    width: SIZES.h1 * 1.3,
    height: SIZES.h1 * 1.3,
  },
});
