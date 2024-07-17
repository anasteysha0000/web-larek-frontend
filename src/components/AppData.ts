import { IProduct } from "../types/models/Api";
import { FormErrors, IBasket, IOrder, IPage } from "../types/models/App";
import { IEvents } from "./base/base/events";
import { Model } from "./base/base/model";

export class AppData extends Model<IPage> {
	protected products: IProduct[];
	protected order: IOrder = {
		payment:"online",
		email: "",
		phone: "",
		address: "",
		items: [],
		total: 0
	};
	protected basket: IBasket[] = [];
	protected preview: string | null;
	protected events: IEvents;
	protected formErrors: FormErrors = {};
    setCatalog(items: IProduct[]) {}
    setPreview(id: string | null) {}
	setTotal(){}
	setContacts(email:string,phone:string){}
    setPayment(type:string){}
	getProduct(cardId: string) {}
    addProduct(product: IProduct) {}
    removeProduct(product: IProduct) {}
    clearBasket() {}
	isOrderValidForm() {}
	isContactsValidForm() {}
	setOrderField(field: keyof IOrder, value: string) {}
    createOrder(){}
}