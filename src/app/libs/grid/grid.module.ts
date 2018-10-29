import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '$env';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { GridComponent } from './grid/grid.component';
import { GridTemplateRendererComponent } from './grid-template-renderer/grid-template-renderer.component';
import { GridStatusBarComponent } from './grid-status-bar/grid-status-bar.component';
import { TextCasePipe } from './pipes/text-case.pipe';

// Set license
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(environment.licenses.agGrid);

@NgModule({
  imports: [CommonModule, AgGridModule.withComponents([GridTemplateRendererComponent])],
  providers: [],
  declarations: [GridTemplateRendererComponent, GridStatusBarComponent, TextCasePipe, GridComponent],
  exports: [AgGridModule, GridTemplateRendererComponent, GridStatusBarComponent, GridComponent],
  entryComponents: [GridStatusBarComponent],
})
export class GridModule {}
