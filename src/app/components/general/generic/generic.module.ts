import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtsCounterComponent } from './components/counter/counter.component';

const components = [NtsCounterComponent];

/**
 * A collection of small generic components
 */
@NgModule({
  declarations: [components],
  imports: [CommonModule],
  exports: [components],
})
export class NtsGenericModule {}
