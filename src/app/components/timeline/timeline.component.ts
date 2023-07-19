import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Appointment } from 'src/app/models/appointment';
import { Timeline } from 'src/app/models/timeline';
import { AppointmentStoreService } from 'src/app/services/appointment-store.service';
import { CalendarState } from 'src/app/services/calendar.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  standalone: true,
  styleUrls: ['./timeline.component.scss'],
  imports: [CommonModule, CdkDrag, MatDialogModule],
})
export class TimelineComponent {
  
  timelines: Timeline[] = [];
  date: Date | undefined;
  monthName = "";

  constructor(public dialog: MatDialog, private appointmentStore: AppointmentStoreService, private calendarState: CalendarState) {
    
    this.appointmentStore.appointments$.subscribe(() => {
      if(this.date) {
        this.arrangeTimeline(this.appointmentStore.getAppointments(this.date))
      }
    });    
    
    this.calendarState.datePicked$.subscribe(datePicked => {
      this.date = datePicked;
      this.monthName = this.calendarState.monthName
      if(this.date) {
        this.arrangeTimeline(this.appointmentStore.getAppointments(this.date))
      }
    })
  }

  arrangeTimeline(appointments : Appointment[]) {
    const newTimelines: Timeline[] = [];
    let from = -1;
    let until = -1;
    for(let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];
      const hours = appointment.date.getHours();
      const minutes = appointment.date.getMinutes();

      if(i > until) {
        from = -1;
        until = -1;
      }

      if(from == -1 || until == -1) {
        for(let j = i+1; j < appointments.length; j++) {
          const minutesDiff = Math.floor(Math.abs(new Date(appointments[j].date).getTime() - new Date(appointment.date).getTime())/1000/60)
          if(minutesDiff < 60) {
            from = i;
            until = j;
          }
          else {
            break;
          }
        }
      }


      if(from != -1 && until != -1) {
        const diffIdx = Math.abs(until - from)+1;
        const left = (100/diffIdx)*(i-from);
        newTimelines.push({
          appointment: appointment,
          top: (hours*60) + minutes,
          left: left - (left * 0.2),
          widthInPercent: (100/diffIdx)+(left*0.2)
        })
      }
      else {
        newTimelines.push({
          appointment: appointment,
          top: (hours*60) + minutes,
          left: 0,
          widthInPercent: 100
        })
      }

    }

    this.timelines = newTimelines
  }

  dragEnd($event: CdkDragEnd, id: string) {
    const transform = $event.source.element.nativeElement.style.transform;
    const offsetY = transform.split(',')[1].split('px')[0];
    this.appointmentStore.addMinutes(id, parseInt(offsetY));
  }

  edit(id: string) {
    const app = this.appointmentStore.getAppointment(id);
    const dialogRef = this.dialog.open(AppointmentModalComponent, {
      data: {appointment: app, isEdit: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(result.delete) {
        this.appointmentStore.removeAppointment(id);
      }
      else {
        this.appointmentStore.editAppointment(id, result);
      }

    });
  }

}
