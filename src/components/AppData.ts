import { IProduct } from "../types/models/Api";
import { FormErrors, IBasket, IOrder, ProductPayment } from "../types/models/App";
import { IEvents } from "./base/view/Events";

export class AppData{
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
	constructor(events:IEvents){}
    setProducts(items: IProduct[]) {//поменять в документации setProducts(items: IProduct[])
		this._products = items
		this._events.emit('products:change', this._products)//поменять в документации
	}
    setPreview(items: IProduct) { //поменять в документации
		this._preview = items;
		this._events.emit('preview:change', this._preview)//поменять в документации
	}
	//setTotal(){
	//	this._order.total = надо ли?
	//}
	setContacts(email:string,phone:string){}
    setPayment(type:ProductPayment){}
	getProduct(cardId: string) {}

    addProductToBasket(product: IProduct) {
		this._basket.itemsBasket.push(product.id);
		this._basket.totalBasket += product.price
		this._events.emit('basket:change', this._preview)
	}
    removeProduct(product: IProduct) {}
    clearBasket() {}
	isOrderValidForm() {}
	isContactsValidForm() {}
	setOrderField(field: keyof IOrder, value: string) {}
    createOrder(){}
}