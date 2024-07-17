import { Component } from '../base/base/component';
import { IEvents } from '../base/base/events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
	}

	set content(value: HTMLElement) {}

	open() {}

	close() {}

	render(data: IModalData): HTMLElement {}
}
