import { Component } from '@angular/core';

import { MatButtonModule } from "@angular/material/button";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { AppointmentStoreService } from 'src/app/services/appointment-store.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})

export class CreateAppointmentComponent {

  constructor(public dialog: MatDialog, private appointmentStore: AppointmentStoreService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentModalComponent, {
      data: {appointment: {}, isEdit: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.appointmentStore.addAppointment({
          id: btoa(Math.random().toString()).toString(),
          ...result
        });
      }
    });
  }
}
