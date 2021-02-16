import { TestBed } from '@angular/core/testing';

import { UserStockService } from './user-stock.service';

describe('UserStockService', () => {
  let service: UserStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
