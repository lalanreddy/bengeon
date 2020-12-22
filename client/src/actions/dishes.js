import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_DISH,
  GET_DISH,
  GET_DISHES,
  ADD_COMMENT,
  NODISH_ERROR,
} from "./types";

export const addDish = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/api/dishes", formData, config);

    dispatch({
      type: ADD_DISH,
      payload: res.data,
    });

    dispatch(setAlert("Dish Added Successfully", "success"));

    history.go(-1);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: NODISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get all dishes
export const getDishes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/dishes");

    dispatch({
      type: GET_DISHES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NODISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get single dish by id

export const getDishById = (dishID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/dishes/dishes/${dishID}`);
    dispatch({
      type: GET_DISH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NODISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add Comment
export const addComment = (dishId, formData) => async (dispatch) => {
  console.log(formData);
  const config = {
    headers: {
      Content_Type: "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/dishes/comment/${dishId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: NODISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
