import { UPDATE_DATA } from "app/main/users/phone-assistance/store/actions";

export const SET_SEARCH_HISTORY = "[Dashboard] Set search history data";
export const SET_FAVORITE = "[Dashboard] Set favorite data";
export const TOGGLE_FAVORITE = "[Dashboard] Toggle a favorite";
export const SET_DISTRICTS = "[Dashboard] Set districts";
export const SET_TYPES = "[Dashboard] Set types";
export const UPDATE_CREDIT = "[Dashboard] Update credit";

export function setSearchHistory(data) {
  if (!data) {
    data = [];
  }
  return {
    type: SET_SEARCH_HISTORY,
    payload: data,
  };
}

export function setFavorite(data) {
  if (!data) {
    data = [];
  }
  return {
    type: SET_FAVORITE,
    payload: data,
  };
}

export function toggleFavorite(item) {
  return {
    type: TOGGLE_FAVORITE,
    payload: item,
  };
}

export function setDistricts(data) {
  if (!data) {
    data = [];
  }
  return {
    type: SET_DISTRICTS,
    payload: data,
  };
}

export function setTypes(data) {
  if (!data) {
    data = [];
  }
  return {
    type: SET_TYPES,
    payload: data,
  };
}

export function updateCredit(data) {
  return {
    type: UPDATE_CREDIT,
    payload: data,
  };
}