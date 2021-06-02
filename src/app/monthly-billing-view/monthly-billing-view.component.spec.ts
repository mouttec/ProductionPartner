import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBillingViewComponent } from './monthly-billing-view.component';

describe('MonthlyBillingViewComponent', () => {
  let component: MonthlyBillingViewComponent;
  let fixture: ComponentFixture<MonthlyBillingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBillingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBillingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
