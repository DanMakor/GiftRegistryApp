import { TestBed } from '@angular/core/testing';

import { RegistryItemService } from './registry-item.service';

describe('RegisterItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistryItemService = TestBed.get(RegistryItemService);
    expect(service).toBeTruthy();
  });
});
