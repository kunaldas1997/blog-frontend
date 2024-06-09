import { TestBed } from '@angular/core/testing';

import { PageRouterService } from './page-router.service';

describe('PageRouterService', () => {
  let service: PageRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
