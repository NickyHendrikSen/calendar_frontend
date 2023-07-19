import { Component } from '@angular/core';
import { CalendarState } from 'src/app/services/calendar.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule]
})

export class DatePickerComponent {  
  date: Date = new Date();

  constructor(private readonly calendarState: CalendarState) {
    this.calendarState.datePicked$.subscribe((date$) => {
      this.date = date$;
    });
    
    // this.date$ = this.calendarState.datePicked$;
  }

  onSelectDate(event: Date) {
    this.calendarState.datePicked = event;
  }
}
