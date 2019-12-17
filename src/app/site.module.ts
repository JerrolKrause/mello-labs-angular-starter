import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorModule } from './vendor.module';

import { ComponentsModule } from './components/project/components.module';
import { SharedModule } from './shared/shared.module';
import { NtsStateManagementModule } from './components/general';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Vendor components
    VendorModule.forRoot(),
    // Global components
    ComponentsModule,
    // Global shared
    SharedModule,
    NtsStateManagementModule,
  ],
  declarations: [],
  exports: [
    VendorModule,
    SharedModule,
    ComponentsModule,
    NtsStateManagementModule,
  ],
})
export class SiteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SiteModule,
      providers: [],
    };
  }
}
