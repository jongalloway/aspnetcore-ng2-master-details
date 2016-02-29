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
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
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
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ];
}