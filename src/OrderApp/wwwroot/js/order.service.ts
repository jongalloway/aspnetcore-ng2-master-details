import {Injectable} from "angular2/core";
import MockOrders from "./mock-orders";

@Injectable()
export class OrderService {
    getOrders() {
        return Promise.resolve(MockOrders.getOrders());
    }

    getOrderDetails(id: number) {
        return Promise.resolve(MockOrders.getOrderDetails(id));
    }
}