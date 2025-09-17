import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardAppGuard } from './guard-app-guard';

describe('guardAppGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardAppGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
