import { ColDef } from 'ag-grid-community';
import { QueryList } from '@angular/core';
import { GridColumnDirective } from '../directives/column.directive';
import { GridTemplateRendererComponent } from '../components/grid-template-renderer/grid-template-renderer.component';

/**
 * Attach custom cell templates to their columns
 * @param columns
 * @param templates
 */
export const columnsTemplateAttach = (
  columns: ColDef[],
  templates?: QueryList<GridColumnDirective>,
): ColDef[] => {
  if (!templates || !templates.length) {
    return [...columns];
  }

  // Create a dictionary of the templates by field ID
  const templatesDictionary: { [key: string]: GridColumnDirective } = {};
  templates.forEach(
    template => (templatesDictionary[template.field] = template),
  );
  // Loop through the columns, if a template match is found add it to the column
  return columns.map(column => {
    const col = { ...column };
    // If match found, add template
    if (templatesDictionary[<string>column.field]) {
      col.cellRendererFramework = GridTemplateRendererComponent;
      col.cellRendererParams = {
        ngTemplate: templatesDictionary[<string>column.field].templateCell,
      };
    }
    return col;
  });
};
