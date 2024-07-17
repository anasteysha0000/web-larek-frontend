import { ensureElement } from '../../utils/utils';
import { Component } from '../base/base/component';
import { EventEmitter } from '../base/base/events';

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
	}
	set products(products: HTMLElement[]) {}
	set total(total: number) {}
	set selected(selected: number) {}
}
