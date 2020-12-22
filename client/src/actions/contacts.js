import axios from "axios";
import { setAlert } from "./alert";
import { ADD_CONTACT } from "./types";

export const addContact = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/contacts", formData, config);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });

    dispatch(setAlert("Contact  Added Successfully", "success"));
    history.go(-1);
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};
