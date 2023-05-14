import {createSlice} from "@reduxjs/toolkit";
import {Category} from "./category.types";

// CategoryState type
export type CategoryState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
};

// categories slice with createSlice
export const categoriesSlice = createSlice({
    name: "categories",
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
            state.isLoading = false;
        },
        setCategoriesLoading(state) {
            state.isLoading = true;
        }
    }
});

// destructuring the action creators from the slice
export const {setCategories, setCategoriesLoading} = categoriesSlice.actions;

// returning the reducer from the slice
export const categoriesReducer = categoriesSlice.reducer;