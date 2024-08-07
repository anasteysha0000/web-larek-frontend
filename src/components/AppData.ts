import { IProduct } from "../types/models/Api";
import { FormErrors, IBasket, IOrder, ProductPayment } from "../types/models/App";
import { IEvents } from "./base/view/Events";
import { Model } from "./base/view/Model";
export interface IAppState {
    product: IProduct;
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}
export class AppData extends Model<IAppState>{
	_products: IProduct[];
	_order: IOrder = {
		payment:"online",
		email: "",
		phone: "",
		address: "",
		items: [],
		total: 0
	};
	 _basket: IBasket = {
		itemsBasket: [],
		totalBasket:0
	 };
	 _preview: IProduct=null; //поменять в документации, и спросить у коли что это??
	 _events: IEvents;
	 _formErrors: FormErrors = {};
	constructor(events:IEvents){
		super({}, events);
	}
    setProducts(items: IProduct[]) {//поменять в документации setProducts(items: IProduct[])
		this._products = items
		this._events.emit('products:change', this._products)//поменять в документации
	}
    setPreview(items: IProduct) { //поменять в документации
		this._preview = items;
		this._events.emit('preview:change', this._preview)//поменять в документации
	}

	setContacts(email:string,phone:string){ //надо ли? как будто нет, потому что они не устанавливаются, а вводятся пользователем
		this._order.email = email;
		this._order.phone = phone;
	}
    setPayment(type:ProductPayment){
		this._order.payment = type;
	}
	getProduct(cardId: string) {}//???

    addProductToBasket(product: IProduct) {
		this._basket.itemsBasket.push(product.id);
		this._basket.totalBasket += product.price
		this._events.emit('basket:change', this._basket)
	}
    removeProductInBasket(product: IProduct) {
		if (this._basket.itemsBasket.indexOf(product.id) > -1) {
		  this._basket.itemsBasket.splice(this._basket.itemsBasket.indexOf(product.id), 1);
		  this._basket.totalBasket -= product.price;
		  this._events.emit('basket:change', this._basket);
	  }
	}
    clearBasket() {
		this._basket.itemsBasket = [];
		this._basket.totalBasket = 0
		this._events.emit('basket:change', this._basket);
	}
	private validateField(field: keyof IOrder, errorMessage: string): void { //добавить в документацию
		if (!this._order[field]) {
		  this._formErrors[field] = errorMessage;
		} else {
		  delete this._formErrors[field];
		}
	  }
	
	  isOrderValidForm(){
		this._formErrors = {};
		this.validateField('address', 'Необходимо указать адрес');
		this.validateField('payment', 'Необходимо указать тип оплаты');
		this.validateField('email', 'Необходимо указать электронную почту');
		this.validateField('phone', 'Необходимо указать номер телефона');
		this._events.emit('orderErrors:change', this._formErrors); //добавить в документацию событие
		return Object.keys(this._formErrors).length === 0;
	  }
	setOrderField(field: keyof IContacts, value: string) {
		this._order[field] = value;

        if (this.isOrderValidForm()) {
            this._events.emit('order:ready', this._order);
        }
	}
  
}