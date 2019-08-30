import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SiteModule } from '$site';

const components = [FormFieldComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, SiteModule],
  exports: [components],
})
export class NtsFormsModule {}
