import {
  ADD_COMMENT,
  GET_DISH,
  GET_DISHES,
  NODISH_ERROR,
} from "../actions/types";

const initialState = {
  dishes: [],
  dish: {
    comments: [],
  },
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISHES:
      return {
        ...state,
        dishes: payload,
        dish: {comments:[]},
        error: null,
      };
    case GET_DISH:
      return {
        ...state,
        dish: payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        dish: { ...state.dish, comments: payload },
      };
    case NODISH_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
