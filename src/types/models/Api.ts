import { ProductCategory } from "./App";

export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductCategory;
    price: number;
}

export interface IPostOrder{
    id: string;
    totalPrice: number|null;
}

