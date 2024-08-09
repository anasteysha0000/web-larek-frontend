import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/view/Component';
import { EventEmitter } from '../base/view/Events';


interface IBasketView {
	products: HTMLElement[];
	total: number | null;
	selected: number;
}
export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button')

		if (this._button){
			this._button.addEventListener('click',()=>{
				events.emit('basket:open');
			})
		}
	}
	set products(products: HTMLElement[]) {
		products.length? this._list.replaceChildren(...products):  this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
			textContent: 'Корзина пуста'
		}));
           
	}//что если товар бесценный?
	set total(total: number) {
		this.setText(this._total,`${total} синапсов`); 
	}
	set selected(products: string[]) {
        products.length? this.setDisabled(this._button, false):  this.setDisabled(this._button, true);
	}

}