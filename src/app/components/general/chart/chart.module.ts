import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { SiteModule } from '$site';

@NgModule({
  imports: [CommonModule, SiteModule],
  declarations: [ChartComponent],
  exports: [ChartComponent],
})
export class ChartModule {}
