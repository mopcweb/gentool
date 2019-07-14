import { TestBed } from '@angular/core/testing';

import { CredsService } from '../creds.service';

describe('CredsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredsService = TestBed.get(CredsService);
    expect(service).toBeTruthy();
  });
});
