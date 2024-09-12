import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInterestRateComponent } from './admin-interest-rate.component';

describe('AdminInterestRateComponent', () => {
  let component: AdminInterestRateComponent;
  let fixture: ComponentFixture<AdminInterestRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInterestRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInterestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
