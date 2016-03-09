import {Component, OnChanges, EventEmitter} from "angular2/core";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid/main";
import {IItemInfo} from "./itemInfo";
import {OrderService} from "./order.service";

@Component({
    selector: "details-grid",
    templateUrl: "../html/details-grid.html",
    directives: [AgGridNg2],
    inputs: ["itemInfo"],
    outputs: ["updatedTotal"],
})
export class DetailsGridComponent implements OnChanges {
    private itemInfo: IItemInfo;
    private updatedTotal = new EventEmitter<number>();
    private gridOptions: GridOptions;
    private rowData: any[];
    private columnDefs: any[];

    constructor(private _orderService: OrderService) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createColumnDefs();
        this.loadData();
    }

    ngOnChanges() {
        this.loadData();
    }

    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: "OrderDetailsId", field: "orderDetailsId", hide: true
            },
            {
                headerName: "Product",
                children: [
                    {
                        headerName: "ID", field: "productId",
                        width: 80, pinned: true,
                        cellClass: "unselectable"
                    },
                    {
                        headerName: "Name", field: "productName",
                        width: 150, pinned: true,
                        cellClass: "unselectable"
                    }

                ]
            },
            {
                headerName: "Quantity", field: "quantity", width: 100, editable: true,
                newValueHandler: this.onQuantityValueChanged.bind(this)
            },
            {
                headerName: "Price",
                field: "price",
                cellClass: "rightJustify unselectable",
                width: 100,
                cellRenderer: function (params: any) {
                    return "$" + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            {
                headerName: "Total",
                field: "total",
                cellClass: "rightJustify unselectable",
                width: 100,
                cellRenderer: function (params: any) {
                    return "$" + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            {
                headerName: "Comments", field: "comments", width: 600, editable: true,
                newValueHandler: this.onCommentsValueChanged.bind(this)
            }
        ];
    }

    private loadData() {
        if (this.itemInfo) {
            this._orderService.getOrderDetails(this.itemInfo.id)
                .then((orderDetails: any) => this.rowData = orderDetails);
        }
    }

    private updateOrderTotal() {
        let newTotal = this.rowData.reduce((previousValue: number, currentValue: any) => {
            return previousValue + currentValue.total;
        }, 0);

        this.updatedTotal.emit(newTotal);
    }

    private onQuantityValueChanged(params: any) {
        let newValue = Number(params.newValue);
        if (newValue === NaN) {
            params.data.quantity = params.oldValue;
        } else {
            params.data.quantity = newValue;
        }

        params.data.total = newValue * params.data.price;
        this.updateItem(params.data);

        this.updateOrderTotal();

        this._orderService.updateOrderDetails(params.data);
    }

    private updateItem(updatedItem: any) {
        let id = updatedItem.productId;

        var updatedNodes = [];
        this.gridOptions.api.forEachNode(function (node:any) {
            let data = node.data;
            if (data.productId === id) {
                data.total = updatedItem.total;
                data.quantity = updatedItem.quantity;
                updatedNodes.push(node);
            }
        });

        this.gridOptions.api.refreshCells(updatedNodes, ["total", "quantity" ]);
    }

    private onCommentsValueChanged(params: any) {
        this._orderService.updateOrderDetails(params.data);
    }
}