export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
}

export type CategoryMap = {
    // The key is a string, and the value is an array of CategoryItem.
    // The square brackets around the key indicate that the key is a variable (dynamic).
    [key: string]: CategoryItem[]
}