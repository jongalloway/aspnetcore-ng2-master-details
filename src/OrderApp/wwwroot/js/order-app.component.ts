"use strict";

import {Component, View} from "angular2/core";
import {GridOptions} from "ag-grid/main";
import {AgGridNg2} from "ag-grid-ng2/main";
import RefData from "./refData";
import {IItemInfo} from "./itemInfo";
import {DetailsGridComponent} from "./details-grid.component";

@Component({
    selector: "order-app"
})
@View({
    directives: [AgGridNg2, DetailsGridComponent],
    templateUrl: "../html/order-app.html"
})
export class OrderApp {
    private gridOptions: GridOptions;
    private rowData: any[];
    private columnDefs: any[];
    private rowCount: string;
    private selectedItem: IItemInfo;

    constructor() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.createColumnDefs();
    }

    private createRowData() {
        var rowData: any[] = [];
        var orderId: number = 1;
        var date: Date = new Date();

        for (var i = 0; i < 10000; i++) {
            var countryData = RefData.countries[i % RefData.countries.length];
            rowData.push({
                orderId: orderId++,
                date: new Date(date.setDate(date.getDate() - Math.round(Math.random() * 100))).toISOString().substr(0, 10),
                orderTotal: "$" + Math.round(Math.random() * 100) + ".00",
                name: RefData.firstNames[i % RefData.firstNames.length] + " " + RefData.lastNames[i % RefData.lastNames.length],
                address: RefData.addresses[i % RefData.addresses.length],
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                phone: createRandomPhoneNumber()
            });
        }

        this.rowData = rowData;
    }

    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: "Order",
                children: [
                    {
                        headerName: "ID", field: "orderId",
                        width: 30, pinned: true
                    },
                    {
                        headerName: "Date", field: "date",
                        width: 80, pinned: true
                    },
                    {
                        headerName: "Total", field: "orderTotal",
                        width: 80, pinned: true
                    },
                ]
            },
            {
                headerName: "Customer",
                children: [
                    {
                        headerName: "Name", field: "name",
                        width: 150, pinned: true
                    },
                    {
                        headerName: "Country", field: "country", width: 150,
                        cellRenderer: countryCellRenderer, pinned: true,
                        filterParams: { cellRenderer: countryCellRenderer, cellHeight: 20 }
                    },
                ]
            },
            {
                headerName: "Contact",
                children: [
                    { headerName: "Phone", field: "phone", width: 150, filter: "text" },
                    { headerName: "Address", field: "address", width: 500, filter: "text" }
                ]
            }
        ];
    }

    private calculateRowCount() {
        if (this.gridOptions.api && this.rowData) {
            var model = this.gridOptions.api.getModel();
            var totalRows = this.rowData.length;
            var processedRows = model.getVirtualRowCount();
            this.rowCount = processedRows.toLocaleString() + " / " + totalRows.toLocaleString();
        }
    }

    private onModelUpdated() {
        this.calculateRowCount();
    }

    private onReady() {
        this.calculateRowCount();
    }

    private onRowClicked($event:any) {
        this.selectedItem = $event.node.data;
    }

    private onQuickFilterChanged($event:any) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }
}

function countryCellRenderer(params:any) {
    "use strict";

    var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='../images/flags/" +
        RefData.COUNTRY_CODES[params.value] + ".png'>";
    return flag + " " + params.value;
}

function createRandomPhoneNumber() {
    "use strict";

    var result = "+";
    for (var i = 0; i < 12; i++) {
        result += Math.round(Math.random() * 10);
        if (i === 2 || i === 5 || i === 8) {
            result += " ";
        }
    }
    return result;
}