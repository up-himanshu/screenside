import { TestBed } from '@angular/core/testing';

import { JwtinterceptorService } from './jwtinterceptor.service';

describe('JwtinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtinterceptorService = TestBed.get(JwtinterceptorService);
    expect(service).toBeTruthy();
  });
});
