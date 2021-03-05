import { TestBed } from '@angular/core/testing';

import { PwaUpdatesService } from './pwa-updates.service';

describe('PwaUpdatesService', () => {
  let service: PwaUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
