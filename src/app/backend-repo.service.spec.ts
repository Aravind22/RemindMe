import { TestBed } from '@angular/core/testing';

import { BackendRepoService } from './backend-repo.service';

describe('BackendRepoService', () => {
  let service: BackendRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
