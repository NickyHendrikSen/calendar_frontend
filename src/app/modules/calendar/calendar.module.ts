import { NgModule } from '@angular/core';

import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';

import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { CreateAppointmentComponent } from "../../components/create-appointment/create-appointment.component";

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    DatePickerComponent,
    CreateAppointmentComponent,
    TimelineComponent,
    CalendarRoutingModule
  ],
  providers: [],
  bootstrap: [CalendarComponent]
})
export class CalendarModule { 

  
}
