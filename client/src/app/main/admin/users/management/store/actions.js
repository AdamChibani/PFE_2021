import grapQlService from "../../../../../services/libs/graphQlService";
import gql from "graphql-tag";
import * as userService from "app/services/graphql/users/users.service";

export const SET_DATA = "[d] Set data";
export const ADD_DATA = "[d] Add data";
export const DELETE_ELEMENT = "[d] Delete data";
export const MUTATE_DATA = "[d] Mutate data";
export const UPDATE_DATA = "[d] Update data";
export const SET_SEARCH_WORD = "[d] Set search text";
export const SELECT_ITEM_IN_DATATABLE = "[d] Select an item in data table";
export const SET_SUBMITTABLE = "[d] Change canSubmit state";
export const UPDATE_FORM_DATA = "[d] Update form";
export const SET_LOADING = "[d] Loading";
export const TOGGLE_EDITABLE = "[d] TOGGLE_EDITABLE";

export function setData(data) {
  if (!data) {
    data = [];
  }
  return {
    type: SET_DATA,
    payload: data,
  };
}

export function updateData(item) {
  return {
    type: UPDATE_DATA,
    payload: item,
  };
}

export function deleteElement(id) {
  return {
    type: DELETE_ELEMENT,
    payload: id,
  };
}

export function mutateData(item) {
  return {
    type: MUTATE_DATA,
    payload: item,
  };
}

export function addData(item) {
  return {
    type: ADD_DATA,
    payload: item,
  };
}

export function setSearchText(value) {
  return {
    type: SET_SEARCH_WORD,
    payload: value,
  };
}

export function setSubmittable(submittable) {
  return {
    type: SET_SUBMITTABLE,
    payload: Boolean(submittable),
  };
}

export function toggleEditable() {
  return {
    type: TOGGLE_EDITABLE,
  };
}

export function updateFormData(data) {
  return {
    type: UPDATE_FORM_DATA,
    payload: data,
  };
}

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    payload: Boolean(isLoading),
  };
}

export function submit(formData, handleResponse, exit) {
  return (dispatch) => {
    dispatch(setLoading(true));
    const operation = formData.id ? "update" : "create";
    const isNew = operation === "create";
    console.log(formData);
    userService[operation](formData)
      .then((result) => {
        dispatch(mutateData(formData));
        dispatch(setLoading(false));
        if (typeof handleResponse === "function")
          handleResponse({ result, error: false, isNew, exit });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        if (typeof handleResponse === "function")
          handleResponse({ response: e, error: true, isNew, exit });
      });
  };
}

export async function selectUserInDataTable(dispatch) {
  return (dispatch) => {};
}

export const toggleUserActivation = async (userId, active, dispatch) => {
  userService
    .toggleUserActivation(userId, active)
    .then(() => {
      dispatch({
        type: "ENABLE_DISABLE_USER",
        payload: { active, userId },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
