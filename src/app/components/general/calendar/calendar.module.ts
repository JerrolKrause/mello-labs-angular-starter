import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, FullCalendarModule],
  exports: [CalendarComponent],
})
export class NtsCalendarModule {}
