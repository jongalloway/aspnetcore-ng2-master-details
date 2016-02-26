/**
 * ag-grid - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v3.3.3
 * @link http://www.ag-grid.com/
 * @license MIT
 */
var events_1 = require("../events");
var utils_1 = require("../utils");
var ComponentUtil = (function () {
    function ComponentUtil() {
    }
    ComponentUtil.getEventCallbacks = function () {
        if (!ComponentUtil.EVENT_CALLBACKS) {
            ComponentUtil.EVENT_CALLBACKS = [];
            ComponentUtil.EVENTS.forEach(function (eventName) {
                ComponentUtil.EVENT_CALLBACKS.push(ComponentUtil.getCallbackForEvent(eventName));
            });
        }
        return ComponentUtil.EVENT_CALLBACKS;
    };
    ComponentUtil.copyAttributesToGridOptions = function (gridOptions, component) {
        checkForDeprecated(component);
        // create empty grid options if none were passed
        if (typeof gridOptions !== 'object') {
            gridOptions = {};
        }
        // to allow array style lookup in TypeScript, take type away from 'this' and 'gridOptions'
        var pGridOptions = gridOptions;
        // add in all the simple properties
        ComponentUtil.ARRAY_PROPERTIES
            .concat(ComponentUtil.STRING_PROPERTIES)
            .concat(ComponentUtil.OBJECT_PROPERTIES)
            .concat(ComponentUtil.FUNCTION_PROPERTIES)
            .forEach(function (key) {
            if (typeof (component)[key] !== 'undefined') {
                pGridOptions[key] = component[key];
            }
        });
        ComponentUtil.BOOLEAN_PROPERTIES.forEach(function (key) {
            if (typeof (component)[key] !== 'undefined') {
                pGridOptions[key] = ComponentUtil.toBoolean(component[key]);
            }
        });
        ComponentUtil.NUMBER_PROPERTIES.forEach(function (key) {
            if (typeof (component)[key] !== 'undefined') {
                pGridOptions[key] = ComponentUtil.toNumber(component[key]);
            }
        });
        ComponentUtil.getEventCallbacks().forEach(function (funcName) {
            if (typeof (component)[funcName] !== 'undefined') {
                pGridOptions[funcName] = component[funcName];
            }
        });
        return gridOptions;
    };
    ComponentUtil.getCallbackForEvent = function (eventName) {
        if (!eventName || eventName.length < 2) {
            return eventName;
        }
        else {
            return 'on' + eventName[0].toUpperCase() + eventName.substr(1);
        }
    };
    // change this method, the caller should know if it's initialised or not, plus 'initialised'
    // is not relevant for all component types.
    // maybe pass in the api and columnApi instead???
    ComponentUtil.processOnChange = function (changes, gridOptions, api) {
        //if (!component._initialised || !changes) { return; }
        if (!changes) {
            return;
        }
        checkForDeprecated(changes);
        // to allow array style lookup in TypeScript, take type away from 'this' and 'gridOptions'
        var pGridOptions = gridOptions;
        // check if any change for the simple types, and if so, then just copy in the new value
        ComponentUtil.ARRAY_PROPERTIES
            .concat(ComponentUtil.OBJECT_PROPERTIES)
            .concat(ComponentUtil.STRING_PROPERTIES)
            .forEach(function (key) {
            if (changes[key]) {
                pGridOptions[key] = changes[key].currentValue;
            }
        });
        ComponentUtil.BOOLEAN_PROPERTIES.forEach(function (key) {
            if (changes[key]) {
                pGridOptions[key] = ComponentUtil.toBoolean(changes[key].currentValue);
            }
        });
        ComponentUtil.NUMBER_PROPERTIES.forEach(function (key) {
            if (changes[key]) {
                pGridOptions[key] = ComponentUtil.toNumber(changes[key].currentValue);
            }
        });
        ComponentUtil.getEventCallbacks().forEach(function (funcName) {
            if (changes[funcName]) {
                pGridOptions[funcName] = changes[funcName].currentValue;
            }
        });
        if (changes.showToolPanel) {
            api.showToolPanel(changes.showToolPanel.currentValue);
        }
        if (changes.quickFilterText) {
            api.setQuickFilter(changes.quickFilterText.currentValue);
        }
        if (changes.rowData) {
            api.setRowData(changes.rowData.currentValue);
        }
        if (changes.floatingTopRowData) {
            api.setFloatingTopRowData(changes.floatingTopRowData.currentValue);
        }
        if (changes.floatingBottomRowData) {
            api.setFloatingBottomRowData(changes.floatingBottomRowData.currentValue);
        }
        if (changes.columnDefs) {
            api.setColumnDefs(changes.columnDefs.currentValue);
        }
        if (changes.datasource) {
            api.setDatasource(changes.datasource.currentValue);
        }
        if (changes.headerHeight) {
            api.setHeaderHeight(changes.headerHeight.currentValue);
        }
    };
    ComponentUtil.toBoolean = function (value) {
        if (typeof value === 'boolean') {
            return value;
        }
        else if (typeof value === 'string') {
            // for boolean, compare to empty String to allow attributes appearing with
            // not value to be treated as 'true'
            return value.toUpperCase() === 'TRUE' || value == '';
        }
        else {
            return false;
        }
    };
    ComponentUtil.toNumber = function (value) {
        if (typeof value === 'number') {
            return value;
        }
        else if (typeof value === 'string') {
            return Number(value);
        }
        else {
            return undefined;
        }
    };
    // all the events are populated in here AFTER this class (at the bottom of the file).
    ComponentUtil.EVENTS = [];
    ComponentUtil.STRING_PROPERTIES = [
        'sortingOrder', 'rowClass', 'rowSelection', 'overlayLoadingTemplate',
        'overlayNoRowsTemplate', 'headerCellTemplate', 'quickFilterText'];
    ComponentUtil.OBJECT_PROPERTIES = [
        'rowStyle', 'context', 'groupColumnDef', 'localeText', 'icons', 'datasource'
    ];
    ComponentUtil.ARRAY_PROPERTIES = [
        'slaveGrids', 'rowData', 'floatingTopRowData', 'floatingBottomRowData', 'columnDefs'
    ];
    ComponentUtil.NUMBER_PROPERTIES = [
        'rowHeight', 'rowBuffer', 'colWidth', 'headerHeight', 'groupDefaultExpanded',
        'minColWidth', 'maxColWidth'
    ];
    ComponentUtil.BOOLEAN_PROPERTIES = [
        'virtualPaging', 'toolPanelSuppressGroups', 'toolPanelSuppressValues', 'rowsAlreadyGrouped',
        'suppressRowClickSelection', 'suppressCellSelection', 'suppressHorizontalScroll', 'debug',
        'enableColResize', 'enableCellExpressions', 'enableSorting', 'enableServerSideSorting',
        'enableFilter', 'enableServerSideFilter', 'angularCompileRows', 'angularCompileFilters',
        'angularCompileHeaders', 'groupSuppressAutoColumn', 'groupSelectsChildren', 'groupHideGroupColumns',
        'groupIncludeFooter', 'groupUseEntireRow', 'groupSuppressRow', 'groupSuppressBlankHeader', 'forPrint',
        'suppressMenuHide', 'rowDeselection', 'unSortIcon', 'suppressMultiSort', 'suppressScrollLag',
        'singleClickEdit', 'suppressLoadingOverlay', 'suppressNoRowsOverlay', 'suppressAutoSize',
        'suppressParentsInRowNodes', 'showToolPanel', 'suppressMovingCss', 'suppressMovableColumns'
    ];
    ComponentUtil.FUNCTION_PROPERTIES = ['headerCellRenderer', 'localeTextFunc', 'groupRowInnerRenderer',
        'groupRowRenderer', 'groupAggFunction', 'isScrollLag', 'isExternalFilterPresent',
        'doesExternalFilterPass', 'getRowClass', 'getRowStyle', 'getHeaderCellTemplate'];
    ComponentUtil.ALL_PROPERTIES = ComponentUtil.ARRAY_PROPERTIES
        .concat(ComponentUtil.OBJECT_PROPERTIES)
        .concat(ComponentUtil.STRING_PROPERTIES)
        .concat(ComponentUtil.NUMBER_PROPERTIES)
        .concat(ComponentUtil.FUNCTION_PROPERTIES)
        .concat(ComponentUtil.BOOLEAN_PROPERTIES);
    return ComponentUtil;
})();
exports.ComponentUtil = ComponentUtil;
utils_1.default.iterateObject(events_1.Events, function (key, value) {
    ComponentUtil.EVENTS.push(value);
});
function checkForDeprecated(changes) {
    if (changes.ready || changes.onReady) {
        console.warn('ag-grid: as of v3.3 ready event is now called gridReady, so the callback should be onGridReady');
    }
}
