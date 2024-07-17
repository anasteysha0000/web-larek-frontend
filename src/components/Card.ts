import { IPostOrder, IProduct } from '../types/models/Api';
import { AppStateChanges } from '../types/models/App';
import { ensureElement } from '../utils/utils';
import { Component } from './base/base/component';
export type TCardActions = {
	onClick: (event: MouseEvent) => void;
};

export class Card extends Component<IProduct> {
	protected id: HTMLElement;
	protected description?: HTMLElement;
	protected image: HTMLImageElement;
	protected title: HTMLElement;
	protected category: HTMLElement;
	protected price: HTMLElement;
	protected button: HTMLElement;
	protected index: HTMLElement;
	protected flagBtn: boolean;
	constructor(element: HTMLElement, state: TCardActions) {
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