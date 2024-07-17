export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	toggleClass(element: HTMLElement, className: string, force?: boolean) {}

	setText(element: HTMLElement, value: unknown) {}

	setDisabled(element: HTMLElement, state: boolean) {}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {}

	render(data?: Partial<T>): HTMLElement {}
}
