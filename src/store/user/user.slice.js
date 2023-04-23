import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null
};

// user slice with createSlice
export const userSlice = createSlice({
    name: "user", // namespace
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) { // shorthand for setCurrentUser: (state, action) => { ... }
            state.currentUser = action.payload; // mutation style for readability/legibility but still immutable due to redux toolkit leveraging immer
        }
    }
});

// destructuring the action creators from the slice
export const {setCurrentUser} = userSlice.actions;

// returning the reducer from the slice
export const userReducer = userSlice.reducer;