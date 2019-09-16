import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { SpinnerModule } from 'primeng/spinner';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SiteModule } from '$site';

const components = [FormFieldComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
    InputMaskModule,
    SpinnerModule,
    ColorPickerModule,
    InputSwitchModule,
    SelectButtonModule,
    AutoCompleteModule,
    SiteModule,
  ],
  exports: [components],
})
export class NtsFormsModule {}
