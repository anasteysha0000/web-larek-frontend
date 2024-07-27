import { IPage } from "../types/models/App";
import { Component } from "./base/view/Component";
import { IEvents } from "./base/view/Events";

export class Page extends Component<IPage> {
	protected _catalog: HTMLElement;
	protected _basket: HTMLElement;
	protected _cart: HTMLElement;
	protected _cartCounter: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
	}

	set catalog(items: HTMLElement[]) {}

	set cartCounter(value: number) {}

}