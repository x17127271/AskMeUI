import { TestBed, getTestBed } from '@angular/core/testing';
import { LessonService } from './lesson.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('LessonService', () => {
  let service: LessonService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    injector = getTestBed();
    service = injector.get(LessonService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve lesson from the API using GET', () => {
    const mockLesson = {
      description: 'description',
      id: 1,
      title: 'title',
      subjectId: 1
    };
    const mockSubjectId = 1;
    const mockLessonId = 1;

    service.getLessonById(mockLessonId, mockSubjectId).subscribe((lesson) => {
      expect(lesson).toEqual(mockLesson);
    });
    const request = httpMock.expectOne(
      `http://localhost:51044/api/subjects/${mockSubjectId}/lessons/${mockLessonId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockLesson);
  });
});
