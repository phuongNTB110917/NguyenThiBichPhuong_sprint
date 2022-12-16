import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFilmComponent } from './booking-film.component';

describe('BookingFilmComponent', () => {
  let component: BookingFilmComponent;
  let fixture: ComponentFixture<BookingFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
