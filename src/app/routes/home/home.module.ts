import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules

// Routing
import { routing } from './routes';

// Components
import { RootComponent } from './routes/root/root.component';

// Route State Management
import { RouteUiStateQuery, RouteUiStateService, RouteUiStateStore } from './shared/state/ui';
import { RouteDomainStateService } from './shared/state/domain';

export const storeName = 'home-UIState'; // Change this property to be unique & route specific, IE 'route-UIState' => 'dashboard-UIState'

@NgModule({
  imports: [CommonModule, SiteModule, routing],
  declarations: [RootComponent],
  providers: [RouteUiStateService, RouteUiStateStore, RouteUiStateQuery, RouteDomainStateService],
  exports: [],
  entryComponents: [],
})
export class HomeModule {}
