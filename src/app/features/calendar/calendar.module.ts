import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { SiteModule } from '$site';

import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, SiteModule, FullCalendarModule],
  exports: [CalendarComponent],
})
export class NtsCalendarModule {}
