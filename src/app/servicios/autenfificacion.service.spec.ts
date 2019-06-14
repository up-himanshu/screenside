import { TestBed } from '@angular/core/testing';

import { AutenfificacionService } from './autenfificacion.service';

describe('AutenfificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenfificacionService = TestBed.get(AutenfificacionService);
    expect(service).toBeTruthy();
  });
});
