import * as Actions from "./actions";

const initialState = {
  searchHistory: null,
  favorites: null,
  districts: null,
  types: null,
  credit: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_SEARCH_HISTORY: {
      const data = action.payload.map((el) => {
        return {
          keywords: el.keywords,
          createdAt: el.createdAt,
          id: el.id,
          favorite: el.favorite,
          ...JSON.parse(JSON.parse(el.options || "") || ""),
        };
      });
      return {
        ...state,
        searchHistory: data,
      };
    }

    case Actions.SET_FAVORITE: {
      const data = action.payload.map((el) => {
        return {
          keywords: el.keywords,
          createdAt: el.createdAt,
          id: el.id,
          ...JSON.parse(JSON.parse(el.options)),
        };
      });

      return {
        ...state,
        favorites: data,
      };
    }

    case Actions.TOGGLE_FAVORITE: {
      var tmp_fav = state.favorites;
      if (action.payload.favorite) {
        tmp_fav = tmp_fav.filter((el) => el.id !== action.payload.id);
      } else {
        tmp_fav = [action.payload, ...tmp_fav];
      }
      return {
        ...state,
        searchHistory: state.searchHistory.map((el) => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              favorite: !el.favorite,
            };
          } else {
            return el;
          }
        }),
        favorites: tmp_fav,
      };
    }
    case Actions.SET_DISTRICTS: {
      return {
        ...state,
        districts: action.payload,
      };
    }
    case Actions.SET_TYPES: {
      return {
        ...state,
        types: action.payload,
      };
    }
    case Actions.UPDATE_CREDIT: {
      return {
        ...state,
        credit: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
