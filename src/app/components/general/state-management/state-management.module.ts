import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NtsDomainStateComponent } from './components/api-state/api-state.component';
import { NtsErrorComponent } from './components/error/error.component';
import { EntityToArray } from './pipes/entity-to-array.pipe';
import { AccordionModule } from 'primeng/accordion';

const Components = [NtsDomainStateComponent, NtsErrorComponent, EntityToArray];

/**
 * State management tools intended to work with Akita
 */
@NgModule({
  declarations: [Components],
  imports: [CommonModule, AccordionModule],
  exports: [Components],
})
export class NtsStateManagementModule {}
