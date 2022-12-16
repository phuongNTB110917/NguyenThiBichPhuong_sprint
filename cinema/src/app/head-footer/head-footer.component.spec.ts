import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadFooterComponent } from './head-footer.component';

describe('HeadFooterComponent', () => {
  let component: HeadFooterComponent;
  let fixture: ComponentFixture<HeadFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
