import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocacionesComponent } from './admin-locaciones.component';

describe('AdminLocacionesComponent', () => {
  let component: AdminLocacionesComponent;
  let fixture: ComponentFixture<AdminLocacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLocacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLocacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
