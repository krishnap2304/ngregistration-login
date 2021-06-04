import { TestBed } from '@angular/core/testing';

import { Ngrecpatcha3servcieService } from './ngrecpatcha3servcie.service';

describe('Ngrecpatcha3servcieService', () => {
  let service: Ngrecpatcha3servcieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ngrecpatcha3servcieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
