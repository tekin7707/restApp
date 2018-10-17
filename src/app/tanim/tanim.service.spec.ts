import { TestBed, inject } from '@angular/core/testing';

import { TanimService } from './tanim.service';

describe('TanimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TanimService]
    });
  });

  it('should be created', inject([TanimService], (service: TanimService) => {
    expect(service).toBeTruthy();
  }));
});
