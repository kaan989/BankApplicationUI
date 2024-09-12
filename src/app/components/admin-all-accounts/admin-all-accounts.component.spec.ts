import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllAccountsComponent } from './admin-all-accounts.component';

describe('AdminAllAccountsComponent', () => {
  let component: AdminAllAccountsComponent;
  let fixture: ComponentFixture<AdminAllAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
