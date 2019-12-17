declare interface NtsGridState {
  columnDefs: ColDef[];
  columnsState: ColumnState[];
  sorts: { colId: string; sort: string }[];
  groupsColumns: any[];
  groupsRows: Record<string, boolean>;
  filters: {
    [key: string]: {
      filter?: string;
      filterType?: string;
      type?: string;
    };
  };
}
