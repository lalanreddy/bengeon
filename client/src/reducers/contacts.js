import { ADD_CONTACT } from "../actions/types";

const initialState = {
  contacts: [],
};
const contacts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: payload,
      };
    default:
      return state;
  }
};

export default contacts;
