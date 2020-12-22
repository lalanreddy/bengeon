import { combineReducers } from "redux";
import dishes from "./dishes";
import contacts from "./contacts";
import alert from "./alert";

export default combineReducers({
  dishes,
  contacts,
  alert,
});
