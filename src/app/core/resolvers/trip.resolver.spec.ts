import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tripResolver } from './trip.resolver';

describe('tripResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tripResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
