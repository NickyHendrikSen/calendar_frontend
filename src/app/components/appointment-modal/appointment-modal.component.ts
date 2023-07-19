import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';  
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Appointment } from 'src/app/models/appointment';
import { FormGroup,  FormBuilder,  Validators, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    ReactiveFormsModule
  ]
})

export class AppointmentModalComponent {
  
  appointmentForm: FormGroup;
  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<AppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {appointment: Appointment, isEdit: boolean},
    private fb: FormBuilder
  ) {    
   
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required ],
      date: ['', Validators.required ],
      description: ['']
   });

   const datetimeLocal = data?.appointment?.date ? (new Date(data?.appointment?.date.getTime() - data?.appointment?.date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1) : null;

   this.isEdit = data?.isEdit;
   this.appointmentForm.setValue({
    title: data?.appointment?.title ?? "", 
    date: datetimeLocal ?? null,
    description: data?.appointment?.description ?? ""
   })

  }

}
