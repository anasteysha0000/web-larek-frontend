import { Component } from "../base/component";
import { IEvents } from "../base/events";

interface IPage {
	counter: number | null;
	catalog: HTMLElement[];
}
class PageView extends Component<IPage>{
	private events: IEvents;
  private catalogContainer: HTMLElement;
	protected basket: HTMLElement;

  constructor(element: HTMLElement, events: IEvents) {
    super(element);
    this.events = events;
    this.catalogContainer = this.ensure(element, ".catalog-container");
	  this.basket =this.ensure(element, ".header__basket");
  }

  // Метод для установки каталога
  setCatalog(catalogItems: HTMLElement[]) {
    this.setChildren(this.catalogContainer, catalogItems);
  }

  // Метод для обновления счетчика
  updateCounter(newCounter: number) {
    const counterElement = this.ensure(this.element, ".counter");
    this.setValue(counterElement, newCounter.toString());
  }
}