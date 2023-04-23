import {createSlice} from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
    categories: []
};

// categories slice with createSlice
export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        }
    }
});

// destructuring the action creators from the slice
export const {setCategories} = categoriesSlice.actions;

// returning the reducer from the slice
export const categoriesReducer = categoriesSlice.reducer;