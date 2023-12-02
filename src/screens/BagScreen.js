import { StyleSheet, View } from "react-native";
import React from "react";
import { AppText } from "../components";
import AppHeader from "../components/AppHeader";

const BagScreen = () => {
  return (
    <>
      <AppHeader title="Wishlist"/>
      <View>
        <AppText>BagScreen</AppText>
      </View>
    </>
  );
};

export default BagScreen;

const styles = StyleSheet.create({});
