import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    data: { title: 'Home' },
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
