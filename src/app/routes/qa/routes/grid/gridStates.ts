export const gridState1 = {
  columnDefs: [
    { field: 'name', headerName: 'Name', colId: 'name' },
    { field: 'username', headerName: 'Username', colId: 'username' },
    { field: 'phone', headerName: 'Phone', colId: 'phone' },
    { field: 'email', headerName: 'Email', colId: 'email' },
    { field: 'website', headerName: 'Website', colId: 'website' },
  ],
  columnsState: [
    { colId: 'name', hide: false, aggFunc: null, width: 262, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'username', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: 0 },
    { colId: 'phone', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'email', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'website', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
  ],
  groupsColumns: [],
  groupsRows: { Karianne: true, 'Elwyn.Skiles': true },
  sorts: [{ colId: 'name', sort: 'asc' }],
  filters: {},
};

export const gridState2 = {
  columnDefs: [
    { field: 'email', headerName: 'Email', colId: 'email' },
    { field: 'name', headerName: 'Name', colId: 'name' },
    { field: 'username', headerName: 'Username', colId: 'username' },
    { field: 'phone', headerName: 'Phone', colId: 'phone' },
    { field: 'website', headerName: 'Website', colId: 'website' },
  ],
  columnsState: [
    { colId: 'email', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'name', hide: false, aggFunc: null, width: 262, pivotIndex: null, pinned: null, rowGroupIndex: 0 },
    { colId: 'username', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'phone', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'website', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
  ],
  groupsColumns: [],
  groupsRows: {
    'Leanne Graham': true,
    'Ervin Howell': true,
    'Clementine Bauch': true,
    'Mrs. Dennis Schulist': true,
    'Nicholas Runolfsdottir V': true,
    'Glenna Reichert': true,
    'Clementina DuBuque': true,
  },
  sorts: [{ colId: 'website', sort: 'asc' }],
  filters: {
    email: {
      values: ['Karley_Dach@jasper.info', 'Chaim_McDermott@dana.io', 'Nathan@yesenia.net', 'Shanna@melissa.tv', 'Sincere@april.biz'],
      filterType: 'set',
    },
  },
};

export const gridState3 = {
  columnDefs: [
    { field: 'email', headerName: 'Email', colId: 'email' },
    { field: 'name', headerName: 'Name', colId: 'name' },
    { field: 'username', headerName: 'Username', colId: 'username' },
    { field: 'phone', headerName: 'Phone', colId: 'phone' },
    { field: 'website', headerName: 'Website', colId: 'website' },
  ],
  columnsState: [
    { colId: 'email', hide: false, aggFunc: null, width: 262, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'name', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'username', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'phone', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
    { colId: 'website', hide: false, aggFunc: null, width: 260, pivotIndex: null, pinned: null, rowGroupIndex: null },
  ],
  groupsColumns: [],
  groupsRows: {},
  sorts: [{ colId: 'name', sort: 'asc' }],
  filters: {
    username: {
      values: ['Antonette', 'Bret', 'Delphine', 'Kamren', 'Karianne', 'Leopoldo_Corkery', 'Maxime_Nienow', 'Moriah.Stanton'],
      filterType: 'set',
    },
  },
};
