import { TestBed, getTestBed } from '@angular/core/testing';
import { ExamService } from './exam.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('ExamService', () => {
  let service: ExamService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    injector = getTestBed();
    service = injector.get(ExamService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
