import { IPostOrder, IProduct } from '../types/models/Api';
import { ProductCategory, ProductsCategories } from '../types/models/App';
import { ensureElement } from '../utils/utils';
import { Component } from './base/view/Component';
export type ICardActions = {
	onClick: (event: MouseEvent) => void;
};

export class Card extends Component<IProduct> {
	 _id: HTMLElement;
	 _description?: HTMLElement;
	 _image: HTMLImageElement;
	 _title: HTMLElement;
	 _category: HTMLElement;
	 _price: HTMLElement;
	 _button: HTMLElement;
	 _index: HTMLElement;
	 _flagBtn: boolean;
	 
	constructor(element: HTMLElement, state: ICardActions) {
		super(element);
		this._title = ensureElement<HTMLElement>('.card__title', element);
		this._image = element.querySelector('.card__image');
		this._price = ensureElement<HTMLSpanElement>('.card__price',element);
		this._category = element.querySelector('.card__category');
		this._description = element.querySelector('.card__text');
		this._button = element.querySelector(`.card__button`);
		if (state?.onClick) {
			const targetElement = this._button || element;
			targetElement.addEventListener('click', state.onClick);
		  
			if (this._flagBtn && this._button) {
			  this.setDisabled(this._button, this._flagBtn);
			}
		}
	}
	
	set id(value: string) {
		this.container.dataset.id = value;
	}
	
	get id(): string {
		return this.container.dataset.id || '';
	}
	set title(value: string) {
		this.setText(this._title, value);
	}
	get title(): string {
		return this._title.textContent || '';
	}
	set price(value: string) {
		(value===null) ? this.setText(this._price,'Бесценно') : this.setText(this._price, `${value} синапсов`)
	}
	get price(): string {
		return this._price.textContent || '';
	}
	set image(value: string) {
		this.setImage(this._image, value, this.title); //указать в документации что он из компонента метод сетимадж
	}
	set description(value: string) {
		this.setText(this._description,value)
	}
	get description(): string{
		return this._description.textContent || '';
	}
   	set category(value: ProductCategory){//изменено
		this._category.classList.replace('card__category_soft', ProductsCategories[value]);
		this.setText(this._category, value)
	};
 

	
	//удалено сетпрайс и сетдескриптион и сеткатегори
  
}