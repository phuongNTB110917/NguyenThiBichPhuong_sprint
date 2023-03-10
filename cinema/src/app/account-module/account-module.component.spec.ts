import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountModuleComponent } from './account-module.component';

describe('AccountModuleComponent', () => {
  let component: AccountModuleComponent;
  let fixture: ComponentFixture<AccountModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
