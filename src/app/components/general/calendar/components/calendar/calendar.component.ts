import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FullCalendar } from 'primeng/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

/**
 * An Outlook style calendar based on @fullCalendar
 */
@Component({
  selector: 'nts-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [
    '../../../../../../../node_modules/@fullcalendar/core/main.css',
    '../../../../../../../node_modules/@fullcalendar/daygrid/main.css',
    './calendar.component.scss',
  ],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @Input() events = [
    { title: 'Call Suzi', date: '2019-08-01' },
    { title: 'Send Docs Out', date: '2019-08-02' },
    { title: 'Do stuff', date: '2019-08-02' },
  ];
  @Input() selectable = false;

  public calendarPlugins = [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    resourceTimelinePlugin,
  ];

  @ViewChild('fc', { static: true }) fc!: FullCalendar;

  constructor() {}

  ngOnInit() {
    console.log(this.fc);
  }

  public dateClick(date: any) {
    console.log(date);
  }
  public eventClick(event: any) {
    console.log(event);
  }

  public select(select: any) {
    console.log(select);
  }
}
