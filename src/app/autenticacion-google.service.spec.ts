import { TestBed } from '@angular/core/testing';

import { AutenticacionGoogleService } from './autenticacion-google.service';

describe('AutenticacionGoogleService', () => {
  let service: AutenticacionGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
