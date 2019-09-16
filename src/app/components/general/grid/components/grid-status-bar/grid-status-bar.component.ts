import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ColumnApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
const cloneDeep = require('lodash/cloneDeep');

@Component({
  selector: 'app-grid-status-bar',
  templateUrl: './grid-status-bar.component.html',
  styleUrls: ['./grid-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStatusBarComponent implements OnInit {
  public gridState: GridState = {
    columnDefs: [],
    sorts: [],
    groupsColumns: [],
    groupsRows: {},
    columnsState: [],
    filters: {},
  };
  public gridFilters: any[] = [];
  public gridGroups: any[] = [];

  private grid!: AgGridAngular;
  private gridColumnApi!: ColumnApi;
  private params: any;
  /** Disable updates while resetting */
  private resetting = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.grid = this.params;
    this.gridColumnApi = this.params.columnApi;
  }

  /**
   * When the grid state is changed. This is passed from the parent component
   * @param gridState
   */
  public gridStateChange(gridState: GridState) {
    // Don't update if resetting
    if (!this.resetting) {
      // Local reference to grid state
      this.gridState = cloneDeep(gridState);

      // Get grid filters
      if (this.gridState && this.gridState.filters) {
        const filterTermsMax = 3;
        this.gridFilters = Object.keys(this.gridState.filters).map(key => {
          const filterTerms: any = { ...this.gridState.filters[key] };
          // Cap terms to 3 since the 'set' parameter will have most of the terms
          if (filterTerms.values.length > filterTermsMax) {
            const length = filterTerms.values.length; // Get original length
            filterTerms.values.length = 3;
            filterTerms.values.push(`and ${length - filterTermsMax} more...`);
          }
          return {
            ...filterTerms,
            field: key,
          };
        });
      }

      // Get the active groups
      if (this.gridState && this.gridState.columnsState) {
        this.gridGroups = this.gridState.columnsState.filter(
          (column: any) => column.rowGroupIndex !== null,
        );
      }

      this.ref.detectChanges();
    }
  }

  /**
   * Attach AG grid parameters
   * @param params
   */
  public agInit(params: any): void {
    this.params = params;
  }

  /** Reset all sorts/filters/groups. Reference is passed by grid.component.ts */
  public reset() {}

  /** Remove sorting */
  public removeSort() {
    this.grid.api.setSortModel(null);
  }

  /**
   * Remove specified group
   * @param colId - colID of group to remove
   */
  public removeGroup(colId: string) {
    if (this.gridState && this.gridState.columnsState) {
      // Loop through columns and set rowGroupIndex to null for the matched group
      this.gridState.columnsState.forEach(col => {
        if (col.colId === colId) {
          col.rowGroupIndex = null;
        }
      });
      // Update Api
      this.gridColumnApi.setColumnState(this.gridState.columnsState);
    }
  }

  /**
   * Remove specified filter
   * @param field - field of filter to remove
   */
  public removeFilter(field: string) {
    if (this.gridState && this.gridState.filters) {
      delete this.gridState.filters[field];
      this.grid.api.setFilterModel(this.gridState.filters);
    }
  }
}
