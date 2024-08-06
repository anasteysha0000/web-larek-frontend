import { IProduct } from './Api';
export type ProductCategory =
	| 'хард-скил'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'другое';

export type ProductPayment = 'online' | 'cash';

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
export interface IBasket {
	itemsBasket: string[]// изменено с этого [IProduct, string, number][];
	totalBasket: number | null;
}
export interface IContacts {
	email: string;
	phone: string;
}
export interface IOrder extends IContacts {
	payment: ProductPayment;
	address: string;
	total: number | null;
	items: string[];
}
export type FormErrors = Partial<Record<keyof IOrder, string>>;
// Какие модальные окна у нас есть
export enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
	payment = 'modal:payment',
	contacts = 'modal:contacts',
	postOrder = 'modal:postOrder',
}
// Какие изменения состояния приложения могут происходить
export enum AppStateChanges {
	products = 'change:products',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	selectedProduct = 'change:selectedProduct',
	basket = 'change:basket',
	order = 'change:order',
	
}