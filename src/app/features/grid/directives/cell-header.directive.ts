import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[grid-header-template]' })
export class GridColumnHeaderDirective {
  constructor(public template: TemplateRef<any>) {}
}
