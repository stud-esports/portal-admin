import { TestBed } from '@angular/core/testing';

import { IsModeratorOfPortalGuard } from './is-moderator-of-portal.guard';

describe('IsModeratorOfPortalGuard', () => {
  let guard: IsModeratorOfPortalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsModeratorOfPortalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
