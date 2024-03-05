import { TestBed } from '@angular/core/testing';

import { LoguedService } from './logued.service';

describe('LoguedService', () => {
  let service: LoguedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoguedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
