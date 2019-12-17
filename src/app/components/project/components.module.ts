import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorModule } from 'src/app/vendor.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Global modals
import { LogoutModalComponent } from './modals/logout/logout-modal.component';
import { FeedbackModalComponent } from './modals/feedback/feedback.component';

// Layout
import { FooterComponent } from './masterpage/footer/footer.component';
import { HeaderComponent } from './masterpage/header/header.component';
import { LayoutMainComponent } from './masterpage/main/layout-main.component';
import { LayoutSingleComponent } from './masterpage/single/layout-single.component';
import { NavComponent } from './masterpage/nav/nav.component';
import { NavSearchComponent } from './masterpage/nav/search/nav-search.component';



// Modals include
const APP_MODALS = [LogoutModalComponent, FeedbackModalComponent];

// Components to include
export const APP_COMPONENTS = [
  ...APP_MODALS,
  FooterComponent,
  HeaderComponent,
  LayoutMainComponent,
  LayoutSingleComponent,
  NavComponent,
  NavSearchComponent,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Shared
    SharedModule,
    // Vendors
    VendorModule,
  ],
  providers: [],
  declarations: [APP_COMPONENTS],
  exports: [APP_COMPONENTS],
  entryComponents: [APP_MODALS],
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [],
    };
  }
}
