import { TestBed } from '@angular/core/testing';

import { ApplicationTeamService } from './application-team.service';

describe('ApplicationTeamService', () => {
  let service: ApplicationTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
