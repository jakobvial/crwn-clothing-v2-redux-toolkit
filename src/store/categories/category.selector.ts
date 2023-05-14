import {createSelector} from 'reselect';
import {RootState} from "../store";
import {CategoryMap} from "./category.types";
import {CategoryState} from "./category.slice";

const selectCategoryReducer = (state: RootState): CategoryState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap =>
        categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

export const selectIsCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoriesReducer) => categoriesReducer.isLoading
);