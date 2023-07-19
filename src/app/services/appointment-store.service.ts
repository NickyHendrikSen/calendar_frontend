import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentStoreService {
  appointments$ = new BehaviorSubject<Appointment[]>([]);

  constructor() {
    this.appointments$.next([
      {
        id: btoa(Math.random().toString()).toString(),
        title: "Meeting 1",
        date: new Date("2023-07-20T02:35")
      },
      {
        id: btoa(Math.random().toString()).toString(),
        title: "Meeting 2",
        date: new Date("2023-07-20T02:36")
      },
      {
        id: btoa(Math.random().toString()).toString(),
        title: "Meeting 3",
        description: "This is a test description",
        date: new Date("2023-07-20T03:15")
      },
      {
        id: btoa(Math.random().toString()).toString(),
        title: "Meeting 4",
        description: "This is a test description",
        date: new Date("2023-07-20T03:36")
      },
      {
        id: btoa(Math.random().toString()).toString(),
        title: "Meeting 5",
        description: "This is a test description 123123",
        date: new Date("2023-07-20T09:36")
      }
    ])
  }

  getAppointment(id: string): Appointment | null {
    const appointment = this.appointments$.value.find(app => app.id === id)
    if(appointment) {
      return appointment;
    }
    return null
  }

  getAppointments(date: Date): Appointment[] {
    return this.appointments$.value.filter((app) => (
      new Date(app.date).getFullYear() == new Date(date).getFullYear() && 
      new Date(app.date).getMonth() == new Date(date).getMonth() && 
      new Date(app.date).getDate() == new Date(date).getDate()
    )).sort((a,b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  addAppointment(appointment: Appointment) {
    this.appointments$.next([...this.appointments$.value, {
      ...appointment,
      date: new Date(appointment.date)
    }]);
  }

  editAppointment(id: string, appointment: Appointment) {
    const newAppointments = this.appointments$.value;
    const idx = newAppointments.findIndex(app => app.id === id)
    if(idx >= 0) {
      newAppointments[idx] = {
        ...appointment,
        date: new Date(appointment.date)
      };
      this.appointments$.next(newAppointments);
    }
  }

  removeAppointment(id: string) {
      const newAppointments: Appointment[] = this.appointments$.value.filter(
        (app: Appointment) => app.id !== id
      );
        this.appointments$.next(newAppointments);
  }

  addMinutes(id: string, offsetY: number) {
    const newAppointments = this.appointments$.value;
    const idx = newAppointments.findIndex(app => app.id === id)
    if(idx >= 0) {
      newAppointments[idx].date.setMinutes(newAppointments[idx].date.getMinutes() + offsetY);
      this.appointments$.next(newAppointments);
    }
  }

}
