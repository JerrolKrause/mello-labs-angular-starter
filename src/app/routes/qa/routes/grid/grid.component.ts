import { Component, OnInit } from '@angular/core';
import { cars } from '../tables/cars';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DomainService } from '$domain';
import { gridState1, gridState2, gridState3 } from './gridStates';
import { environment } from '$env';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  public license = environment.licenses.agGrid;
  public users$ = this.domain.users.users$;
  public rows: any[] = cars;
  public columns: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'username', headerName: 'Username' },
    { field: 'website', headerName: 'Website' },
  ];

  public gridFilterTerm: string | null = null;
  public gridOptions: GridOptions = {};
  public gridState: NtsGridState | undefined;

  public stateToggle = {
    gridState1: gridState1,
    gridState2: gridState2,
    gridState3: gridState3,
  };

  constructor(private domain: DomainService) {}

  ngOnInit() {
    this.domain.users.get().subscribe();

    const gridState = window.localStorage.getItem('qaGrid');
    if (gridState) {
      this.gridState = JSON.parse(gridState);
    }
  }

  public gridStateChange(gridState: NtsGridState) {
    // console.warn('gridStateChange', JSON.stringify(gridState));
    window.localStorage.setItem('qaGrid', JSON.stringify(gridState));
  }

  public rowsSelected(_rows: any[]) {
    // console.warn('rowsSelected', rows);
  }

  public selectedRowDataDisplayed(_rows: any[]) {
    // console.warn('selectedRowDataDisplayed', rows);
  }

  public initalLoanSelected() {
    // console.log('Grid Ready');
  }
}
