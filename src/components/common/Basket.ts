import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/view/Component';
import { EventEmitter } from '../base/view/Events';

interface IBasketView {
	products: HTMLElement[];
	total: number | string;
}
export class Basket extends Component<IBasketView> {
	protected _products: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._products = ensureElement<HTMLElement>(
			'.basket__list',
			this.container
		);
		this._total = container.querySelector('.basket__price');
		this._button = container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:select');
			});
		}
	}
	public set products(products: HTMLElement[]) {
		if (products.length) {
			this._products.replaceChildren(...products);
			this._button.disabled = false;
		} else {
			this._button.disabled = true;
			this._products.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}
	public set total(total: number | string){
		if (typeof total === 'string') {
			this._button.disabled = true;
			this.setText(this._total, 'Стоимость заказа слишком высока');
		} else {
			this.setText(this._total, `${total} синапсов`);
		}
	}
}
