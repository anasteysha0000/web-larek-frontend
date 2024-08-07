import { ApiListResponse } from '../types/base/Api';
import { IPostOrder, IProduct } from '../types/models/Api';
import { Api } from './base/view/Api';

export interface IWebLarekApi {
	getProductList: () => Promise<ApiListResponse<IProduct>>;
	getProductItem: (id: string) => Promise<IProduct>;
	postOrder: (order: IPostOrder) => Promise<IPostOrder>;
}

export class WebLarekApi extends Api implements IWebLarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<ApiListResponse<IProduct>> {
		return this.get('/product').then((obj: ApiListResponse<IProduct>) => {
			obj.items = obj.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}));
			return obj;
		});
	}

	getProductItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => {
			return {
				...item,
				image: this.cdn + item.image,
			};
		});
	}

	postOrder(order: IPostOrder): Promise<IPostOrder> {
		return this.post('/order', order).then((item: IPostOrder) => {
			return item;
		});
	}
}
