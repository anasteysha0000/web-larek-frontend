import { IOrder } from '../types/models/App';
import { IEvents } from './base/view/Events';
import { Form } from './common/Form';


export class Order extends Form<IOrder> {
	protected _cashButton: HTMLButtonElement;
	protected _cardButton: HTMLButtonElement;
	protected _address: HTMLInputElement; 
	constructor(
		container: HTMLFormElement,
		events: IEvents,
	) {
		//изменено
		super(container, events);
		this._cashButton = this.container.querySelector('[name="cash"]');
		this._cardButton = this.container.querySelector('[name="card"]');
		this._address = this.container.querySelector('[name="adress"]');
		if (this._cashButton) {
			this._cashButton.addEventListener('click', () => {
				if (this._cardButton.classList.contains('button_alt-active')) {
					this._cardButton.classList.remove('button_alt-active');
				}
				this._cashButton.classList.add('button_alt-active');
				this.onInputChange('payment', 'cash');
			});
		}
		if (this._cardButton) {
			this._cardButton.addEventListener('click', () => {
				if (this._cashButton.classList.contains('button_alt-active')) {
					this._cashButton.classList.remove('button_alt-active');
				}
				this._cardButton.classList.add('button_alt-active');
				this.onInputChange('payment', 'card');
			});
		}
	}
}
