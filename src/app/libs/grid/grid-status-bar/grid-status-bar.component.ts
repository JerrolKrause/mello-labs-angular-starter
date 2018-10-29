import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ColumnApi } from 'ag-grid-community';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-status-bar',
  templateUrl: './grid-status-bar.component.html',
  styleUrls: ['./grid-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridStatusBarComponent implements OnInit {
  public gridState: GridState = {};
  public gridFilters: any[] = [];
  public gridGroups: any[] = [];

  private grid: AgGridNg2;
  private gridColumnApi: ColumnApi;
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
      this.gridState = gridState;

      // Get the dictionary of filters and turn into array
      this.gridFilters = [];
      for (let key in this.gridState.filters) {
        this.gridFilters.push({
          ...this.gridState.filters[key],
          field: key,
        });
      }

      // Get the active groups
      this.gridGroups = this.gridState.columns.filter((column: any) => column.rowGroupIndex !== null);

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
    // Loop through columns and set rowGroupIndex to null for the matched group
    this.gridState.columns.forEach(col => {
      if (col.colId === colId) {
        col.rowGroupIndex = null;
      }
    });
    // Update Api
    this.gridColumnApi.setColumnState(this.gridState.columns);
  }

  /**
   * Remove specified filter
   * @param field - field of filter to remove
   */
  public removeFilter(field: string) {
    delete this.gridState.filters[field];
    this.grid.api.setFilterModel(this.gridState.filters);
  }
}
