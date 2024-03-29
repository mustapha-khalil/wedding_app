import React, { useEffect, useState, version } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { InitializeFirebase } from "./../InitializeFirebase";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

import CheckinButton from "../components/CheckinButton";
import DropDown from "../components/DropDown";
import ImgPicker from "../components/ImagePicker";
import Colors from "../constants/Colors";

InitializeFirebase();

const inviteeDetailScreen = (props) => {
  const { route, navigation } = props;

  const inviteeItem = route.params.invitee;
  const { id, name, checkIn, isPriority, image } = inviteeItem;

  const newName = name.charAt(0).toUpperCase() + name.slice(1);

  const [isCheckedin, setIsCheckedin] = useState(checkIn);

  // const openCamera = () => {
  //   setIsCameraOpen(true);
  // };

  useEffect(() => {
    navigation.addListener("didFocus", () => {
      // try later using this to update the checkin button
    });
  });

  const updateCheckIn = () => {
    const today = new Date();
    const currentTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const db = getDatabase();
    set(ref(db, "invitees/" + id), {
      checkin: currentTime,
      ispriority: isPriority,
      name: name,
    });
  };

  const checkinInvitee = () => {
    // update in the database
    setIsCheckedin(true);
    updateCheckIn();
    // dispatchEvent();
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{newName}</Text>
        </View>

        <DropDown />
      </View>
      <View style={styles.imagePickerContainer}>
        <ImgPicker invitee={inviteeItem} image={image} />
      </View>
      <View style={styles.submit}>
        <CheckinButton
          isCheckedin={isCheckedin}
          checkinInvitee={checkinInvitee}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  details: { height: "30%" },
  imagePickerContainer: { height: "50%" },
  submit: { height: "10%", justifyContent: "flex-end" },

  container: {
    flex: 1,
    margin: 10,
    justifyContent: "flex-start",
  },
  nameContainer: {
    marginVertical: 10,
    alignItems: "center",
    // backgroundColor: "red",
    // borderWidth: 1,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // elevation: 5,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 23,
    color: Colors.primaryColor,
    margin: 0,
    padding: 0,
  },

  textInput: {
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default inviteeDetailScreen;
