const initialState = {
  user: null,
};
const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case "[USER] SET DATA": {
      return {
        ...initialState,
        user: action.payload,
      };
    }

    case "[USER] LOGGED OUT": {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
