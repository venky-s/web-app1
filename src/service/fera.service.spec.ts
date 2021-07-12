import { TestBed } from '@angular/core/testing';

import { FeraService } from './fera.service';

describe('FeraService', () => {
  let service: FeraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
