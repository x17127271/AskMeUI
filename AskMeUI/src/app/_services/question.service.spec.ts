import { TestBed, getTestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    injector = getTestBed();
    service = TestBed.get(QuestionService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve question from the API using GET', () => {
    const mockQuestion = {
      id: 1,
      title: 'title',
      lessonId: 2
    };
    const mockQuestionId = 1;
    const mockLessonId = 1;

    service
      .getQuestionById(mockQuestionId, mockLessonId)
      .subscribe((question) => {
        expect(question).toEqual(mockQuestion);
      });
    const request = httpMock.expectOne(
      `http://localhost:51044/api/lessons/${mockLessonId}/questions/${mockQuestionId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockQuestion);
  });

  it('should be able to retrieve questions from the API using GET', () => {
    const mockQuestions = [
      {
        id: 1,
        title: 'title',
        lessonId: 2
      },
      {
        id: 2,
        title: 'title',
        lessonId: 3
      }
    ];
    const mockLessonId = 1;

    service.getQuestions(mockLessonId).subscribe((questions) => {
      expect(questions).toEqual(mockQuestions);
      expect(questions.length).toBe(2);
    });
    const request = httpMock.expectOne(
      `http://localhost:51044/api/lessons/${mockLessonId}/questions`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockQuestions);
  });
});
