export const SET_LIST = "SET_LIST";
import Invitee from "./../../models/invitee";
import { InitializeFirebase } from "./../../InitializeFirebase";
import { getDatabase, ref, onValue } from "firebase/database";
export const ADD_LIST = "ADD_LIST";
export const SET_INVITEE = "SET_INVITEE";

InitializeFirebase();

export const addList = (list) => {
  return (dispatch) => {
    // any async code you want!
    // fetch();
    dispatch({ type: ADD_LIST, inviteeList: list });
  };
};

export const setInvitee = (itemId) => {
  return async (dispatch) => {
    const db = getDatabase();
    const itemRef = ref(db, "invitees/" + itemId);
    onValue(itemRef, (snapshot) => {
      dispatch({ type: SET_INVITEE, inviteeId: itemId });
    });
  };
};

export const setList = () => {
  return async (dispatch) => {
    // const db = getDatabase();
    // const listRef = ref(db, "invitees");

    const response = await fetch(
      "https://weddingproject2-ce55f-default-rtdb.firebaseio.com/invitees.json"
    );
    const resData = await response.json();
    let loadedInvitees = [];
    for (const key in resData) {
      const name = resData[key].name;
      const isPriority = resData[key].ispriority;
      const checkIn = resData[key].checkin;
      loadedInvitees.push(new Invitee(key, name, isPriority, checkIn));
    }
    dispatch({ type: SET_LIST, inviteeList: loadedInvitees });
    // onValue(listRef, (snapshot) => {
    //   const resData = snapshot.val();
    //   let loadedInvitees = [];
    //   for (const key in resData) {
    //     const name = resData[key].name;
    //     const isPriority = resData[key].ispriority;
    //     const checkIn = resData[key].checkin;
    //     loadedInvitees.push(new Invitee(key, name, isPriority, checkIn));
    //   }
    //   // console.log("loadedInvitees ", loadedInvitees);
    //   dispatch({ type: SET_LIST, inviteeList: loadedInvitees });
    // });

    // const response = await fetch(
    //   "https://weddingproject2-ce55f-default-rtdb.firebaseio.com/invitees.json"
    // );
    // if (response.ok) {
    //   const resData = await response.json();
    //   console.log("resData ", resData);
    //   let loadedInvitees = [];
    //   for (const key in resData) {
    //     const name = resData[key].name;
    //     const isPriority = resData[key].ispriority;
    //     const checkIn = resData[key].checkin;
    //     loadedInvitees.push(new Invitee(key, name, isPriority, checkIn));
    //   }
    //   console.log("loadedInvitees ", loadedInvitees);
    //   dispatch({ type: SET_LIST, inviteeList: loadedInvitees });
    // } else {
    //   console.log(response.error);
    // }
  };
};
