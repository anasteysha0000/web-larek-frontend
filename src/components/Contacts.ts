import { IContacts} from "../types/models/App";
import { Form } from "./common/Form";

export class Contacts extends Form<IContacts>{
    set email(value: string){}
    set phone(value: string){}
}