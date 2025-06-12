import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLocacionesComponent } from './listar-locaciones.component';

describe('ListarLocacionesComponent', () => {
  let component: ListarLocacionesComponent;
  let fixture: ComponentFixture<ListarLocacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarLocacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarLocacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
