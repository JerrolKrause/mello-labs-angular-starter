import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[grid-cell-template]' })
export class GridColumnCellDirective {
  constructor(public template: TemplateRef<any>) {}
}
