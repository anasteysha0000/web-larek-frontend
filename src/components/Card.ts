import { IPostOrder, IProduct } from '../types/models/Api';
import { ProductCategory, ProductsCategories } from '../types/models/App';
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
	protected _button: HTMLButtonElement;
	protected _index: HTMLSpanElement;
	protected _selected: boolean;

	constructor(element: HTMLElement, state: ICardActions) {
		super(element);
		this._title = ensureElement<HTMLElement>('.card__title', element);
		this._image = element.querySelector('.card__image');
		this._price = ensureElement<HTMLSpanElement>('.card__price', element);
		this._category = element.querySelector('.card__category');
		this._description = element.querySelector('.card__text');
		this._button = element.querySelector(`.card__button`);
		this._index = element.querySelector('.basket__item-index');

		if (state?.onClick) {
			const targetElement = this._button || element;
			targetElement.addEventListener('click', state.onClick);

			if (this._selected && this._button) {
				this.setDisabled(this._button, this._selected);
			}
		}
	}
	public setTextButton(value: string): void {
		this.button.textContent = value;
	}

	public get selected(): boolean {
		return this._selected;
	}
	public get button(): HTMLButtonElement {
		return this._button;
	}
	public set index(value: string) {
		this._index.textContent = value;
	}

	public get index(): string {
		return this._index.textContent || '';
	}
	public set id(value: string) {
		this.container.dataset.id = value;
	}

	public get id(): string {
		return this.container.dataset.id || '';
	}
	public set title(value: string) {
		this.setText(this._title, value);
	}
	public get title(): string {
		return this._title.textContent || '';
	}
	public set price(value: string) {
		value === null
			? this.setText(this._price, 'Бесценно')
			: this.setText(this._price, `${value} синапсов`);
	}
	public get price(): string {
		return this._price.textContent || '';
	}
	public set image(value: string) {
		this.setImage(this._image, value, this.title); //указать в документации что он из компонента метод сетимадж
	}
	public set description(value: string) {
		this.setText(this._description, value);
	}
	public get description(): string {
		return this._description.textContent || '';
	}
	public set category(value: ProductCategory) {
		//изменено
		this._category.classList.replace(
			'card__category_soft',
			ProductsCategories[value]
		);
		this.setText(this._category, value);
	}
	//удалено сетпрайс и сетдескриптион и сеткатегори
}
