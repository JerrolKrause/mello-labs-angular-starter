import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtsCounterComponent } from './components/counter/counter.component';
import { SiteModule } from '$site';

const components = [NtsCounterComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, SiteModule],
  exports: [components],
})
export class NtsGenericModule {}
