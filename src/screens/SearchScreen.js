import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppHeader from "../components/AppHeader";
import { AppText, AppTextInput } from "../components";
import { COLORS, SIZES, FSTYLES } from "../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Catalogue } from "../constants/data";

const SearchScreen = () => {
  const [selectType, setselectType] = useState("Men");
  const renderItem = ({ item }) => {
    let selected = item === selectType;
    return (
      <TouchableOpacity
        onPress={() => setselectType(item)}
        style={{...styles.tabStyle,
            backgroundColor: selected ? COLORS.primary : COLORS.lightgray,}}
      >
        <AppText>{item}</AppText>
      </TouchableOpacity>
    );
  };
  const renderCatalogueItem=({item})=>{
    return(
        <View style={{height:SIZES.height/9,...FSTYLES,marginVertical:SIZES.base/4}}>
            <View style={{width:'20%',borderRadius:SIZES.base}}>
            <Image source={{uri:item.image}} resizeMode="contain" style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{width:'70%'}}>
                <AppText bold={true}>{item.title}</AppText>
                <AppText>{item.subtitle}</AppText>
            </View>
        </View>
    )
  }
  return (
    <>
      <AppHeader title="Search" />
      <AppView>
        <View style={styles.inputStyle}>
          <AntDesign
            name="search1"
            size={SIZES.largeTitle * 0.4}
            color="gray"
          />
          <AppTextInput
            placeholder={"Search in Catalogue"}
            style={{ width: "94%" }}
            inputStyle={{ borderWidth: 0, fontSize: 14 }}
          />
        </View>
        <View>
          <FlatList
            horizontal={true}
            data={["Men", "Women", "Kids"]}
            renderItem={renderItem}
          />
        </View>
        <View>
          <FlatList
            data={Catalogue}
            renderItem={renderCatalogueItem}
          />
        </View>
      </AppView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.base,
    borderWidth: 0.4,
    borderColor: COLORS.gray,
    ...FSTYLES,
  },
  tabStyle: {
    borderRadius: SIZES.base * 2,
    padding: SIZES.padding / 2,
    paddingHorizontal: SIZES.base,
    margin: SIZES.base1,
  },
});
