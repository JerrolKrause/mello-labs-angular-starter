import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FullCalendar } from 'primeng/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import listPlugin from '@fullcalendar/list';
import { BehaviorSubject } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() defaultView: NtsCalendar.DefaultView = 'dayGridMonth';

  @Input() events: NtsCalendar.Event[] = [];
  @Input() selectable = false;
  @Input() height: number | undefined;
  /** https://fullcalendar.io/docs/header */
  @Input() header: any | undefined;

  public calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin, listPlugin];
  public visible$ = new BehaviorSubject(true);

  @ViewChild('fc', { static: true }) fc!: FullCalendar;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(model: SimpleChanges) {
    if (model.defaultView) {
      this.changeViewType();
    }
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

  /**
   * Change the type of view full calendar is displaying
   * Full calendar does not support this natively so reinstantiating the component is necessary
   */
  public changeViewType() {
    this.visible$.next(false);
    setTimeout(() => this.visible$.next(true));
  }
}
