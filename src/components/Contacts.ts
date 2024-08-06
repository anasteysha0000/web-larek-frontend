import { IContacts} from "../types/models/App";
import { IEvents } from "./base/view/Events";
import { Form } from "./common/Form";

export class Contacts extends Form<IContacts> {

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}
    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}