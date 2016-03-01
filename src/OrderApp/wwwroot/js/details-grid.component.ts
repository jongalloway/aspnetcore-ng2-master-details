import {Component, OnChanges} from "angular2/core";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid/main";
import {IItemInfo} from "./itemInfo";
import {OrderService} from "./order.service";

@Component({
    selector: "details-grid",
    templateUrl: "../html/details-grid.html",
    directives: [AgGridNg2],
    inputs: ["itemInfo"]
})
export class DetailsGridComponent implements OnChanges {
    private itemInfo: IItemInfo;
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
                headerName: "Product",
                children: [
                    {
                        headerName: "ID", field: "productId",
                        width: 80, pinned: true
                    },
                    {
                        headerName: "Name", field: "productName",
                        width: 150, pinned: true
                    }

                ]
            },
            { headerName: "Quantity", field: "quantity", width: 100 },
            {
                headerName: "Price",
                field: "price",
                cellClass: "rightJustify",
                width: 100,
                cellRenderer: function (params: any) {
                    return "$" + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            {
                headerName: "Total",
                field: "total",
                cellClass: "rightJustify",
                width: 100,
                cellRenderer: function (params: any) {
                    return "$" + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            { headerName: "Comments", field: "comments", width: 600 }
        ];
    }

    private loadData() {
        if (this.itemInfo) {
            this._orderService.getOrderDetails(this.itemInfo.id)
                .then((orderDetails: any) => this.rowData = orderDetails);
        }
    }
}