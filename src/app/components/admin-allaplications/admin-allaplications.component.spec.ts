import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllaplicationsComponent } from './admin-allaplications.component';

describe('AdminAllaplicationsComponent', () => {
  let component: AdminAllaplicationsComponent;
  let fixture: ComponentFixture<AdminAllaplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllaplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllaplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
