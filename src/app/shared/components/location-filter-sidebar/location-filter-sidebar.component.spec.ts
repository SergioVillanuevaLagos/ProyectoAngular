import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFilterSidebarComponent } from './location-filter-sidebar.component';

describe('LocationFilterSidebarComponent', () => {
  let component: LocationFilterSidebarComponent;
  let fixture: ComponentFixture<LocationFilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationFilterSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationFilterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
