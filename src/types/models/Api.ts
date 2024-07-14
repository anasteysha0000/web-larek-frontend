import { ProductCategory } from "./App";

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

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

export interface IWebLarekApi{
    getProductList(): Promise<ApiListResponse<IProduct>>;
    getProductItem(): Promise<IProduct>;
    postOrder() : Promise<IPostOrder>;
}