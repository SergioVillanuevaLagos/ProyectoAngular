import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidebardComponent } from './admin-sidebard.component';

describe('AdminSidebardComponent', () => {
  let component: AdminSidebardComponent;
  let fixture: ComponentFixture<AdminSidebardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSidebardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSidebardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
