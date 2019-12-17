declare namespace NtsCalendar {
  export type DefaultView =
    | 'dayGridMonth'
    | 'dayGridWeek'
    | 'timeGridWeek'
    | 'listWeek'
    | 'listDay'
    | 'listWeek'
    | 'listMonth'
    | 'listYear';
  /** https://fullcalendar.io/docs/event-object */
  export interface Event {
    title: string;
    date: Date;
    id?: string;
    groupId?: string;
    allDay?: boolean;
    start?: Date;
    end?: Date;
    url?: string;
    classNames?: string[];
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    resourceEditable?: boolean;
    rendering?: 'background' | 'inverse-background';
    overlap?: any;
    constraint?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    extendedProps?: any;
    source?: any;
  }
  export interface Header {
    /** Space delimited with the following options: title, today, prev, next, prevYear, nextYear, today */
    left: string;
    center: string;
    right: string;
  }
}
