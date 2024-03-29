import { SET_LIST } from "./../actions/inviteeList";
// when i change this to getting data from the database,
// capitalize first letter of each word when you store it
// store it in ascending order

const initialState = {
  inviteeList: [],
};

const inviteeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        inviteeList: action.inviteeList,
      };

    // case SET_INVITEE:
    //   const inviteeId = action.inviteeId;
    //   const index = state.inviteeList.findIndex((item, index) => {
    //     console.log("inviteeId ", inviteeId, " item.id ", item.id);
    //     return item.id === inviteeId;
    //   });
    //   console.log("index ", index);
    //   const newList = [...state.inviteeList];
    //   newList[index].setCheckin();
    //   return {
    //     ...state,
    //     inviteeList: newList,
    //   };
  }
  return state;
};

export default inviteeListReducer;

// const dummy_list = [
//   new Invitee("id", "my brother", true, false),
//   new Invitee("id2", "someone", true, false),
//   new Invitee("id", "my brother", true, false),
//   new Invitee("id2", "someone", true, false),
//   new Invitee("id", "my brother", true, false),
//   new Invitee("id2", "someone", true, false),
//   new Invitee("id", "my brother", true, false),
//   new Invitee("id2", "someone", true, false),
//   new Invitee("id", "my brother", true, false),
//   new Invitee("id2", "someone", true, false),
// ];
