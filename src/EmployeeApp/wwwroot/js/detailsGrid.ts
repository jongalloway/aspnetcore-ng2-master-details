import {Component} from 'angular2/core';
import {AgGridNg2} from 'ag-grid-ng2/main';
import {IItemInfo} from './itemInfo';

@Component({
    selector: 'details-grid',
    templateUrl: '../html/detailsGrid.html',
    directives: [AgGridNg2],
    inputs: ['itemInfo']
})
export class DetailsGridComponent {
    itemInfo: IItemInfo;

    columnDefs = [
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
        { headerName: "Quantity", field: "quantity" },
        {
            headerName: "Price",
            field: "price",
            cellClass: 'rightJustify',
            cellRenderer: function (params: any) {
                return '$' + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    ];
    // put data directly onto the controller
    rowData = [
        { productId: Math.round(Math.random() * 1000), productName: "Hammer", quantity: 5, price: 55 },
        { productId: Math.round(Math.random() * 1000), productName: "Drill", quantity: 5, price: 260 },
        { productId: Math.round(Math.random() * 1000), productName: "Ladder", quantity: 5, price: 90 },
    ];
}