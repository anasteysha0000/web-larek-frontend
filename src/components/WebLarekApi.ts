import { ApiListResponse } from "../types/base/Api";
import { IPostOrder, IProduct } from "../types/models/Api";
import { Api } from "./base/view/Api";

export interface IWebLarekApi{
    getProductList(): Promise<ApiListResponse<IProduct>>;
    getProductItem(): Promise<IProduct>;
    postOrder() : Promise<IPostOrder>;
}
class WebLarekApi extends Api implements IWebLarekApi{
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    getProductListp(id:string): Promise<ApiListResponse<IProduct>> {
        
    }
    getProductItem(): Promise<IProduct> {
        
    }
    postOrder(order:IPostOrder): Promise<IPostOrder> {
        
    }

}