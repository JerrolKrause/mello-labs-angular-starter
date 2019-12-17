import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '$site'; // Site modules
import { QaComponent } from './qa.component';
import { routing } from './qa.routes';
import { ChartsComponent } from './routes/charts/charts.component';
import { MapComponent } from './routes/map/map.component';
import { DemoModalComponent } from './components/modal/demo-modal/demo-modal.component';
import { TablesComponent } from './routes/tables/tables.component';
import { GridComponent } from './routes/grid/grid.component';
import { FormsComponent } from './routes/forms/forms.component';
import { CalendarComponent } from './routes/calendar/calendar.component';
import { NtsChartModule, MapModule, NtsGenericModule, NtsGridModule, NtsFormsModule, NtsCalendarModule, NtsTableModule } from 'src/app/components/general';

@NgModule({
  imports: [CommonModule, SiteModule, routing, NtsChartModule, MapModule, NtsGenericModule, NtsGridModule, NtsFormsModule, NtsCalendarModule, NtsTableModule],
  declarations: [
    QaComponent,
    ChartsComponent,
    MapComponent,
    DemoModalComponent,
    TablesComponent,
    GridComponent,
    FormsComponent,
    FormsComponent,
    CalendarComponent,
  ],
  entryComponents: [DemoModalComponent],
})
export class QaModule {}
