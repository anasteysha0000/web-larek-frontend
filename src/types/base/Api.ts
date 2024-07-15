import { IPostOrder, IProduct } from "../models/Api";
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};
export interface IWebLarekApi{
    getProductList(): Promise<ApiListResponse<IProduct>>;
    getProductItem(): Promise<IProduct>;
    postOrder() : Promise<IPostOrder>;
}