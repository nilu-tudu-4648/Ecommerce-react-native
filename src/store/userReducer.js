import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { ToastAndroid } from "react-native";
const initialState = {
  loading: false,
  user: null,
  userLoggedIn: "false",
  cart: []
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userReducerDataRequested: (userReducer, action) => {
      userReducer.loading = true;
    },
    userReducerDataReceived: (userReducer, action) => {
      userReducer.loading = false;
      userReducer.user = action.payload;
    },
    userReducerDataRequestFailed: (userReducer, action) => {
      userReducer.loading = false;
    },
    checkUserLogin: (userReducer, action) => {
      userReducer.loading = false;
      userReducer.userLoggedIn = action.payload;
    },
    setLoginUser: (userReducer, action) => {
      userReducer.user = action.payload;
    },
    logoutFromReducer: (userReducer, action) => {
      userReducer.otpData = null;
    },
    addtoCart: (userReducer, action) => {
      ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
      userReducer.cart =[...userReducer.cart,action.payload];
    },
    removeToCart: (userReducer, action) => {
      userReducer.cart = userReducer.cart.filter((item) => item.id !== action.payload);
    },
    changeqtyofProduct: (userReducer, action) => {
      const index = userReducer.cart.findIndex((item) => item.id === action.payload.id)
      userReducer.cart[index].qty = action.payload.qty
     },
  },
});

const {
  userReducerDataReceived,
  userReducerDataRequestFailed,
  userReducerDataRequested,
} = userReducer.actions;

export default userReducer.reducer;
export const {
  logoutFromReducer,
  setLoginUser,
  checkUserLogin,
  addtoCart,
  removeToCart,
  changeqtyofProduct,
} = userReducer.actions;
export const getUserDetails = (data) =>
  apiCallBegan({
    method: "post",
    data,
    onStart: userReducerDataRequested.type,
    onSuccess: userReducerDataReceived.type,
    onError: userReducerDataRequestFailed.type,
  });
