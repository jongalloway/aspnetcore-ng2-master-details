System.register(['angular2/core', 'angular2/http', 'angular2/platform/browser', 'ag-grid-ng2/main', './proficiencyFilter', './skillFilter', './refData'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, browser_1, main_1, proficiencyFilter_1, skillFilter_1, refData_1;
    var AppComponent;
    function skillsCellRenderer(params) {
        var data = params.data;
        var skills = [];
        refData_1.default.IT_SKILLS.forEach(function (skill) {
            if (data && data.skills && data.skills[skill]) {
                skills.push('<img src="/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
            }
        });
        return skills.join(' ');
    }
    function countryCellRenderer(params) {
        var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='../images/flags/" + refData_1.default.COUNTRY_CODES[params.value] + ".png'>";
        return flag + " " + params.value;
    }
    function createRandomPhoneNumber() {
        var result = '+';
        for (var i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += ' ';
            }
        }
        return result;
    }
    function percentCellRenderer(params) {
        var value = params.value;
        var eDivPercentBar = document.createElement('div');
        eDivPercentBar.className = 'div-percent-bar';
        eDivPercentBar.style.width = value + '%';
        if (value < 20) {
            eDivPercentBar.style.backgroundColor = 'red';
        }
        else if (value < 60) {
            eDivPercentBar.style.backgroundColor = '#ff9900';
        }
        else {
            eDivPercentBar.style.backgroundColor = '#00A000';
        }
        var eValue = document.createElement('div');
        eValue.className = 'div-percent-value';
        eValue.innerHTML = value + '%';
        var eOuterDiv = document.createElement('div');
        eOuterDiv.className = 'div-outer-div';
        eOuterDiv.appendChild(eValue);
        eOuterDiv.appendChild(eDivPercentBar);
        return eOuterDiv;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (proficiencyFilter_1_1) {
                proficiencyFilter_1 = proficiencyFilter_1_1;
            },
            function (skillFilter_1_1) {
                skillFilter_1 = skillFilter_1_1;
            },
            function (refData_1_1) {
                refData_1 = refData_1_1;
            }],
        execute: function() {
            let AppComponent = class {
                constructor() {
                    // we pass an empty gridOptions in, so we can grab the api out
                    this.gridOptions = {};
                    this.createRowData();
                    this.createColumnDefs();
                    this.showGrid = true;
                }
                createRowData() {
                    var rowData = [];
                    for (var i = 0; i < 10000; i++) {
                        var countryData = refData_1.default.countries[i % refData_1.default.countries.length];
                        rowData.push({
                            name: refData_1.default.firstNames[i % refData_1.default.firstNames.length] + ' ' + refData_1.default.lastNames[i % refData_1.default.lastNames.length],
                            skills: {
                                android: Math.random() < 0.4,
                                html5: Math.random() < 0.4,
                                mac: Math.random() < 0.4,
                                windows: Math.random() < 0.4,
                                css: Math.random() < 0.4
                            },
                            address: refData_1.default.addresses[i % refData_1.default.addresses.length],
                            years: Math.round(Math.random() * 100),
                            proficiency: Math.round(Math.random() * 100),
                            country: countryData.country,
                            continent: countryData.continent,
                            language: countryData.language,
                            mobile: createRandomPhoneNumber(),
                            landline: createRandomPhoneNumber()
                        });
                    }
                    this.rowData = rowData;
                }
                createColumnDefs() {
                    this.columnDefs = [
                        {
                            headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                            suppressMenu: true, pinned: true
                        },
                        {
                            headerName: 'Employee',
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
                            headerName: 'IT Skills',
                            children: [
                                { headerName: "Skills", width: 125, suppressSorting: true, cellRenderer: skillsCellRenderer, filter: skillFilter_1.default },
                                { headerName: "Proficiency", field: "proficiency", width: 120, cellRenderer: percentCellRenderer, filter: proficiencyFilter_1.default },
                            ]
                        },
                        {
                            headerName: 'Contact',
                            children: [
                                { headerName: "Mobile", field: "mobile", width: 150, filter: 'text' },
                                { headerName: "Land-line", field: "landline", width: 150, filter: 'text' },
                                { headerName: "Address", field: "address", width: 500, filter: 'text' }
                            ]
                        }
                    ];
                }
                calculateRowCount() {
                    if (this.gridOptions.api && this.rowData) {
                        var model = this.gridOptions.api.getModel();
                        var totalRows = this.rowData.length;
                        var processedRows = model.getVirtualRowCount();
                        this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
                    }
                }
                onModelUpdated() {
                    console.log('onModelUpdated');
                    this.calculateRowCount();
                }
                onReady() {
                    console.log('onReady');
                    this.calculateRowCount();
                }
                onCellClicked($event) {
                    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
                }
                onCellValueChanged($event) {
                    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
                }
                onCellDoubleClicked($event) {
                    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
                }
                onCellContextMenu($event) {
                    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
                }
                onCellFocused($event) {
                    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
                }
                onRowSelected($event) {
                    console.log('onRowSelected: ' + $event.node.data.name);
                }
                onSelectionChanged() {
                    console.log('selectionChanged');
                }
                onBeforeFilterChanged() {
                    console.log('beforeFilterChanged');
                }
                onAfterFilterChanged() {
                    console.log('afterFilterChanged');
                }
                onFilterModified() {
                    console.log('onFilterModified');
                }
                onBeforeSortChanged() {
                    console.log('onBeforeSortChanged');
                }
                onAfterSortChanged() {
                    console.log('onAfterSortChanged');
                }
                onVirtualRowRemoved($event) {
                    // because this event gets fired LOTS of times, we don't print it to the
                    // console. if you want to see it, just uncomment out this line
                    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
                }
                onRowClicked($event) {
                    console.log('onRowClicked: ' + $event.node.data.name);
                }
                onQuickFilterChanged($event) {
                    this.gridOptions.api.setQuickFilter($event.target.value);
                }
                // here we use one generic event to handle all the column type events.
                // the method just prints the event name
                onColumnEvent($event) {
                    console.log('onColumnEvent: ' + $event);
                }
            };
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'employee-app',
                    viewBindings: [http_1.HTTP_BINDINGS]
                }),
                core_1.View({
                    directives: [main_1.AgGridNg2],
                    template: `
<div style="width: 800px;">

    <div style="padding: 4px;">
        <div style="float: right;">
            <input (keyup)="onQuickFilterChanged($event)" type="text" id="quickFilterInput" placeholder="Type text to filter..."/>
            <button [disabled]="!showGrid" (click)="showGrid=false">Destroy Grid</button>
            <button [disabled]="showGrid" (click)="showGrid=true">Create Grid</button>
        </div>
        <div>
            <b>Employees Skills and Contact Details</b>
            {{rowCount}}
        </div>
    </div>
    <div style="clear: both;"></div>

    <div *ngIf="showGrid">

        <!-- Because we are using the Angular ID (ie #ag-grid marker), we have to have all the items that use
             that marker inside the same ng-if as the grid -->

        <div style="padding: 4px;" class="toolbar">
            <span>
                Grid API:
                <button (click)="agGrid.api.selectAll()">Select All</button>
                <button (click)="agGrid.api.deselectAll()">Clear Selection</button>
            </span>
            <span style="margin-left: 20px;">
                Column API:
                <button (click)="agGrid.columnApi.setColumnVisible('country', false)">Hide Country Column</button>
                <button (click)="agGrid.columnApi.setColumnVisible('country', true)">Show Country Column</button>
            </span>
        </div>
        <div style="clear: both;"></div>
        <div style="padding: 4px;" class="toolbar">
            <label>
                <input type="checkbox" (change)="showToolPanel=$event.target.checked"/>
                Show Tool Panel
            </label>
            <button (click)="createRowData()">Refresh Data</button>
        </div>
        <div style="clear: both;"></div>

        <ag-grid-ng2 #agGrid style="width: 100%; height: 350px;" class="ag-fresh"

                     [gridOptions]="gridOptions"
                     [columnDefs]="columnDefs"
                     [showToolPanel]="showToolPanel"
                     [rowData]="rowData"

                     enableColResize
                     enableSorting
                     enableFilter
                     groupHeaders
                     suppressRowClickSelection
                     toolPanelSuppressGroups
                     toolPanelSuppressValues
                     debug
                     rowHeight="22"
                     rowSelection="multiple"

                     (modelUpdated)="onModelUpdated()"
                     (cellClicked)="onCellClicked($event)"
                     (cellDoubleClicked)="onCellDoubleClicked($event)"
                     (cellContextMenu)="onCellContextMenu($event)"
                     (cellValueChanged)="onCellValueChanged($event)"
                     (cellFocused)="onCellFocused($event)"
                     (rowSelected)="onRowSelected($event)"
                     (selectionChanged)="onSelectionChanged()"
                     (beforeFilterChanged)="onBeforeFilterChanged()"
                     (afterFilterChanged)="onAfterFilterChanged()"
                     (filterModified)="onFilterModified()"
                     (beforeSortChanged)="onBeforeSortChanged()"
                     (afterSortChanged)="onAfterSortChanged()"
                     (virtualRowRemoved)="onVirtualRowRemoved($event)"
                     (rowClicked)="onRowClicked($event)"
                     (ready)="onReady($event)"

                     (columnEverythingChanged)="onColumnEvent($event)"
                     (columnRowGroupChanged)="onColumnEvent($event)"
                     (columnValueChanged)="onColumnEvent($event)"
                     (columnMoved)="onColumnEvent($event)"
                     (columnVisible)="onColumnEvent($event)"
                     (columnGroupOpened)="onColumnEvent($event)"
                     (columnResized)="onColumnEvent($event)"
                     (columnPinnedCountChanged)="onColumnEvent($event)">
        </ag-grid-ng2>
    </div>

</div>
    `
                }), 
                __metadata('design:paramtypes', [])
            ], AppComponent);
            AppComponent = AppComponent;
            browser_1.bootstrap(AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map