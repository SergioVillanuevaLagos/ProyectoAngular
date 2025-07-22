import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaVisitaComponent } from './agenda-visita.component';

describe('AgendaVisitaComponent', () => {
  let component: AgendaVisitaComponent;
  let fixture: ComponentFixture<AgendaVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
