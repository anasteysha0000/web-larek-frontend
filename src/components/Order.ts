import { AppStateChanges, IOrder } from '../types/models/App';
import { IEvents } from './base/view/Events';
import { Form } from './common/Form';

export type TOrderActions = {
	onClickPayment: (event: Event) => void;
};
export class Order extends Form<IOrder> {
	protected _cashButton: HTMLButtonElement;
	protected _cardButton: HTMLButtonElement;
	protected _paymentTypes: string; //изменено
	protected _address: HTMLInputElement; //изменено
	constructor(
		container: HTMLFormElement,
		events: IEvents,
		state: TOrderActions
	) {
		//изменено
		super(container, events);
		this._cashButton = this.container.querySelector('[name="cash"]');
		this._cardButton = this.container.querySelector('[name="card"]');
		this._address = this.container.querySelector('[name="adress"]');
		if (state?.onClickPayment) {
			this._cardButton.addEventListener('click', state.onClickPayment);
			this._cashButton.addEventListener('click', state.onClickPayment);
		}
	}

	set payment(buttonType: string) {
		if (buttonType === 'cash') {
			this._paymentTypes = 'cash';
		}
		this._paymentTypes = 'card';
	}
	toggleCashButton() {
		this.toggleClass(this._cashButton, 'button_alt-active');
	}
	toggleCardButton() {
		this.toggleClass(this._cardButton, 'button_alt-active');
	}
	set adress(adress: string) {
		this._address.value = adress;
	}
}
