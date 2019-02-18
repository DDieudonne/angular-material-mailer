import { TestBed, inject } from '@angular/core/testing';

import { SendemailService } from './sendemail.service';

describe('SendemailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendemailService]
    });
  });

  it('should be created', inject([SendemailService], (service: SendemailService) => {
    expect(service).toBeTruthy();
  }));
});
