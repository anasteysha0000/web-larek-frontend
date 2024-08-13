import { IProduct } from '../types/models/Api';
import {
	FormErrors,
	IAddress,
	IBasket,
	IContacts,
	IOrder,
	IOrderForms,
	ProductPayment,
} from '../types/models/App';
import { IEvents } from './base/view/Events';
import { Model } from './base/view/Model';
import { RegexEnum, regexPatterns } from '../types/base/validate';
export interface IAppState {
	product: IProduct;
	basket: IProduct[];
	preview: string | null;
	order: IOrder | null;
}

export class AppData extends Model<IAppState> {
	public _products: IProduct[];
	public _order: IOrder = {
		payment: 'online',
		email: '',
		phone: '',
		address: '',
		items: [],
		total: 0,
	};
	public _basket: IBasket = {
		itemsBasket: [],
		totalBasket: 0,
	};
	public _preview: IProduct = null; //поменять в документации, и спросить у коли что это??
	public _formErrors: FormErrors = {};
	constructor(data: object, events: IEvents) {
		super(data, events);
	}

	public setProducts(items: IProduct[]) {
		//поменять в документации setProducts(items: IProduct[])
		this._products = items;
		this.emitChanges('items:changed', this._products); //поменять в документации
	}
	public setPreview(items: IProduct) {
		//поменять в документации
		this._preview = items;
		this.emitChanges('preview:change', this._preview); //поменять в документации
	}

	public setContacts(email: string, phone: string) {
		//надо ли? как будто нет, потому что они не устанавливаются, а вводятся пользователем
		this._order.email = email;
		this._order.phone = phone;
	}
	public setPayment(type: ProductPayment) {
		this._order.payment = type;
	}

	public addProductToBasket(product: IProduct) {
		this._basket.itemsBasket.push(product);
		this._basket.totalBasket += product.price as number;
		this.emitChanges('basket:change', this._basket);
	}

	private isProductPriceless(product: IProduct): boolean {
		return !product.price;
	}

	private isBasketHaveProductPriceless(): boolean {
		let have = false;
		this._basket.itemsBasket.forEach((item: IProduct) => {
			if (this.isProductPriceless(item)) {
				have = true;
			}
		});
		return have;
	}
	public isProductInBasket(product: IProduct) {
		const exists = this._basket.itemsBasket.some(
			(item) => item.id === product.id
		);
		if (!exists) {
			return true;
		}
	}
	public getTotal() {
		//добавлено
		if (this.isBasketHaveProductPriceless()) {
			return 'Бесценно';
		}
		return this._basket.itemsBasket.reduce(
			(a, c) => a + (c.price as number),
			0
		);
	}

	public removeProductInBasket(product: IProduct) {
		if (this._basket.itemsBasket.indexOf(product) > -1) {
			this._basket.itemsBasket.splice(
				this._basket.itemsBasket.indexOf(product),
				1
			);
			this._basket.totalBasket -= product.price;
			this.emitChanges('basket:change', this._basket);
		}
	}
	public clearBasket() {
		this._basket.itemsBasket = [];
		this._basket.totalBasket = 0;
		this.emitChanges('basket:change', this._basket);
	}
	private validateEmptyField(
		field: keyof IOrder,
		errorMessage: string
	): boolean {
		//добавить в документацию
		if (!this._order[field]) {
			this._formErrors[field] = errorMessage;
			return false;
		}

		delete this._formErrors[field];
		return true;
	}

	private validateFieldRegex(
		field: keyof IOrder,
		errorMessage: string,
		regex: RegExp
	): boolean {
		if (!regex.test(this._order[field] as string)) {
			this._formErrors[field] = errorMessage;
			return false;
		}
		delete this._formErrors[field];
		return true;
	}

	private isOrderValidForm() {
		if (this.validateEmptyField('address', 'Необходимо указать адрес')) {
			this.validateFieldRegex(
				'email',
				'Некорректный формат адреса',
				regexPatterns[RegexEnum.Address]
			);
		}
		if (
			this.validateEmptyField('email', 'Необходимо указать электронную почту')
		) {
			this.validateFieldRegex(
				'email',
				'Некорректный формат электронной почты',
				regexPatterns[RegexEnum.Email]
			);
		}
		if (this.validateEmptyField('phone', 'Необходимо указать номер телефона')) {
			this.validateFieldRegex(
				'phone',
				'Некорректный формат номера телефона',
				regexPatterns[RegexEnum.PhoneNumber]
			);
		}
		this.validateEmptyField('payment', 'Необходимо указать тип оплаты');
		this.emitChanges('formErrors:change', this._formErrors); //добавить в документацию событие
		return Object.keys(this._formErrors).length === 0;
	}

	public setOrderField(field: keyof IOrderForms, value: string) {
		this._order[field] = value;
		if (this.isOrderValidForm()) {
			this.emitChanges('order:ready', this._order);
		}
	}
}
