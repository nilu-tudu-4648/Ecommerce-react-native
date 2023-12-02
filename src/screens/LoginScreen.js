import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Image, BackHandler, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { COLORS, FSTYLES, SIZES } from "../constants/theme";
import { AppButton } from "../components";
import AppLoader from "../components/AppLoader";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NAVIGATION } from "../constants/routes";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../store/userReducer";

const LoginScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      // phone: "9155186701",
      // password: "123456",
    },
  });
  const dispatch = useDispatch();
  async function getUser(mobile) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    return user;
    // const q = query(
    //   collection(db, FIRESTORE_COLLECTIONS.USERS),
    //   where("mobile", "==", mobile)
    // );
    // const querySnapshot = await getDocs(q);

    // if (!querySnapshot.empty) {
    //   // User with the provided mobile number exists
    //   return querySnapshot.docs[0].data();
    // }
    // // User does not exist
    // return null;
  }

  const handleSignIn = async (phone, password) => {
    // const userExists = await getUser(phone);
    const userExists ={"email": "nilunilesh84@gmail.com", "firstName": "Nilesh", "lastName": "Mon", "mobile": "9155186701", "password": "123"}
    console.log(userExists, "userExists");
    if (!userExists) {
      showToast("User does not exist");
      // ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
      console.log("User login failed.");
    } else {
      dispatch(setLoginUser(userExists));
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(userExists));
      // ToastAndroid.show("Login successful", ToastAndroid.SHORT);
    }

    // const checkPassword = userExists.password === password;

    // if (checkPassword) {
    //   dispatch(setLoginUser(userExists));
    //   await AsyncStorage.setItem("loggedInUser", JSON.stringify(userExists));
    //   ToastAndroid.show("Login successful", ToastAndroid.SHORT);
    // } else {
    //   ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
    //   console.log("User login failed.");
    // }
  };

  const onSubmit = async (data) => {
    setloading(true);
    try {
      await handleSignIn(data.phone, data.password);
    } catch (error) {
      console.log(error, "err");
      // ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    } finally {
      setloading(false);
    }
  };
  const rules = {
    required: "This field is mandatory",
  };
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.WELCOME);
      return () => true;
    },
    []
  );
  const phonePattern = /^[6-9][0-9]{9}$/;
  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Image source={require("../../assets/bo.jpg")} style={styles.logo} />
          <AppText bold={true} style={styles.title}>
            {"Login"}
          </AppText>
        </View>
        <View style={styles.inputContainer}>
          <FormInput
            control={control}
            rules={{
              required: "This field is mandatory",
              pattern: {
                value: phonePattern,
                message: "Please enter a valid phone number",
              },
              minLength: {
                value: 10,
                message: "Please enter a valid phone number",
              },
            }}
            keyboardType="numeric"
            placeholder="Enter Mobile Number"
            name="mobile"
            maxLength={10}
          />
          <FormInput
            control={control}
            rules={{ required: "This field is mandatory" }}
            placeholder="Password"
            name="password"
            secureTextEntry={true}
          />
          <View style={FSTYLES}>
        <AppText size={1.5}>Forgot Pin</AppText>
        <Pressable onPress={()=>navigation.navigate(NAVIGATION.REGISTER)}>
        <AppText size={1.5}>New User ? Sign Up</AppText>
        </Pressable>
          </View>
        </View>
        <View style={{ flex: 0.4 }} />
      </ScrollView>
      <View>
        <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  logo: {
    width: 100,
    height: 70,
    alignSelf: "center",
    marginVertical: SIZES.padding * 2,
  },
  title: {
    alignSelf: "center",
    marginVertical: SIZES.h3,
    fontSize: SIZES.h2,
  },
  inputContainer: {
    marginVertical: SIZES.padding * 2,
  },
});

export default LoginScreen;
