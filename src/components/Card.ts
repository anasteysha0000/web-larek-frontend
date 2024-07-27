import { IPostOrder, IProduct } from '../types/models/Api';
import { AppStateChanges } from '../types/models/App';
import { ensureElement } from '../utils/utils';
import { Component } from './base/view/Component';
export type ICardActions = {
	onClick: (event: MouseEvent) => void;
};

export class Card extends Component<IProduct> {
	protected _id: HTMLElement;
	protected _description?: HTMLElement;
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _index: HTMLElement;
	protected _flagBtn: boolean;
	constructor(element: HTMLElement, state: ICardActions) {
		super(element);
	}
	set titleCard(value: string) {}
	get titleCard(): string {}
	set priceCard(value: string) {}
	get priceCard(): string {}
	set imageCard(value: string) {}
	set descriptionCard(value: string) {}
 	get descriptionCard(): string{}
	set categoreCard():string{};
	get categoreCard():string{};

	protected setDescriptionCard(element: HTMLElement,value: unknown){}
	protected setImageCard(element: HTMLImageElement, src: string, alt: string) {}
	setCategoryCard(value: string) {}
}