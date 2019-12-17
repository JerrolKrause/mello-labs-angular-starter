import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapPipe } from './map.pipe';

@NgModule({
  declarations: [MapPipe],
  imports: [CommonModule],
  exports: [MapPipe],
  providers: [],
})
export class MapPipeModule {}
