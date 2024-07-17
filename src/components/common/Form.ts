import { ensureElement } from '../../utils/utils';
import { Component } from '../base/base/component';
import { IEvents } from '../base/base/events';

interface IFormState {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
	}
	//обработка изменений в поле ввода
	protected onInputChange(field: keyof T, value: string) {}
	//валидность поля
	set valid(value: boolean) {}
	//ошибки поля
	set errors(value: string) {
	}
	render(state: Partial<T> & IFormState) {}
}
