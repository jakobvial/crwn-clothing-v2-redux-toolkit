import {RootState} from "../store";
import {UserState} from "./user.slice";
import {createSelector} from "reselect";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.currentUser
);