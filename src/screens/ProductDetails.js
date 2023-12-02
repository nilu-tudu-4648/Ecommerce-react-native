import { BackHandler, Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppButton, AppLoader, AppText, ProductDetailsHeader } from "../components";
import { COLORS, FSTYLES, SIZES, } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { NAVIGATION } from "../constants/routes";
import { addtoCart } from "../store/userReducer";

const ProductDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [itemDetails, setitemDetails] = useState(null)
  const [loading, setloading] = useState(true)

  useEffect(() => {
   setTimeout(() => {
     setloading(false)
     setitemDetails(item)
   }, 1000);
  }, [item])

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
  return (
    <>
    {
      !itemDetails && <AppLoader visible={loading} />
    }
      <ProductDetailsHeader />
      {
        itemDetails &&
        <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              width: SIZES.width,
              height: SIZES.height * 0.4,
            }}
          >
            <Image
              source={{ uri: itemDetails.image }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
          <AppText style={styles.text} size={2} bold={true}>
            {itemDetails.name}
          </AppText>
          <AppText style={styles.text} size={1.8} bold={true}>
            ₹{itemDetails.price}
          </AppText>
          <Image
            source={require("../../assets/trust.jpeg")}
            style={{ width: SIZES.width, height: 70,alignSelf:'center' }}
          />
          <AppText size={1.8} bold={true}>
            Product details
          </AppText>
          <AppText size={1.5}>{itemDetails.description}</AppText>
        </View>
        {
          item.stock?
          <View style={{...FSTYLES,marginBottom:SIZES.base}}>
          {cart?.filter((ite) => ite.id === itemDetails.id)[0] ? (
            <AppButton
              onPress={() => navigation.navigate(NAVIGATION.CART)}
              varient={true}
              style={{ width: "49%" }}
              title={"Go to Cart"}
            />
          ) : (
            <AppButton
              varient={true}
              onPress={() => dispatch(addtoCart(itemDetails))}
              style={{ width: "49%", }}
              title={"Add to Cart"}
            />
          )}

          <AppButton style={{ width: "49%",backgroundColor:COLORS.green }} title={"Buy Now"} />
        </View> : 
        <AppButton
        title={item.stock ? "Buy Now" : "Out of Stock"}
        textStyle={{ color: item.stock ? COLORS.green : COLORS.red }}
        style={{
          width: "96%",
          alignSelf:'center',
          backgroundColor: item.stock ? COLORS.lightgreen : COLORS.lightred,
        }}
      />
        }
      </ScrollView>
      }
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor:COLORS.white,
    padding: SIZES.padding,
  },
  text:{
    marginVertical:SIZES.h6*.4
  }
});
