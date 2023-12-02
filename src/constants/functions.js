import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import axios from "axios";
import { setLoginUser, settournaments } from "../store/userReducer";
import { FIRESTORE_COLLECTIONS } from "./data";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NAVIGATION } from "./routes";
// import { db } from "../../firebaseConfig";

export const logoutUser = async (dispatch,navigation) => {
  try {
    await AsyncStorage.removeItem("loggedInUser");
    dispatch(setLoginUser(null));
    navigation.navigate(NAVIGATION.LOGIN)
    // await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const isValidPhoneNumber = (str) => {
  const regex = /^[6-9][0-9]{9}$/;
  return regex.test(str);
};
export const truncateString = (inputString, maxLength) => {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + "...";
  }
  return inputString;
};

export const formatDate = (timestamp) => {
  const truncatedTimestamp = Math.floor(timestamp / 1000); // Remove milliseconds

  const date = new Date(truncatedTimestamp * 1000); // Convert to milliseconds

  // Extract the day, month, and year components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month since it is zero-based
  const year = date.getFullYear().toString(); // Get the last two digits of the year

  // Return the formatted date with AM/PM indicator in ddmmyy format
  return `${day}/${month}/${year}`;
};
export const formatTimestamp = (timestamp) => {
  const truncatedTimestamp = Math.floor(timestamp / 1000); // Remove milliseconds

  const date = new Date(truncatedTimestamp * 1000); // Convert to milliseconds

  // Extract the hours, minutes, and AM/PM indicator
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Return the formatted date with AM/PM indicator in ddmmyy format
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
export const sanitizeJsonString = (jsonString) => {
  // Remove any characters that are not part of a valid JSON format
  const sanitizedString = jsonString.replace(/[^\x20-\x7E]/g, "");

  return sanitizedString;
};

export function showToast(msg) {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}

export async function getUserDetails(mobile) {
//   const q = query(
//     collection(db, FIRESTORE_COLLECTIONS.USERS),
//     where("mobile", "==", mobile)
//   );
//   const querySnapshot = await getDocs(q);

//   if (!querySnapshot.empty) {
//     // User with the provided mobile number exists
//     return querySnapshot.docs[0].data();
//   }
//   // User does not exist
//   return null;
}
export const updateUser = async (fdata, fn) => {
//   try {
//     const postRef = doc(db, FIRESTORE_COLLECTIONS.USERS, item.id);
//     await updateDoc(postRef, fdata).then(async () => {
//       ToastAndroid.show("Update Succussfully", ToastAndroid.SHORT);
//       await getUserDetails(fdata.mobile);
//     });
//   } catch (error) {
//     console.log(error);
//   }
};
