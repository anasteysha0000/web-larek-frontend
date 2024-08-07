import { ApiListResponse } from "../types/base/Api";
import { IPostOrder, IProduct } from "../types/models/Api";
import { Api } from "./base/view/Api";

export interface IWebLarekApi{
    getProductListp: () => Promise<ApiListResponse<IProduct>>;
    getProductItem:() => Promise<IProduct>;
    postOrder:() => Promise<IPostOrder>;
}
class WebLarekApi extends Api implements IWebLarekApi{ // я же имплементирую интерфейс почему пишет что свойства повторяются?
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    getProductListp() { //исправлено
        return this.get('/product')
        .then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
              ...item,
              image: this.cdn + item.image
            }))
          );
    }
    getProductItemp() {
        
    }
    postOrderp(order:IPostOrder){
        
    }
    getProductItem(id: string): Promise<IProduct> {
      
        );
      }
    
      getProductList(): Promise<IProduct[]> {
       
      }
    
      orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post(`/order`, order).then(
          (data: IOrderResult) => data
        );
      }

}