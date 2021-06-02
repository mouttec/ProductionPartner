import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarWeekViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent, DAYS_OF_WEEK } from 'angular-calendar';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { CustomDateFormatter } from 'src/app/calendar-mouttec/custom-date-formatter.provider';

interface Calendar {
  idBooking: number;
  title: string;
  start: string;
  end: string;
}

const grey: any = {
  one: {
    primary: '#a6a6a6',
    secondary: '#7a7a7a',
  }
}

registerLocaleData(localeFr);

@Component({
  selector: 'app-calendar-mouttec',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar-mouttec.component.html',
  styleUrls: ['./calendar-mouttec.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})

export class CalendarMouttecComponent implements OnInit {

  view: CalendarView = CalendarView.Week;
  excludeDays: number[] = [0, 6];
  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent[]>;

  activeDayIsOpen: boolean = false;

  locale: string = 'fr';
  changeDay(date: Date): void {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.events$ = this.http.get<Calendar[]>('http://localhost:8888/MoutteCAPI/backend/api/booking/prepareCalendar.php').pipe(
      map(res => {
        return res.map(event => {
          return {
            title: '',
            start: new Date(event.start),
            end: new Date(event.end),
            color: grey.one
          };
        });
      })
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (
            segment.date.getHours() >= 12 && segment.date.getMinutes() ===  30 &&
            segment.date.getHours() <= 13
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender2(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 13
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender3(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() >= 18 && segment.date.getMinutes() === 30 &&
          segment.date.getHours() <= 20
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender4(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 19
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender5(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 20
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

}
