import * as Actions from "./actions";

const initialState = {
  data: [],
  searchText: "",
  form: {
    data: null,
    isNew: true,
    canSubmit: false,
    loading: false,
    isEditable: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Actions.SET_SEARCH_WORD: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    // Form Actions
    case Actions.ADD_DATA: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case Actions.DELETE_ELEMENT: {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    }
    case Actions.UPDATE_DATA: {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    }
    case Actions.MUTATE_DATA: {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            const element = { ...item, ...action.payload };
            if (state.form.data.profileImage) {
              element.profileImage = state.form.data.profileImage;
            }
            return element;
          }
          return item;
        }),
      };
    }
    case Actions.SET_SUBMITTABLE: {
      return {
        ...state,
        form: {
          ...state.form,
          canSubmit: action.payload,
        },
      };
    }
    case "ENABLE_DISABLE_USER": {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id == action.payload.userId) {
            item.active = action.payload.active;
          }
          return item;
        }),
      };
    }
    case Actions.TOGGLE_EDITABLE: {
      return {
        ...state,
        form: {
          ...state.form,
          isEditable: !state.form.isEditable,
        },
      };
    }
    /* case Actions.SET_EDITABLE: {
      return {
        ...state,
        form: {
          ...state.form,
          isEditable: action.payload,
        },
      };
    } */
    case Actions.UPDATE_FORM_DATA: {
      // Reset the form to create a new item
      if (!action.payload) {
        return {
          ...state,
          form: initialState.form,
        };
      }
      let isNew = true;
      if (action.payload.id) {
        isNew = !Number.isInteger(parseInt(action.payload.id));
      } else if (state.form.data && state.form.data.id) {
        isNew = false;
      }
      return {
        ...state,
        form: {
          ...state.form,
          data: {
            ...state.form.data,
            ...action.payload,
          },
          isNew,
        },
      };
    }
    case Actions.SET_LOADING: {
      return {
        ...state,
        form: {
          ...state.form,
          loading: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
