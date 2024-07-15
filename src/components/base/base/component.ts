import {ViewChild, isChildElement,ViewValue} from "../../../types/view/componentView";
export abstract class Component<T>{
    protected element: HTMLElement;
    protected constructor(element:HTMLElement){
        this.element = element
    }
    protected cache: Record<string, HTMLElement> = {};

    // проверяем существует ли элемент
    protected ensure(root: HTMLElement, query?: string, isRequired: boolean = true) {
        if (!root) throw new Error(`Root element not found`);
        if (!query) return root;
        if (!this.cache[query]) {
            const el = this.element.querySelector(query);
            if (el) this.cache[query] = el as HTMLElement;
            else if (isRequired) throw new Error(`Element not found`);
        }
        return this.cache[query];
    }
    // замена элемента на другой или его обновлённую версию с проверкой существования обоих
    protected setElement(query: string, value: HTMLElement) {
        const el = this.ensure(this.element, query);
        el.replaceWith(this.ensure(value));
    }
    protected setChildren(root: HTMLElement, childs: ViewChild) {
        root.replaceChildren(...Array.isArray(childs) ? childs : [childs]);
}
 // метод для универсальной установки свойств тега
 protected setValue(query: string | HTMLElement, value: ViewValue, isRequired: boolean = true) {
        const el = query instanceof HTMLElement ? query : this.ensure(this.element, query);
        if (typeof value === 'string') el.textContent = value;
        else if (isChildElement(value)) this.setChildren(el, value);
        else if (typeof value === 'object') Object.assign(el, value);
        else {
            throw new Error(`Unknown value type`);
        }
    }
} 
