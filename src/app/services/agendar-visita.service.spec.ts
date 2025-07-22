import { TestBed } from '@angular/core/testing';

import { AgendarVisitaService } from './agendar-visita.service';

describe('AgendarVisitaService', () => {
  let service: AgendarVisitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendarVisitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
