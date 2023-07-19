import { TestBed } from '@angular/core/testing';

import { AppointmentStoreService } from './appointment-store.service';

describe('AppointmentStoreService', () => {
  let service: AppointmentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
