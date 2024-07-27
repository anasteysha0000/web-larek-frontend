import { IPostOrder, IProduct } from "../models/Api";
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};
