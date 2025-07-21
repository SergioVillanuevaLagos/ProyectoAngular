import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLocacionComponent } from './detalle-locacion.component';

describe('DetalleLocacionComponent', () => {
  let component: DetalleLocacionComponent;
  let fixture: ComponentFixture<DetalleLocacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleLocacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleLocacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
