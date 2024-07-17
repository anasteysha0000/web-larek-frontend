import { ProductCategory } from "./App";

export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductCategory;
    price: number;
    button: string;
}

export interface IPostOrder{
    id: string;
    totalPrice: number|null;
}

