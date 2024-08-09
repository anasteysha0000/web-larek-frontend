import { IPage } from "../types/models/App";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/view/Component";
import { IEvents } from "./base/view/Events";

export class Page extends Component<IPage> {
	 _counter: HTMLElement;
     _catalog: HTMLElement;
     _wrapper: HTMLElement;
     _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
		this._counter = ensureElement<HTMLElement>('.header__basket-counter')
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open'); // событие
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }

}