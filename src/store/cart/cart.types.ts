import {CategoryItem} from "../categories/category.types";

/*
Description: The CartItem type is a combination of the CategoryItem type and the quantity property,
using the intersection type (&).
 */
export type CartItem = CategoryItem & {
    quantity: number;
}