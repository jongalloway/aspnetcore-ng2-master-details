import {Injectable} from "angular2/core";
import MockOrders from "./mock-orders";
import {Http, HTTP_BINDINGS, Headers} from "angular2/http";

@Injectable()
export class OrderService {
    constructor(http: Http) {}

    getOrders() {
        return Promise.resolve(MockOrders.getOrders());
    }

    getOrderDetails(id: number) {
        return Promise.resolve(MockOrders.getOrderDetails(id));
    }

    updateOrderDetails(updatedOrderDetails: any) {
        return Promise.resolve(updatedOrderDetails);
    }
}