import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '$shared';
import { NtsDomainStateComponent } from './components/api-state/api-state.component';
import { NtsErrorComponent } from './components/error/error.component';
import { VendorModule } from 'src/app/vendor.module';
import { EntityToArray } from './pipes/entity-to-array.pipe';

const Components = [NtsDomainStateComponent, NtsErrorComponent, EntityToArray];

@NgModule({
  declarations: [Components],
  imports: [CommonModule, SharedModule, VendorModule],
  exports: [Components],
})
export class NtsStateManagementModule {}
