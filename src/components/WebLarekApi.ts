import { ApiListResponse } from '../types/base/Api';
import { IPostOrder, IProduct } from '../types/models/Api';
import { IOrder } from '../types/models/App';
import { Api } from './base/view/Api';

export interface IWebLarekApi {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	postOrder: (order: IOrder) => Promise<IPostOrder>;
}

export class WebLarekApi extends Api implements IWebLarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	public getProductList = (): Promise<IProduct[]> =>
		this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item: IProduct) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);

	public getProductItem = (id: string): Promise<IProduct> =>
		this.get(`/product/${id}`).then((item: IProduct) => {
			return {
				...item,
				image: this.cdn + item.image,
			};
		});

	public postOrder = (order: IOrder): Promise<IPostOrder> =>
		this.post('/order', order).then((item: IPostOrder) => {
			return item;
		});
}
