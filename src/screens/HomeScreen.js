import { ScrollView, StyleSheet, View, Image, ImageBackground } from "react-native";
import React from "react";
import {  AppText, AppView, HomeHeader } from "../components";
import ClockItem from "../components/ClockItem";
import { clockdata } from "../constants/data";
import { FlatList } from "react-native";
import { SIZES } from "../constants/theme";

const HomeScreen = () => {
  return (
    <>
      <HomeHeader header={"Brandlu Watch"} />
      <AppView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground resizeMode="contain" style={{
          width:SIZES.width/1.5,
          height:SIZES.height/2.5,
          alignSelf:'center'

        }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/johar-football.appspot.com/o/WhatsApp%20Image%202023-10-27%20at%206.24.44%20PM%20(1).jpeg?alt=media&token=88987f85-2f0e-49a1-8a4f-a16199b98058"
   }} />
   <AppText bold={true}>New products</AppText>
        <FlatList
          data={clockdata}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <ClockItem item={item} />}
          keyExtractor={(item) => item.name}
          // numColumns={2}
        />

   <AppText bold={true}>New products</AppText>
   <FlatList
          data={clockdata}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <ClockItem item={item} />}
          keyExtractor={(item) => item.name}
          // numColumns={2}
        />
        </ScrollView>
      </AppView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({


});
