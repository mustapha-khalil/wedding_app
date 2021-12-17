import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { setList } from "../store/actions/inviteeList";
import { InitializeFirebase } from "./../InitializeFirebase";
import Colors from "../constants/Colors";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAioK_0pdMEniIqmQ97K2HkmaaYWoSo8Wk",
//   authDomain: "weddingproject2-ce55f.firebaseapp.com",
//   databaseURL: "https://weddingproject2-ce55f-default-rtdb.firebaseio.com",
//   projectId: "weddingproject2-ce55f",
//   storageBucket: "weddingproject2-ce55f.appspot.com",
//   messagingSenderId: "917688119636",
//   appId: "1:917688119636:web:033e8eecfbb0b0699018c1",
//   measurementId: "G-N61VX498CT",
// };

// // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);
// initializeApp(firebaseConfig);

InitializeFirebase();

const InviteesScreen = ({ navigation }) => {
  const dummy_list = useSelector((state) => state.inviteeList.inviteeList);
  // console.log("dummy_list ", dummy_list);
  const [inviteeList, setInviteeList] = useState(dummy_list);
  const [searchList, setSearchList] = useState(dummy_list);
  // console.log("searchList ", searchList);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // const db = getDatabase();
    // const list = ref(db, "invitees");
    // setIsLoading(true);
    // dispatch(setList())
    //   .then(() => {
    //     console.log("falsyy");
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {});
    const loadList = async () => {
      setIsLoading(true);
      await dispatch(setList()); // await is not working and the code is still running asynchronously
      setIsLoading(false);
    };
    loadList();
    setSearchList(dummy_list);
  }, [dispatch]);

  const textChangeHandler = (value) => {
    console.log("value ", value);
    const newArray = inviteeList.filter((item) => {
      const length = value.length;
      console.log("item in search ", value);
      const newItem = item.slice(0, length);
      console.log("newItem ", newItem);
      if (value.toLowerCase() === newItem.toLowerCase()) return item;
    });

    setSearchList(newArray);
  };

  if (isLoading) {
    console.log("isLoadinggg ", isLoading);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>isLoading</Text>
      </View>
    );
  } else {
    console.log("isLoading ", isLoading);
    return (
      <InviteeList
        navigation={navigation}
        textChangeHandler={textChangeHandler}
        data={dummy_list}
      />
    );
  }
};

export default InviteesScreen;
