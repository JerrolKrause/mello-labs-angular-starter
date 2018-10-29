import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions, ColumnApi } from 'ag-grid-community';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { debounce } from 'helpful-decorators';

//import { GridTemplateRendererComponent } from '../grid-template-renderer/grid-template-renderer.component';
import { GridStatusBarComponent } from '../grid-status-bar/grid-status-bar.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {

  @ViewChild('grid') grid: AgGridNg2;
  @ViewChild('gridContainer') gridContainer: ElementRef;

  @Input() gridOptions: GridOptions = {
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
      statusPanels: [{ statusPanel: 'statusBarComponent', align: 'left' }],
    },
  };
  @Input() rowData: any;
  @Input() columns: any;
  @Input() columnDefs: any;
  @Input() animateRows: any;
  @Input() enableSorting: any;
  @Input() enableFilter: any;
  @Input() enableColResize: any;
  @Input() enableRangeSelection: any;
  @Input() rememberGroupStateWhenNewData: any;
  @Input() groupUseEntireRow: any;
  @Input() getContextMenuItems: any;
  @Input() frameworkComponents: any;
  @Input() rowGroupPanelShow: any;
  @Input() rowSelection: any;

  @Input() gridFilterTerm: any;

  public gridState: GridState = {};
  public gridColumnApi: ColumnApi;
  public gridLoaded: boolean;
  public gridAllowUpdate = true;
  public gridComponents = { statusBarComponent: GridStatusBarComponent };
  

  constructor() { }

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

  public gridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    //// Set reference to status component so state can be pushed
    //this.gridStatusComponent = (<any>this).grid.api
    //  .getStatusPanel('statusBarComponent')
    //  .getFrameworkComponentInstance();
    //this.gridStateRestore();
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


  /** When the grid is resized, NEED DEBOUNCE */
  public gridSizeChanged() {
    // console.log('Grid Resized')
  }

  /** Filter global option */
  public gridFilterGlobal() {
    this.grid.api.setQuickFilter(this.gridFilterTerm);
  }

  public doCoolStuff(test: any) {
    console.log(test);
  }

  /**
   * Get selected rows out of the datagrid
   * @param event
   */
  public gridSelectionChanged() {
    //this.gridRowsSelected = this.grid.api.getSelectedNodes().map(node => node.data);
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
      this.gridState = {
        columns: this.gridColumnApi.getColumnState(),
        sorts: this.grid.api.getSortModel(),
        filters: this.grid.api.getFilterModel(),
      };

      if ($event.type === 'columnResized') {
        this.gridFit();
      }

      // Only save state after grid has been fully loaded
      if (this.gridLoaded) {
        // Pass gridstate to status component
        //this.gridStatusComponent.gridStateChange(this.gridState);
      }
    }
    this.gridAllowUpdate = true;
  }

  /** When data in the grid changes */
  public gridRowDataChanged() {
    // Whenever data is loaded into the grid the filters are wiped out. Check if filters are present and reload them
    if (this.gridState.filters) {
      this.grid.api.setFilterModel(this.gridState.filters);
      this.grid.api.onFilterChanged();
    }
  }

  /**
   * Create the context menu
   * @param params
   
  public gridContextMenu(params: any) {
    // console.log(params.value, params.node.data) // Cell value and row object
    return <MenuItemDef[]>[
      'copy',
      'copyWithHeaders',
      'paste',
      'separator',
      {
        name: 'Tags',
        icon: '<i class="fa fa-tags"></i>',
        subMenu: [
          {
            name: 'Red',
            icon: '<i class="fa fa-tag red"></i>',
            action: function () {
              params.context.this.contextAction(params.value, params.node.data);
            },
          },
          {
            name: 'Green',
            icon: '<i class="fa fa-tag green"></i>',
            action: function () {
              params.context.this.contextAction(params.value, params.node.data);
            },
          },
        ],
      },
      'separator',
      'export',
    ];
  }
  */

  /**
   * An action to perform on a context menu click
   * @param params
   */
  public contextAction(value: string, row: any) {
    console.log(value, row);
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
    }
  }

}
