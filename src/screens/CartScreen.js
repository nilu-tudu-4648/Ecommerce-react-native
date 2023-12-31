import { BackHandler, FlatList, Image, StyleSheet, ToastAndroid, View } from "react-native";
import React from "react";
import { COLORS, SIZES, STYLES } from "../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { FSTYLES } from "../constants/theme";
import {
  AppButton,
  AppText,
} from "../components";
import { changeqtyofProduct, removeToCart } from "../store/userReducer";
import AppHeader from "../components/AppHeader";
const CartScreen = ({ navigation }) => {
  const {  cart } = useSelector((state) => state.entities.userReducer);
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.goBack();
      return true;
    },
    []
  );
  const dispatch = useDispatch();
  const changeQty = (data) => {
    dispatch(changeqtyofProduct({ id: data.id, qty: data.qty }));
  };
  const reducecart = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginVertical: SIZES.base,
          height: SIZES.height/4,
          ...STYLES,
        }}
      >
        <View style={{...FSTYLES,paddingHorizontal:SIZES.padding}}>
          <View style={{ width: "30%"}}>
            <Image
              resizeMode="contain"
              style={{ width: "100%", height: "55%" }}
              source={{ uri: item.image }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
                top: 12,
              }}
            >
              <AntDesign
                onPress={() => {
                  changeQty({ id: item.id, qty: item.qty + 1 });
                }}
                name="pluscircleo"
                size={SIZES.h3}
                color={"black"}
              />
              <AppText>{item.qty}</AppText>
              <AntDesign
                onPress={() =>
                  changeQty({
                    id: item.id,
                    qty: item.qty === 1 ? 1 : item.qty - 1,
                  })
                }
                name="minuscircleo"
                size={SIZES.h3}
                color={"black"}
              />
            </View>
          </View>
          <View style={{ width: "65%"}}>
            <AppText bold={true} size={2.2}>
              {item.name}
            </AppText>
            <AppText size={1.7}>₹ {item.price}</AppText>
          </View>
        </View>
        <View style={{ ...FSTYLES, padding: 0 }}>
        <AppButton
            style={{ width: "48%" ,height:SIZES.h1*1.4,backgroundColor:COLORS.gray}}
            onPress={() => dispatch(removeToCart(item.id))}
            title="Remove"
          />
          <AppButton
            style={{ width: "48%"  ,height:SIZES.h1*1.4}}
            onPress={() => ToastAndroid.show("Buy Now successfully",ToastAndroid.SHORT)}
            title="Buy Now"
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <AppHeader title="Cart" />
      <View style={styles.container}>
        {cart.length ? (
          <>
          <AppText bold={true} size={2.5}>{cart.length} items in cart</AppText>
            <FlatList
              data={cart}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
            
          </>
        ) : (
          <View style={{ flex: 1, ...STYLES }}>
            <Image
              source={require("../../assets/empty.jpeg")}
              resizeMode="contain"
              style={{ width: SIZES.width, height: SIZES.height / 2 }}
            />
          </View>
        )}
      </View>
     {
      !cart.length? null :
      <View
      style={{
       ...FSTYLES,
        borderTopColor: COLORS.lightgray1,
        padding: SIZES.base,
        borderTopWidth: 0.9,
      }}
    >
      <View 
        style={{ width: "30%" }}>
        <AppText bold={true}>Total</AppText>
        <AppText size={1.5} bold={true}>₹ {Math.round(reducecart)}</AppText>
      </View>
      <AppButton
        style={{ width: "60%" }}
        onPress={() => ToastAndroid.show("Order Placed successfully",ToastAndroid.SHORT)}
        title="Place Order"
        />
    </View>
     }
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white,padding:SIZES.padding },
  myText: {
    fontSize: 25, // End result looks like the provided UI mockup
  },
});
