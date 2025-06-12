import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaVisita2Component } from './agenda-visita2.component';

describe('AgendaVisita2Component', () => {
  let component: AgendaVisita2Component;
  let fixture: ComponentFixture<AgendaVisita2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaVisita2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaVisita2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
