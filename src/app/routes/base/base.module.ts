import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules

// Routing
import { routing } from './routes';

// Components
import { BaseComponent } from './base.component';

@NgModule({
  imports: [CommonModule, SiteModule, routing],
  declarations: [BaseComponent],
  providers: [],
  exports: [],
  entryComponents: [],
})
export class BaseModule { }
