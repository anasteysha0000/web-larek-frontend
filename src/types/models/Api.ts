import { ProductsCategories } from "./App";

export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductsCategories;
    price: number;
    button: string;
    index: string;
    selected: boolean;
}

export interface IPostOrder{
    id: string;
    total: number;
}

