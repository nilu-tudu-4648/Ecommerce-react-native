import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppText } from "../components";
import AppHeader from "../components/AppHeader";

const OrdersScreen = () => {
  return (
    <>
       <AppHeader title="Orders"/>
      <View>
        <AppText>OrdersScreen</AppText>
      </View>
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
