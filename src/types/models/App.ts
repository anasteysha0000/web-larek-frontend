import { IProduct } from './Api';
export type ProductCategory =
	| 'хард-скил'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'другое'

export enum ProductsCategories {
	'хард-скил' = 'card__category_hard',
	'дополнительное' = 'card__category_additional',
	'кнопка' = 'card__category_button',
	'другое' = 'card__category_other',
	'софт-скил' = 'card__category_soft'
}

export type ProductPayment = 'online' | 'cash';

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
export interface IBasket {
	itemsBasket: IProduct[]// изменено с этого [IProduct, string, number][];
	totalBasket: number | null;
}
export interface IContacts {
	email: string;
	phone: string;
}
export interface IOrder extends IContacts, IAddress {
	total: number | string;
	items: string[];
}
export interface IOrderForms{
	payment: string;
	address: string;
	email: string;
	phone: string;
}
export interface IAddress{
	payment: string;
	address: string;
}
export type FormErrors = Partial<Record<keyof IOrder, string>>;
//удалены enumы