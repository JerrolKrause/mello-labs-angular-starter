import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { GridColumnDirective } from './directives/column.directive';
import { GridColumnHeaderDirective } from './directives/cell-header.directive';
import { GridColumnCellDirective } from './directives/cell-body.directive';

import { TextCasePipe } from './pipes/text-case.pipe';

import { GridTemplateRendererComponent } from './components/grid-template-renderer/grid-template-renderer.component';
import { GridStatusBarComponent } from './components/grid-status-bar/grid-status-bar.component';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([GridTemplateRendererComponent]),
  ],
  providers: [],
  declarations: [
    GridTemplateRendererComponent,
    GridStatusBarComponent,
    TextCasePipe,
    GridComponent,
    GridColumnDirective,
    GridColumnHeaderDirective,
    GridColumnCellDirective,
  ],
  exports: [
    AgGridModule,
    GridTemplateRendererComponent,
    GridStatusBarComponent,
    GridComponent,
    GridColumnDirective,
    GridColumnHeaderDirective,
    GridColumnCellDirective,
  ],
  entryComponents: [GridStatusBarComponent],
})
export class NtsGridModule {}
