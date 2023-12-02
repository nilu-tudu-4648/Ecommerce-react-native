import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { useForm } from "react-hook-form";
import { COLORS, SIZES } from "../constants/theme";
import { AppButton } from "../components";
import AppLoader from "../components/AppLoader";
import AppText from "../components/AppText";
import FormInput from "../components/FormInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NAVIGATION } from "../constants/routes";
import { showToast } from "../constants/functions";

const SignUpScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
    },
  });

  async function getUser(mobile) {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    if (!user) return false;
    return user.mobile === mobile;
  }

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, mobile } = data;

    try {
      setloading(true);
      const userExists = await getUser(mobile);

      if (userExists) {
        showToast("User already exists");
      } else {
        await AsyncStorage.setItem("user", JSON.stringify(data));
        navigation.navigate(NAVIGATION.LOGIN);
      }
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
      showToast("Sign Up failed. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const phonePattern = /^[6-9][0-9]{9}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      navigation.navigate(NAVIGATION.LOGIN);
      return () => true;
    },
    []
  );
  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/bo.jpg")} style={styles.logo} />
        <AppText bold={true} style={styles.title}>
          Registration
        </AppText>
        <View style={styles.inputContainer}>
          <FormInput
            control={control}
            rules={{ required: "This field is mandatory" }}
            placeholder="First Name"
            name="firstName"
          />
          <FormInput
            control={control}
            rules={{ required: "This field is mandatory" }}
            placeholder="Last Name"
            name="lastName"
          />
          <FormInput
            control={control}
            rules={{
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email",
              },
            }}
            placeholder="Email"
            name="email"
          />
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
            placeholder="Mobile No"
            name="mobile"
            maxLength={10}
          />
          <FormInput
            control={control}
            rules={{ required: "This field is mandatory" }}
            placeholder="Password"
            name="password"
          />
        </View>
      </ScrollView>
      <View>
        <AppButton title="Register" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
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

export default SignUpScreen;
