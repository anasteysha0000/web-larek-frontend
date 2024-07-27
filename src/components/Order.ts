import { AppStateChanges, IOrder } from "../types/models/App";
import { IEvents } from "./base/view/Events";
import { Form } from "./common/Form";


export class Order extends Form<IOrder> {
    protected _cash: HTMLButtonElement;
	protected _card: HTMLButtonElement;
	protected _paymentTypes: HTMLElement[];
	protected _address: HTMLElement[];
    constructor(container: HTMLFormElement, events: IEvents, change: AppStateChanges) {
        super(container, events);
    }

   set payment(value: string){}
   set adress(value:string){}

}