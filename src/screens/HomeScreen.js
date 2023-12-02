import { ScrollView, StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLoader, AppView, HomeHeader } from "../components";
import ClockItem from "../components/ClockItem";
import { getTournaments } from "../constants/functions";
import { useDispatch, useSelector } from "react-redux";
import { clockdata } from "../constants/data";
import { FlatList } from "react-native";

const HomeScreen = () => {
  return (
    <>
      <HomeHeader header={"Brandlu Watch"} />
      <AppView>
        <FlatList
          data={clockdata}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ClockItem item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={2}
        />
      </AppView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 100,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
