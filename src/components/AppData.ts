import { IProduct } from "../types/models/Api";
import { FormErrors, IBasket, IOrder, ProductPayment } from "../types/models/App";
import { IEvents } from "./base/view/Events";

export class AppData{
	protected _products: IProduct[];
	protected _order: IOrder = {
		payment:"online",
		email: "",
		phone: "",
		address: "",
		items: [],
		total: 0
	};
	protected _basket: IBasket[] = [];
	protected _preview: string | null;
	protected _events: IEvents;
	protected _formErrors: FormErrors = {};
    setCatalog(items: IProduct[]) {}
    setPreview(id: string | null) {}
	setTotal(){}
	setContacts(email:string,phone:string){}
    setPayment(type:ProductPayment){}
	getProduct(cardId: string) {}
    addProduct(product: IProduct) {}
    removeProduct(product: IProduct) {}
    clearBasket() {}
	isOrderValidForm() {}
	isContactsValidForm() {}
	setOrderField(field: keyof IOrder, value: string) {}
    createOrder(){}
}