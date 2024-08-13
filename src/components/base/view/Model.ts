import { IEvents } from './Events';

export const isModel = (obj: unknown): obj is Model<unknown> => {
	return obj instanceof Model;
};

export abstract class Model<T> {
	protected constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	public emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
