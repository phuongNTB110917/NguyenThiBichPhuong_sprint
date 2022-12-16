import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryPointComponent } from './view-history-point.component';

describe('ViewHistoryPointComponent', () => {
  let component: ViewHistoryPointComponent;
  let fixture: ComponentFixture<ViewHistoryPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHistoryPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
