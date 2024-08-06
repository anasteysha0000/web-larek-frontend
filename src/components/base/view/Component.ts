export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	toggleClass(element: HTMLElement, className: string) {
		element.classList.toggle(className)
	}

	protected setText(element: HTMLElement, value: unknown) {
		if (element){
		element.textContent = String(value)
		}
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element){
			if (state){
				element.setAttribute('disabled', 'disabled');
			}
			element.removeAttribute('disabled');
		}
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element){
			element.src = src;
			if (alt){
			element.alt = alt; 
			}
		}
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
        return this.container;
    }
	}

