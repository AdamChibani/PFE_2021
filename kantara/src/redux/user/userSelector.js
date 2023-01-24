import { createSelector } from "reselect";

function selectUser(state) {
  return state.user;
}
const selectAuth = createSelector([selectUser], (user) => {
  return user.user;
});
export default selectAuth;
