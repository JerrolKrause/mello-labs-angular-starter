import { GridApi } from 'ag-grid-community';

/**
 * Reselect rows. Row selection is cleared after new data is passed in and this method will keep them selected
 * @param rowsToSelect
 * @param gridApi
 */
export const rowsReselect = (
  rowUniqueId: string,
  rowsToSelect: any[],
  gridApi: GridApi,
) => {
  if (!rowUniqueId) {
    console.error('rowUniqueId prop is required to use row reselecting');
  }
  if (rowsToSelect && rowsToSelect.length) {
    setTimeout(() => {
      const rowSelectedDictionary: Record<string, boolean> = {};
      rowsToSelect.forEach(
        row => (rowSelectedDictionary[row[rowUniqueId]] = true),
      );
      gridApi.forEachNode(node => {
        const key = node.data[rowUniqueId];
        // Model.entry prop is KEY
        if (rowSelectedDictionary[key]) {
          node.setSelected(true); // Set this row to select
        }
      });
    });
  }
};
