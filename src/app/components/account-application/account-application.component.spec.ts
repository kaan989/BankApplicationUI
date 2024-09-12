import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountApplicationComponent } from './account-application.component';

describe('AccountApplicationComponent', () => {
  let component: AccountApplicationComponent;
  let fixture: ComponentFixture<AccountApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
