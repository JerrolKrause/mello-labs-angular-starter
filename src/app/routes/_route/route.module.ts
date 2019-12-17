import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules

// Routing
import { routing } from './routes';

// Components
import { RootComponent } from './routes/root/root.component';
import { RouteUiStateService, RouteUiStateStore, RouteUiStateQuery } from '../home/shared/state/ui';

export const storeName = 'route-UIState'; // Change this property to be unique & route specific, IE 'route-UIState' => 'dashboard-UIState'

@NgModule({
  imports: [CommonModule, SiteModule, routing],
  declarations: [RootComponent],
  providers: [
    RouteUiStateService,
    RouteUiStateStore,
    RouteUiStateQuery,
  ],
  exports: [],
  entryComponents: [],
})
export class RouteModule {}
