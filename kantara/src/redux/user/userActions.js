export const SET_USER_DATA = "[USER] SET DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";

export function setUser(user) {
  return { type: SET_USER_DATA, payload: user };
}

export function logOut() {
  return { type: USER_LOGGED_OUT };
}

export function updateUserProfilePicture(profilePicture) {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    user.user.profileImage = profilePicture;
    // Set User Data
    dispatch({
      type: SET_USER_DATA,
      payload: user,
    });
  };
}
