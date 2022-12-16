import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSeatComponent } from './booking-seat.component';

describe('BookingSeatComponent', () => {
  let component: BookingSeatComponent;
  let fixture: ComponentFixture<BookingSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
