import { TestBed } from '@angular/core/testing';

import { RouteDomainStateService } from './route-domain-state.service';

describe('RouteDomainStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteDomainStateService = TestBed.get(RouteDomainStateService);
    expect(service).toBeTruthy();
  });
});
