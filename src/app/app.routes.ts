import { Routes } from '@angular/router';
import { NoContentComponent, LoginComponent } from '$routes'; // HomeComponent,

import { LayoutMainComponent } from '$components';
import { AuthGuard } from '$shared';

export const ROUTES: Routes = [
  // Routes without masterpage or that do not need to be authenticated need to go first
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Please Log In' },
  },

  {
    path: 'qa',
    loadChildren: './routes/qa/qa.module#QaModule',
    data: { title: 'E2E Testing' },
    canActivate: [AuthGuard],
  },

  // Example route param
  // {
  //  path: 'loan/:LNKey',
  //  component: HomeComponent,
  //  data: { title: 'Dashboard'},
  //  canActivate: [AuthGuard],
  // },

  // Routes that use masterpage go here
  // canActivate with AuthGuard determines if this is an authenticated only route
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      // Homepage non-lazy load implementation
      // {
      //  path: '',
      //  component: HomeComponent,
      //  data: { title: 'Dashboard' },
      //  canActivate: [AuthGuard]
      // },

      // Example for lazy loaded module with route params
      // { path: 'users/:empowerGuid', loadChildren: './routes/users/users.module#UsersModule', canActivate: [AuthGuard] },
      // { path: 'users', loadChildren: './routes/users/users.module#UsersModule', canActivate: [AuthGuard] },

      // Empty path string for homepage ('') needs to be LAST otherwise it catches all other routes
      {
        path: 'monolith',
        pathMatch: 'full',
        loadChildren: './routes/monolith/monolith.module#MonolithModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'base',
        pathMatch: 'full',
        loadChildren: './routes/base/base.module#BaseModule',
        canActivate: [AuthGuard],
      },

      // Empty path string for homepage ('') needs to be LAST otherwise it catches all other routes
      { path: '', pathMatch: 'full', loadChildren: './routes/home/home.module#HomeModule', canActivate: [AuthGuard] },

      {
        path: '**',
        component: NoContentComponent,
        data: { title: 'Page Not Found' },
        canActivate: [AuthGuard],
      },
    ],
  },
];
