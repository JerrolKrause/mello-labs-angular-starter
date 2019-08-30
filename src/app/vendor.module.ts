import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, DialogService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { SpinnerModule } from 'primeng/spinner';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AutoCompleteModule} from 'primeng/autocomplete';

const modules = [
  // Prime NG UI Lib
  MenubarModule,
  MenuModule,
  SlideMenuModule,
  ButtonModule,
  SidebarModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  CardModule,
  InputTextModule,
  CheckboxModule,
  RadioButtonModule,
  MessagesModule,
  MessageModule,
  AccordionModule,
  TabViewModule,
  TableModule,
  DropdownModule,
  TooltipModule,
  InputTextareaModule,
  CheckboxModule,
  CalendarModule,
  InputMaskModule,
  SpinnerModule,
  ColorPickerModule,
  InputSwitchModule,
  SelectButtonModule,
  AutoCompleteModule
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...modules,
  ],
  providers: [],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule, // NgbModule,
    ...modules,
  ],
  declarations: [],
})
export class VendorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: VendorModule,
      providers: [ConfirmationService, DialogService],
    };
  }
}
