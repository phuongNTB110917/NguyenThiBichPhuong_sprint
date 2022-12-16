import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBookingDetailComponent } from './manager-booking-detail.component';

describe('ManagerBookingDetailComponent', () => {
  let component: ManagerBookingDetailComponent;
  let fixture: ComponentFixture<ManagerBookingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBookingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
