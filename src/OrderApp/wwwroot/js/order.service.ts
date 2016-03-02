import {Injectable} from "angular2/core";
import MockOrders from "./mock-orders";
import {IItemInfo} from "./itemInfo";
import {Http, HTTP_BINDINGS, Headers, RequestOptions} from "angular2/http";
import 'rxjs/Rx';

@Injectable()
export class OrderService {
    private orderEndpoint = "/api/orders/";
    private orderDetailsEndpoint = "/api/orderDetails/";

    constructor(private http: Http) {
    }

    getOrders(): Promise<IItemInfo[]> {
        //return Promise.resolve(MockOrders.getOrders());

        var headers = new Headers();
        headers.append("If-Modified-Since", "Mon, 27 Mar 1972 00:00:00 GMT");

        return this.http.get(this.orderEndpoint, { headers: headers })
            .map(res => <IItemInfo[]> res.json())
            .toPromise();
    }

    getOrderDetails(id: number): Promise<any> {
        // return Promise.resolve(MockOrders.getOrderDetails(id));

        var headers = new Headers();
        headers.append("If-Modified-Since", "Mon, 27 Mar 1972 00:00:00 GMT");
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.orderDetailsEndpoint + id, { headers: headers })
            .map(res => res.json())
            .toPromise();
    }

    updateOrderDetails(orderDetails: any): Promise<any> {
        // return Promise.resolve(orderDetails);

        let body = JSON.stringify(orderDetails);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.orderDetailsEndpoint + orderDetails.productId, body, options)
            .map(res => res.json())
            .toPromise();
    }
}