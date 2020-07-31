import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  let service: AnswerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AnswerService]
    });
    service = TestBed.get(AnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
