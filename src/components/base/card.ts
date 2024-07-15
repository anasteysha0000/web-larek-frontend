import { IPostOrder, IProduct } from "../../types/models/Api";
import { Component } from "./base/component";

export class Card extends Component<IProduct>{
    protected id: HTMLElement;
    protected description?: HTMLElement;
    protected image: HTMLElement;
    protected title: HTMLElement;
    protected category: HTMLElement;
    protected price: HTMLElement;
    protected button: HTMLElement;
    protected buttonText:HTMLElement;
    constructor(element: HTMLElement) {
		super(element);
        this.id = this.ensure(element,'.basket__item-index');
        this.description = this.ensure(element,'.card__text');
        this.image = this.ensure(element,'.card__image');
		this.title = this.ensure(element,'.card__title');
		this.category = this.ensure(element,'.card__category');
		this.price = this.ensure(element,'.card__price');
		this.button = this.ensure(element,'.card__button');
		
		
		

}
