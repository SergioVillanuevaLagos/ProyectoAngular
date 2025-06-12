import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionPropiedadComponent } from './publicacion-propiedad.component';

describe('PublicacionPropiedadComponent', () => {
  let component: PublicacionPropiedadComponent;
  let fixture: ComponentFixture<PublicacionPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicacionPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
