import { IProduct } from './Api';
export type ProductCategory =
	| 'хард-скил'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'другое';

export type ProductPayment =
	| 'online' | 'cash';

export interface IBasket {
	itemsBasket: [IProduct, string, number][];
	totalBasket: number | null;
}
interface IContacts {
	email: string;
	phone: string;
}
interface IOrder extends IContacts {
	payment: ProductPayment;
	address: string;
	total: number | null;
	items: string[];
}
// Какие модальные окна у нас есть
enum AppStateModals {
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
export interface AppState {
	// Загружаемые с сервера данные
	products: Map<string, IProduct>;

	// Заполняемые пользователем данные
	selectedProduct: IProduct | null;
	basket: IBasket;
	contacts: IContacts;
	order: IOrder;

	// Состояние интерфейса
	openedModal: AppStateModals;
	modalMessage: string | null;
	isError: boolean;

	// Пользовательские действия
	selectProduct(id: string): void;
	openBasket(): void;
	buyProduct(id: string): void;
	deleteProduct(id: string): void;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
}
