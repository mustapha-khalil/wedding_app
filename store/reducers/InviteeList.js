import { ADD_LIST } from "../actions/inviteeList";

// when i change this to getting data from the database,
// capitalize first letter of each word when you store it
// store it in ascending order
const dummy_list = [
  "ahmad khalil",
  "basel falah",
  "abed wehbe",
  "mark tohme",
  "amin mallah",
  "ahmad kadoura",
  "basel",
  "abed",
  "mark",
  "amin",
  "ahmad",
  "basel",
  "abed",
  "mark",
  "amin",
];

const initialState = {
  inviteeList: dummy_list,
};

const inviteeListReducer = (state = initialState, action) => {
  return state;
};

export default inviteeListReducer;