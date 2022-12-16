import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBookingInformationComponent } from './manager-booking-information.component';

describe('ManagerBookingInformationComponent', () => {
  let component: ManagerBookingInformationComponent;
  let fixture: ComponentFixture<ManagerBookingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBookingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBookingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
