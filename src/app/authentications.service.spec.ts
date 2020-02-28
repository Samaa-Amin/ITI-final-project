import { TestBed } from '@angular/core/testing';

import { AuthenticationsService } from './authentications.service';

describe('AuthenticationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationsService = TestBed.get(AuthenticationsService);
    expect(service).toBeTruthy();
  });
});
