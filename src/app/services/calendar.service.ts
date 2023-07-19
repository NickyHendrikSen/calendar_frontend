import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarState {
  public datePicked$ = new BehaviorSubject<Date>(new Date());
  
  private monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  public set datePicked(value: Date) {
    this.datePicked$.next(value);
  }

  public get monthName() : string{
    return this.monthNames[this.datePicked$.value.getMonth()];
  }

  public nextMonth() {
    this.datePicked$.next(new Date(
      new Date(this.datePicked$.value).setMonth(this.datePicked$.value.getMonth() + 1)
      )
    )
  }

  public prevMonth() {
    this.datePicked$.next(new Date(
      new Date(this.datePicked$.value).setMonth(this.datePicked$.value.getMonth() - 1)
      )
    )
  }

}
