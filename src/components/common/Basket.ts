import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/view/Component';
import { EventEmitter } from '../base/view/Events';


interface IBasketView {
	products: HTMLElement[];
	total: number;
	selected: string[];
}
export class Basket extends Component<IBasketView> {
	protected _products: HTMLElement;
	 _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._products = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total =container.querySelector('.basket__price');
		this._button = container.querySelector('.basket__button')

		if (this._button){
			this._button.addEventListener('click',()=>{
				events.emit('basket:open');
			})
		}
	}
	set products(products: HTMLElement[]) {
		products.length ? this._products.replaceChildren(...products) :  this._products.replaceChildren(createElement<HTMLParagraphElement>('p', {
			textContent: 'Корзина пуста'
		}));
	}
	set total(total: number) {
		this.setText(this._total,`${total} синапсов`); 
	}
	set selected(products: string[]) {
        products.length? this.setDisabled(this._button, false):  this.setDisabled(this._button, true);
	}

}