import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import AppText from "../components/AppText";
import { COLORS, FSTYLES, SIZES, STYLES } from "../constants/theme";
import { Avatar } from "react-native-paper";
import { NAVIGATION } from "../constants/routes";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { doc } from "firebase/firestore";
import { FIRESTORE_COLLECTIONS } from "../constants/data";
import { updateUser } from "../constants/functions";
import AppHeader from "../components/AppHeader";
export default function ProfileScreen({ navigation, route }) {
  const admin = route.params?.admin;
  const [image, setimage] = useState(null);
  const { user } = useSelector((state) => state.entities.userReducer);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const urlParts = result.assets[0].uri;
        setimage(urlParts);
        // const url = await saveMediaToStorage(
        //   urlParts,
        //   `/profile/${user.firstName}${user.lastName}`
        // );
        // const userUpdate = {
        //   ...user,
        //   profilePic: url,
        // };
        // await updateUser(userUpdate);
        ToastAndroid.show(
          "Profile picture updated successfully",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMediaToStorage = async (file, path) => {
    try {
      const storage = getStorage();
      const response = await fetch(file);
      const blob = await response.blob();
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      const url = await new Promise((res, rej) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            ToastAndroid.show("Video upload Failed", ToastAndroid.SHORT);
            rej(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              res(downloadURL);
            });
          }
        );
      });
      return url; // Return the download URL
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error for handling in your app
    }
  };

  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.goBack();
      return () => true;
    },
    []
  );
  return (
    <View>
      <AppHeader title="My Account"/>
      <View style={styles.headerstyle}>
        <TouchableOpacity onPress={pickImage}>
          {user?.ImgUrl ? (
            <Avatar.Image
              size={SIZES.largeTitle * 1.7}
              source={{ uri: user.ImgUrl }}
            />
          ) : image ? (
            <Avatar.Image
              size={SIZES.largeTitle * 1.7}
              source={{ uri: image }}
            />
          ) : (
            <Avatar.Icon
              size={SIZES.largeTitle * 1.7}
              icon="account"
              style={{ backgroundColor: COLORS.white }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
      <View style={{ ...styles.gpsButton }}>
        <AppText>
          {user.firstName} {user.lastName}
        </AppText>
        </View>
        {user.email && (
          <View style={{ ...styles.gpsButton }}>
            <AppText size={1.8}>{user.email}</AppText>
          </View>
        )}
        <View style={{ ...styles.gpsButton }}>
          <AppText size={1.8}>+91 {user.mobile}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
    padding: SIZES.base,
  },
  gpsButton: {
    ...FSTYLES,
    width: "90%",
    borderRadius: SIZES.base,
    padding: SIZES.base*1.2,
    elevation: SIZES.base1*.3,
    backgroundColor: COLORS.white,
  },
  profile: {
    ...STYLES,
    height: SIZES.h1 * 1.5,
    width: SIZES.h1 * 1.5,
    borderRadius: (SIZES.h1 * 1.5) / 2,
    backgroundColor: COLORS.white,
  },
  headerstyle: {
    ...STYLES,
    backgroundColor: COLORS.black,
    padding: "10%",
  },
});
