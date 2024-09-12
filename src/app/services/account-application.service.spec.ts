import { TestBed } from '@angular/core/testing';

import { AccountApplicationService } from './account-application.service';

describe('AccountApplicationService', () => {
  let service: AccountApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
