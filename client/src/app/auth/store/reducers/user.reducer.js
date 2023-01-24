import * as Actions from "../actions";

const initialState = {
  role: "", //guest
  data: {
    id: 1,
    displayName: "",
    firstName: "",
    lastName: "",
    roleName: "",
    gender: "",
    photoURL: "assets/images/avatars/Velazquez.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      console.log({ test: action.payload });
      return {
        ...initialState,
        ...action.payload,
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    case Actions.UPDATE_USER_ACCESSES: {
      return {
        ...state,
        role: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
