import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions, ColumnApi } from 'ag-grid-community';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { debounce } from 'helpful-decorators';

import { GridStatusBarComponent } from '../grid-status-bar/grid-status-bar.component';
//import { GridTemplateRendererComponent } from '../grid-template-renderer/grid-template-renderer.component';

const defaultsDeep = require('lodash/defaultsDeep');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  @ViewChild('grid') grid: AgGridNg2;
  @ViewChild('gridContainer') gridContainer: ElementRef;

  /** Hold and set default options for grid*/
  private _gridOptions: GridOptions = {
    context: {
      this: this,
    },
    // A default column definition with properties that get applied to every column
    defaultColDef: {
      width: 150, // Set every column width
      editable: false, // Make every column editable
      enableRowGroup: true, // Make every column groupable
      filter: 'agTextColumnFilter', // Make every column use 'text' filter by default
    },
    statusBar: {
      statusPanels: [{ statusPanel: 'statusBarComponent', align: 'left', key: 'statusBarComponent' }],
    },
  };
  @Input()
  set gridOptions(options: GridOptions) {
    this._gridOptions = defaultsDeep(this._gridOptions, options);
  }
  get gridOptions() {
    return this._gridOptions;
  }

  @Input()
  set gridFilterTerm(term: string) {
    if (this.grid && this.grid.api) {
      this.grid.api.setQuickFilter(term);
    }
  }

  @Input() gridState: GridState;
  @Input() rowData: any[];
  @Input() columns: any[];
  @Input() columnDefs: any[];
  @Input() animateRows: boolean;
  @Input() enableSorting: boolean;
  @Input() enableFilter: boolean;
  @Input() enableColResize: boolean;
  @Input() enableRangeSelection: boolean;
  @Input() rememberGroupStateWhenNewData: any;
  @Input() groupUseEntireRow: boolean;
  @Input() getContextMenuItems: any;
  @Input() frameworkComponents: any;
  @Input() rowGroupPanelShow: any;
  @Input() rowSelection: any;

  @Output() stateChange = new EventEmitter<GridState>();
  @Output() rowsSelected = new EventEmitter<any[]>();

  public gridColumnApi: ColumnApi;
  public gridLoaded: boolean;
  public gridAllowUpdate = true;
  public gridComponents = { statusBarComponent: GridStatusBarComponent };
  public gridStatusComponent: GridStatusBarComponent;

  constructor() {}

  ngOnInit() {
    // On window resize event, fit the grid columns to the screen
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        if (this.gridLoaded && this.gridColumnApi) {
          this.gridFit();
        }
      });
  }

  ngAfterViewInit() {
    //// Attach custom cell templates to the appropriate column
    //const columns = this.columns.map(column => {
    //  if (column.field === 'phone') {
    //    column.cellRendererFramework = this.gridSvc.templateRenderer;
    //    column.cellRendererParams = {
    //      ngTemplate: this.cellTemplatePhone,
    //      // grouping: () => { } // TODO: Custom renderer for group headers
    //    };
    //  }
    //  if (column.field === 'delete') {
    //    column.cellRendererFramework = this.gridSvc.templateRenderer;
    //    column.cellRendererParams = {
    //      ngTemplate: this.cellTemplateDelete,
    //    };
    //  }
    //  return column;
    //});
    //this.grid.api.setColumnDefs(columns);
  }

  /**
   * When the grid is ready and has finished loading
   * @param params
   */
  public gridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    // Set reference to status component so state can be pushed
    this.gridStatusComponent = (<any>this).gridOptions.api
      .getStatusPanel('statusBarComponent')
      .getFrameworkComponentInstance();
    // Attach reset method to status component so the status method
    this.gridStatusComponent.reset = this.gridReset.bind(this);
    // Grid is ready, restore default state if any
    this.gridStateRestore();
  }

  /** After the grid has loaded data */
  public gridFirstDataRendered() {
    this.gridLoaded = true;
    this.gridFit();
  }

  /** Have the columns fill the available space if less than grid width */
  public gridFit() {
    if (this.gridColumnApi && this.gridContainer && this.gridContainer.nativeElement) {
      const widthCurrent = this.gridColumnApi.getColumnState().reduce((a, b) => a + b.width, 0);
      const widthGrid = this.gridContainer.nativeElement.offsetWidth;
      if (widthCurrent < widthGrid && this.gridAllowUpdate && this.gridLoaded) {
        // Disable allow update to prevent loop
        this.gridAllowUpdate = false;
        // Resize columns to fit screen
        this.grid.api.sizeColumnsToFit();
      }
    }
  }

  /** When the grid is resized */
  @debounce(100, {
    leading: false,
    trailing: true,
  })
  public gridSizeChanged() {
    // console.log('Grid Resized')
  }

  /**
   * Get selected rows out of the datagrid
   * @param event
   */
  public gridSelectionChanged() {
    const rows = this.grid.api.getSelectedNodes().map(node => node.data);
    this.rowsSelected.emit(rows);
  }

  /** Reset the grid state */
  public gridReset() {
    this.gridAllowUpdate = false;
    this.grid.api.setSortModel(null);
    this.grid.api.setFilterModel(null);
    this.gridColumnApi.resetColumnState();
    this.getGridState();
    this.gridStatusComponent.gridStateChange(this.gridState);
    this.gridAllowUpdate = true;
    this.gridFit();
  }

  /**
   * On grid state changes such as sorting, filtering and grouping
   * Added debounce since some events fire quickly like resizing
   * @param $event
   */
  @debounce(100, {
    leading: false,
    trailing: true,
  })
  public gridStateChanged($event: any) {
    // console.log('gridStateChanged', $event.type, this.gridAllowUpdate);
    if (this.gridAllowUpdate) {
      this.getGridState();

      if ($event.type === 'columnResized') {
        this.gridFit();
      }

      // Only save state after grid has been fully loaded
      if (this.gridLoaded) {
        // Pass gridstate to status component
        this.gridStatusComponent.gridStateChange(this.gridState);
      }
    }
    this.gridAllowUpdate = true;
  }

  /** Get grid state and emit to parent */
  public getGridState() {
    this.gridState = {
      columns: this.gridColumnApi.getColumnState(),
      sorts: this.grid.api.getSortModel(),
      filters: this.grid.api.getFilterModel(),
    };
    this.stateChange.emit(this.gridState);
  }

  /** Restore the grid state */
  public gridStateRestore() {
    if (this.grid && this.gridColumnApi) {
      if (this.gridState.columns) {
        this.gridColumnApi.setColumnState(this.gridState.columns);
      }
      if (this.gridState.sorts) {
        this.grid.api.setSortModel(this.gridState.sorts);
      }
      if (this.gridState.filters) {
        this.grid.api.setFilterModel(this.gridState.filters);
        this.grid.api.onFilterChanged();
      }
      // If restoring gridstate, update status component
      this.gridStatusComponent.gridStateChange(this.gridState);
    }
  }

  /** When data in the grid changes */
  public gridRowDataChanged() {
    // Whenever data is loaded into the grid the filters are wiped out. Check if filters are present and reload them
    if (this.gridState.filters) {
      this.grid.api.setFilterModel(this.gridState.filters);
      this.grid.api.onFilterChanged();
    }
  }
}
