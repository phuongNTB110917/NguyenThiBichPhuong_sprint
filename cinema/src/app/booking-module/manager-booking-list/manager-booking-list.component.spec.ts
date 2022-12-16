import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBookingListComponent } from './manager-booking-list.component';

describe('ManagerBookingListComponent', () => {
  let component: ManagerBookingListComponent;
  let fixture: ComponentFixture<ManagerBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
